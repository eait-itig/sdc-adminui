/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2014, Joyent, Inc.
 */

var IMAGE_FETCH_SIZE = 15;

var app = require('../../adminui');
var React = require('react');
var BackboneMixin = require('../_backbone-mixin');
var moment = require('moment');

var ImagesList = React.createClass({
    mixins: [BackboneMixin],
    getBackboneModels: function() {
        return [this.props.images];
    },
    _onClickImageName: function(i) {
        app.vent.trigger('showview', 'image', {image: i});
        return false;
    },

    renderItem: function(i) {
        var img = i.toJSON();
        var href = "/images/" + img.uuid;
        var publish_date = moment(img.published_at).format("MMM D, YYYY");

        return <tr key={img.uuid}>
            <td className="state">
                <span className={img.state}>{img.state}</span>
            </td>
            <td className="name">
                <a data-uuid={img.uuid} onClick={this._onClickImageName.bind(null, i)} className="image-name" href={href}>
                    {img.name} <span className="version">{img.version}</span>
                </a>
                <br />
                <span className="uuid selectable">{img.uuid}</span>
            </td>
            <td className="published">
                {publish_date}
            </td>
            <td>{img.os}</td>
            <td className="visibility">
                { img.public ?
                  <span className="public">public</span>
                  :
                  <span className="private">owner</span>
                }

                { img.acl &&
                <span className="acl">and <a>{img.acl.length} others</a></span>
                }
            </td>
        </tr>;
    },
    render: function() {
        return <table className="images-list">
                <thead>
                <tr>
                    <th className="state"></th>
                    <th className="name">Name</th>
                    <th className="published">Published</th>
                    <th className="os">OS</th>
                    <th className="visibility">Visibility</th>
                </tr>
                </thead>
            <tbody>
                { this.props.images.map(this.renderItem) }
            </tbody>
            <caption align="bottom">
            <span className="record-count">{this.props.images.length}</span> Images
            </caption>
            </table>;
    }
});


var ImagesCollection = require('../../models/images');
var ImagesView = React.createClass({
    statics: {
        url: 'images',
        sidebar: 'images'
    },
    getInitialState: function() {
        return {hasMore: false};
    },
    _onSync: function(collection, objs) {
        if (IMAGE_FETCH_SIZE === objs.length) {
            var lastNewItem = objs[objs.length-1].uuid;
            var lastPrevItem = this.images.at(this.images.length-1).get('uuid');
            if (typeof(this.images.params.marker) === 'undefined' || lastNewItem !== lastPrevItem) {
                this.setState({hasMore: true});
            } else {
                this.setState({hasMore: false});
            }
        } else {
            this.setState({hasMore: false});
        }
    },
    componentWillMount: function() {
        this.images = new ImagesCollection(null);
        this.images.on('sync', this._onSync, this);
        this.images.params = {limit: IMAGE_FETCH_SIZE};
        this.images.fetch();
    },
    componentWillUmount: function() {
        this.images.off('fetch');
    },
    _searchImage: function(e) {
        var value = e.target.value;

        if (value && value.length) {
            if (value.length === 36) {
                this.images.params.uuid = value;
            } else {
                this.images.params.name = value;
            }
        } else {
            delete this.images.params.uuid;
            delete this.images.params.name;
        }
        delete this.images.params.marker;
        this.images.fetch();
    },
    _loadMore: function() {
        this.images.params.marker = this.images.at(this.images.length-1).get('uuid');
        this.images.fetch({remove: false});
    },
    render: function() {
        var page = <div id="page-images">
            <div className="page-header">
                <h1>Images
                    { app.user.role('operators') &&
                        <div className="actions">
                            <a onClick={this.onClickImportImage} className="btn btn-success import-image">Import Image</a>
                        </div>
                    }
                </h1>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="form-group">
                    <input type="text" className="form-control" onChange={this._searchImage} placeholder="Search for images by exact name or UUID" />
                    </div>
                </div>
            </div>
            <ImagesList images={this.images} />
            { (this.state.hasMore) ? <button onClick={this._loadMore} className="btn btn-block btn-info load-more">Load More</button> : ''}
        </div>;

        return page;
    },
    onClickImportImage: function() {
        app.vent.trigger('showview', 'image-import');
    }
});

module.exports = ImagesView;
