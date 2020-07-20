/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright 2020 Joyent, Inc.
 * Copyright 2020 The University of Queensland
 */

"use strict";

var $ = require('jquery');
var React = require('react');
var PropTypes = React.PropTypes;
var _ = require('underscore');
var adminui = require('adminui');

var api = require('../../../request');
var UserRolesForm = require('./roles-form');


var RoleMemberInfo = React.createClass({
    propTypes: {
        dn: PropTypes.string.isRequired,
        memberLoaded: PropTypes.func
    },
    getInitialState: function() {
        return {
            member: { },
            loading: true
        };
    },
    componentWillMount: function() {
        this._fetchMember();
    },
    _fetchMember: function() {
        // policy-uuid=4de91c34-6784-45ac-aac7-9aa6c3d17013, uuid=930896af-bf8c-48d4-885c-6573a94b1853, ou=users, o=smartdc
        var subMatches = this.props.dn.match(/^uuid=([a-f0-9-]+), uuid=([a-f0-9-]+), ou=/);
        var acctMatches = this.props.dn.match(/^uuid=([a-f0-9-]+), ou=/);
        if (subMatches) {
            var user = subMatches[1];
            var account = subMatches[2];
            var url = _.str.sprintf('/api/users/%s/%s', account, user);
            api.get(url).end(function(res) {
                if (res.ok) {
                    this.setState({member: res.body});
                }
                this.setState({loading: false});
            }.bind(this));
        } else if (acctMatches) {
            var account = acctMatches[1];
            var url = _.str.sprintf('/api/users/%s', account);
            api.get(url).end(function(res) {
                if (res.ok) {
                    this.setState({member: res.body});
                }
                this.setState({loading: false});
            }.bind(this));
        }
    },
    render: function() {
        if (this.state.loading) {
            return <div className="member loading">
                Loading Member...
            </div>;
        }
        return <div className="member">
            <a onClick={this._handleClickedMember.bind(null, this.state.member)} className="member-name">{this.state.member.login}</a>
        </div>;
    },
    _handleClickedMember: function(u) {
        adminui.vent.trigger('showcomponent', 'user', {user: u.uuid, account: u.account, tab: 'profile'});
    }
});

var RolePolicyInfo = React.createClass({
    propTypes: {
        dn: PropTypes.string.isRequired,
        policyLoaded: PropTypes.func
    },
    getInitialState: function() {
        return {
            policy: { },
            loading: true,
            showRules: false
        };
    },
    componentWillMount: function() {
        this._fetchPolicy();
    },
    componentDidMount: function() {
        var node = this.getDOMNode();

        $(node).on('mouseover', '.policy-name', function() {
            console.log('mouseover');
            this.setState({showRules: true});
        }.bind(this));

        $(node).on('mouseout', '.policy-name', function() {
            console.log('mouseout');
            this.setState({showRules: false});
        }.bind(this));
    },
    componentWillUnmount: function() {
        var node = this.getDOMNode();
        $(node).off('mouseover');
        $(node).off('mouseout');
    },
    _fetchPolicy: function() {
        // policy-uuid=4de91c34-6784-45ac-aac7-9aa6c3d17013, uuid=930896af-bf8c-48d4-885c-6573a94b1853, ou=users, o=smartdc
        var matches = this.props.dn.match(/policy-uuid=([a-z0-9-]+), uuid=([a-z0-9-]+)/);
        var policy = matches[1];
        var account = matches[2];
        if (policy && account) {
            var url = _.str.sprintf('/api/users/%s/policies/%s', account, policy);
            api.get(url).end(function(res) {
                if (res.ok) {
                    if (! res.body.rules) {
                        res.body.rules = [];
                    }
                    this.setState({policy: res.body});
                }
                this.setState({loading: false});
            }.bind(this));
        }
    },
    render: function() {
        if (this.state.loading) {
            return <div className="policy loading">
                Loading Policy...
            </div>;
        }
        return <div className="policy">
            <div ref="policyName" className="policy-name">{this.state.policy.name}</div>
            { this.state.showRules &&
                <div className="policy-rules">
                    <i className="fa fa-caret-up"></i>
                    {
                        this.state.policy.rules.map(function(r) {
                            return <div key={r} className="policy-rule">{r}</div>;
                        })
                    }
                </div>
            }
        </div>;
    }
});

var RoleMembersInfo = React.createClass({
    propTypes: {
        role: PropTypes.object.isRequired
    },
    render: function() {
        var role = this.props.role;
        var nodes;
        if (role.members.length) {
            nodes = role.members.map(function(p) {
                return <RoleMemberInfo key={p} dn={p} />;
            });
        }

        return <div className="role-members">
            <h6>{role.members.length} { role.members.length === 1 ? 'member' : 'members'}</h6>
            {nodes}
        </div>;
    }
});

var RolePoliciesInfo = React.createClass({
    propTypes: {
        role: PropTypes.object.isRequired
    },
    render: function() {
        var role = this.props.role;
        var nodes;
        if (role.policies.length) {
            nodes = role.policies.map(function(p) {
                return <RolePolicyInfo key={p} dn={p} />;
            });
        }

        return <div className="role-policies">
            <h6>{role.policies.length} { role.policies.length === 1 ? 'policy' : 'policies'}</h6>
            {nodes}
        </div>;
    }
});

var UserRoles = React.createClass({
    propTypes: {
        account: PropTypes.string.isRequired,
        readonly: PropTypes.bool
    },
    getInitialState: function() {
        return {
            roles: [],
            rolesForm: false,
            rolesFormInitialData: {},
            loading: true
        };
    },
    componentWillMount: function() {
        this._fetchRoles();
    },
    render: function() {
        var rolesList;
        if (this.state.loading) {
            rolesList = this._renderLoading();
        } else if (this.state.roles.length) {
            rolesList = this._renderRoles();
        } else {
            rolesList = this._renderEmpty();
        }
        return <div className="user-roles">
            <h3>Account Roles
                {!this.props.readonly && !this.state.rolesForm &&
                    <div className="actions">
                        <button onClick={this._handleNewRole} className="btn btn-info add-role"><i className="fa fa-plus"></i> Add New Role</button>
                    </div>
                }
            </h3>
            {
                this.state.rolesForm && <UserRolesForm
                    account={this.props.account}
                    handleClose={this._handleCloseRolesForm}
                    handleSaved={this._handleSavedRolesForm}
                    initialRole={this.state.rolesFormInitialData} />
            }

            { rolesList }
        </div>;
    },

    _handleNewRole: function() {
        this.setState({
            'rolesForm': true,
            'rolesFormInitialData': {}
        });
    },

    _renderEmpty: function() {
        return (<div key="empty" className="panel">
            <div className="panel-body">There are no roles under this account</div>
        </div>);
    },
    _renderLoading: function() {
        return (<div key="empty" className="panel">
            <div className="panel-body">Retrieving account roles.</div>
        </div>);
    },
    _renderRole: function(r) {
        return <div key={r.uuid} className="panel role">
            <div className="panel-body">
                <div className="row">
                    <div className="role-info">
                        <div className="role-name">{r.name}</div>
                        <div className="role-uuid selectable">{r.uuid}</div>
                    </div>
                    <RolePoliciesInfo role={r} />
                    <RoleMembersInfo role={r} />
                    <div className="role-actions">
                        <button onClick={this._showEditForm.bind(null, r)} type="button" className="btn btn-link">
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button onClick={this._showDelete.bind(null, r)} type="button" className="btn btn-link">
                            <i className="fa fa-trash-o"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>;
    },
    _renderRoles: function() {
        var nodes = this.state.roles.map(this._renderRole, this);
        return <div className="roles-list">{nodes}</div>;
    },

    _showEditForm: function(role) {
        this.setState({
            rolesForm: true,
            rolesFormInitialData: role
        });
    },

    _showDelete: function(r) {
        var c = window.confirm('Are you sure you want to remove this role? Users with this role will be disassociated from this role accordingly.');
        if (c) {
            var url = _.str.sprintf('/api/users/%s/roles/%s', this.props.account, r.uuid);
            api.del(url).end(function(res) {
                if (res.ok) {
                    adminui.vent.trigger('notification', {level: 'success',
                        message: _.str.sprintf('Role <strong>%s</strong> has been removed.', r.name)
                    });
                    this._fetchRoles();
                } else {
                    adminui.vent.trigger('notification', {
                        level: 'error',
                        message: _.str.sprintf('Error removing <strong>%s</strong> ' + res.body.message, r.name)
                    });
                }
            }.bind(this));
        }
    },



    _fetchRoles: function() {
        this.setState({loading: true});
        var url = _.str.sprintf('/api/users/%s/roles', this.props.account);
        api.get(url).end(function(res) {
            if (res.ok) {
                this.setState({roles: res.body});
            } else {
                this.setState({error: res.body});
            }
            this.setState({loading: false});
        }.bind(this));
    },
    _handleSavedRolesForm: function(r) {
        adminui.vent.trigger('notification', {level: 'success',
            message: _.str.sprintf('Role <strong>%s</strong> has been saved.', r.name)
        });
        this.setState({
            rolesForm: false,
            rolesFormInitialData: {}
        });
        this._fetchRoles();
    },

    _handleCloseRolesForm: function() {
        this.setState({
            rolesForm: false,
            rolesFormInitialData: {}
        });
    }
});

module.exports = UserRoles;
