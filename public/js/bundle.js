require=(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({"jquery.serializeObject":[function(require,module,exports){
module.exports=require('QwqQr0');
},{}],"QwqQr0":[function(require,module,exports){
(function(global){(function browserifyShim(module, define) {
$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};

}).call(global, module, undefined);

})(window)
},{}],"bootstrap":[function(require,module,exports){
module.exports=require('zq0vg5');
},{}],"zq0vg5":[function(require,module,exports){
(function(global){(function browserifyShim(module, define) {
/* ===================================================
 * bootstrap-transition.js v2.1.0
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  $(function () {

    "use strict"; // jshint ;_;


    /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
     * ======================================================= */

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);/* ==========================================================
 * bootstrap-alert.js v2.1.0
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)

    e && e.preventDefault()

    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent
        .trigger('closed')
        .remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT DATA-API
  * ============== */

  $(function () {
    $('body').on('click.alert.data-api', dismiss, Alert.prototype.close)
  })

}(window.jQuery);/* ============================================================
 * bootstrap-button.js v2.1.0
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.parent('[data-toggle="buttons-radio"]')

    $parent && $parent
      .find('.active')
      .removeClass('active')

    this.$element.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON DATA-API
  * =============== */

  $(function () {
    $('body').on('click.button.data-api', '[data-toggle^=button]', function ( e ) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      $btn.button('toggle')
    })
  })

}(window.jQuery);/* ==========================================================
 * bootstrap-carousel.js v2.1.0
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.options = options
    this.options.slide && this.slide(this.options.slide)
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function (e) {
      if (!e) this.paused = false
      this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
      return this
    }

  , to: function (pos) {
      var $active = this.$element.find('.item.active')
        , children = $active.parent().children()
        , activePos = children.index($active)
        , that = this

      if (pos > (children.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activePos == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activePos ? 'next' : 'prev', $(children[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true
      if (this.$element.find('.next, .prev').length && $.support.transition.end) {
        this.$element.trigger($.support.transition.end)
        this.cycle()
      }
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.item.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e = $.Event('slide', {
            relatedTarget: $next[0]
          })

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      if ($next.hasClass('active')) return

      if ($.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      } else {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option)
        , action = typeof option == 'string' ? option : options.slide
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL DATA-API
  * ================= */

  $(function () {
    $('body').on('click.carousel.data-api', '[data-slide]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , options = !$target.data('modal') && $.extend({}, $target.data(), $this.data())
      $target.carousel(options)
      e.preventDefault()
    })
  })

}(window.jQuery);/* =============================================================
 * bootstrap-collapse.js v2.1.0
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      $.support.transition && this.$element[dimension](this.$element[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSIBLE PLUGIN DEFINITION
  * ============================== */

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = typeof option == 'object' && option
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSIBLE DATA-API
  * ==================== */

  $(function () {
    $('body').on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
      var $this = $(this), href
        , target = $this.attr('data-target')
          || e.preventDefault()
          || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
        , option = $(target).data('collapse') ? 'toggle' : $this.data()
      $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
      $(target).collapse(option)
    })
  })

}(window.jQuery);/* ============================================================
 * bootstrap-dropdown.js v2.1.0
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        $parent.toggleClass('open')
        $this.focus()
      }

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) return $this.click()

      $items = $('[role=menu] li:not(.divider) a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    getParent($(toggle))
      .removeClass('open')
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)
    $parent.length || ($parent = $this.parent())

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(function () {
    $('html')
      .on('click.dropdown.data-api touchstart.dropdown.data-api', clearMenus)
    $('body')
      .on('click.dropdown touchstart.dropdown.data-api', '.dropdown', function (e) { e.stopPropagation() })
      .on('click.dropdown.data-api touchstart.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
      .on('keydown.dropdown.data-api touchstart.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)
  })

}(window.jQuery);/* =========================================================
 * bootstrap-modal.js v2.1.0
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
    this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        $('body').addClass('modal-open')

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element
            .show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)
            .focus()

          that.enforceFocus()

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.trigger('shown') }) :
            that.$element.trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        $('body').removeClass('modal-open')

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function (that) {
        this.$element
          .hide()
          .trigger('hidden')

        this.backdrop()
      }

    , removeBackdrop: function () {
        this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          if (this.options.backdrop != 'static') {
            this.$backdrop.click($.proxy(this.hide, this))
          }

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, $.proxy(this.removeBackdrop, this)) :
            this.removeBackdrop()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL DATA-API
  * ============== */

  $(function () {
    $('body').on('click.modal.data-api', '[data-toggle="modal"]', function ( e ) {
      var $this = $(this)
        , href = $this.attr('href')
        , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
        , option = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

      e.preventDefault()

      $target
        .modal(option)
        .one('hide', function () {
          $this.focus()
        })
    })
  })

}(window.jQuery);/* ===========================================================
 * bootstrap-tooltip.js v2.1.0
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      if (this.options.trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (this.options.trigger != 'manual') {
        eventIn = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
        this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , inside
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp

      if (this.hasContent() && this.enabled) {
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        inside = /in/.test(placement)

        $tip
          .remove()
          .css({ top: 0, left: 0, display: 'block' })
          .appendTo(inside ? this.$element : document.body)

        pos = this.getPosition(inside)

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        $tip
          .css(tp)
          .addClass(placement)
          .addClass('in')
      }
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).remove()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.remove()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.remove()

      return this
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function (inside) {
      return $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
        width: this.$element[0].offsetWidth
      , height: this.$element[0].offsetHeight
      })
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function () {
      this[this.tip().hasClass('in') ? 'hide' : 'show']()
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover'
  , title: ''
  , delay: 0
  , html: true
  }

}(window.jQuery);
/* ===========================================================
 * bootstrap-popover.js v2.1.0
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      $tip.find('.popover-content > *')[this.options.html ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = $e.attr('data-content')
        || (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
  })

}(window.jQuery);/* =============================================================
 * bootstrap-scrollspy.js v2.1.0
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* SCROLLSPY CLASS DEFINITION
  * ========================== */

  function ScrollSpy(element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

        $targets = this.$body
          .find(this.selector)
          .map(function () {
            var $el = $(this)
              , href = $el.data('target') || $el.attr('href')
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && $href.length
              && [[ $href.position().top, href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
          , maxScroll = scrollHeight - this.$scrollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets.last()[0])
            && this.activate ( i )
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu').length)  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);/* ========================================================
 * bootstrap-tab.js v2.1.0
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active a').last()[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB DATA-API
  * ============ */

  $(function () {
    $('body').on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
  })

}(window.jQuery);/* =============================================================
 * bootstrap-typeahead.js v2.1.0
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function($){

  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.$menu = $(this.options.menu).appendTo('body')
    this.source = this.options.source
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.offset(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu.css({
        top: pos.top + pos.height
      , left: pos.left
      })

      this.$menu.show()
      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var items

      this.query = this.$element.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      var that = this

      items = $.grep(items, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if ($.browser.webkit || $.browser.msie) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
    }

  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = !~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , blur: function (e) {
      var that = this
      setTimeout(function () { that.hide() }, 150)
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
    }

  , mouseenter: function (e) {
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , minLength: 1
  }

  $.fn.typeahead.Constructor = Typeahead


 /*   TYPEAHEAD DATA-API
  * ================== */

  $(function () {
    $('body').on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
      var $this = $(this)
      if ($this.data('typeahead')) return
      e.preventDefault()
      $this.typeahead($this.data())
    })
  })

}(window.jQuery);
/* ==========================================================
 * bootstrap-affix.js v2.1.0
 * http://twitter.github.com/bootstrap/javascript.html#affix
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* AFFIX CLASS DEFINITION
  * ====================== */

  var Affix = function (element, options) {
    this.options = $.extend({}, $.fn.affix.defaults, options)
    this.$window = $(window).on('scroll.affix.data-api', $.proxy(this.checkPosition, this))
    this.$element = $(element)
    this.checkPosition()
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
      , scrollTop = this.$window.scrollTop()
      , position = this.$element.offset()
      , offset = this.options.offset
      , offsetBottom = offset.bottom
      , offsetTop = offset.top
      , reset = 'affix affix-top affix-bottom'
      , affix

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
      false    : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ?
      'bottom' : offsetTop != null && scrollTop <= offsetTop ?
      'top'    : false

    if (this.affixed === affix) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
  }


 /* AFFIX PLUGIN DEFINITION
  * ======================= */

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('affix')
        , options = typeof option == 'object' && option
      if (!data) $this.data('affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix

  $.fn.affix.defaults = {
    offset: 0
  }


 /* AFFIX DATA-API
  * ============== */

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
        , data = $spy.data()

      data.offset = data.offset || {}

      data.offsetBottom && (data.offset.bottom = data.offsetBottom)
      data.offsetTop && (data.offset.top = data.offsetTop)

      $spy.affix(data)
    })
  })


}(window.jQuery);
}).call(global, module, undefined);

})(window)
},{}],"kevinykchan-bootstrap-typeahead":[function(require,module,exports){
module.exports=require('aA5yKD');
},{}],"aA5yKD":[function(require,module,exports){
(function(global){(function browserifyShim(module, define) {
/* =============================================================
 * bootstrap-typeahead.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function($){

  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.$menu = $(this.options.menu).appendTo('body')
    this.source = this.options.source
    this.labeler = this.options.labeler || function(item) { return item; };
    this.valuer = this.options.valuer || function(item) { return item; };
    this.selected = this.options.selected || function(item) { ;; }
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var item = this.$menu.find('.active').data('item');
      this.selected(item);
      this.$element
        .val(this.valuer(item))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.offset(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu.css({
        top: pos.top + pos.height
      , left: pos.left
      })

      this.$menu.show()
      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var that = this
        , items
        , q

      this.query = this.$element.val()

      if (!this.query) {
        return this.shown ? this.hide() : this
      }

      items = $.grep(this.source, function (item) {
        return that.matcher(item)
      });

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~(this.labeler(item).toLowerCase().indexOf(this.query.toLowerCase()))
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!this.labeler(item).toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~this.labeler(item).indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this
      this.$menu.empty();

      items = $(items).map(function (i, item) {
        i = $(that.options.item)
        i.find('a').html(that.highlighter(that.labeler(item)))
        that.$menu.append(i)
        i.data('item', item);
        return i[0]
      })

      items.first().addClass('active')
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if ($.browser.webkit || $.browser.msie) {
        this.$element.on('keydown', $.proxy(this.keypress, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , keypress: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          if (e.type != 'keydown') break
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          if (e.type != 'keydown') break
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }
    , blur: function (e) {
        var that = this;
        e.stopPropagation();
        e.preventDefault();
        setTimeout(function() {
            if (!that.$menu.is(':hover')) {
                that.hide();
            }
        }, 150);
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
    }

  , mouseenter: function (e) {
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD DATA-API
  * ================== */

  $(function () {
    $('body').on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
      var $this = $(this)
      if ($this.data('typeahead')) return
      e.preventDefault()
      $this.typeahead($this.data())
    })
  })

}(window.jQuery);

}).call(global, module, undefined);

})(window)
},{}],"jquery":[function(require,module,exports){
module.exports=require('1Pax6e');
},{}],"1Pax6e":[function(require,module,exports){
(function(global){(function browserifyShim(module, define, browserify_shim__define__module__export__) {
/*!
 * jQuery JavaScript Library v1.7.1
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Mon Nov 21 21:11:03 2011 -0500
 */
(function( window, undefined ) {

// Use the correct document accordingly with window argument (sandbox)
var document = window.document,
	navigator = window.navigator,
	location = window.location;
var jQuery = (function() {

// Define a local copy of jQuery
var jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// A simple way to check for HTML strings or ID strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

	// Check if a string has a non-whitespace character in it
	rnotwhite = /\S/,

	// Used for trimming whitespace
	trimLeft = /^\s+/,
	trimRight = /\s+$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,

	// Useragent RegExp
	rwebkit = /(webkit)[ \/]([\w.]+)/,
	ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
	rmsie = /(msie) ([\w.]+)/,
	rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,

	// Matches dashed string for camelizing
	rdashAlpha = /-([a-z]|[0-9])/ig,
	rmsPrefix = /^-ms-/,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return ( letter + "" ).toUpperCase();
	},

	// Keep a UserAgent string for use with jQuery.browser
	userAgent = navigator.userAgent,

	// For matching the engine and version of the browser
	browserMatch,

	// The deferred used on DOM ready
	readyList,

	// The ready event handler
	DOMContentLoaded,

	// Save a reference to some core methods
	toString = Object.prototype.toString,
	hasOwn = Object.prototype.hasOwnProperty,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	trim = String.prototype.trim,
	indexOf = Array.prototype.indexOf,

	// [[Class]] -> type pairs
	class2type = {};

jQuery.fn = jQuery.prototype = {
	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem, ret, doc;

		// Handle $(""), $(null), or $(undefined)
		if ( !selector ) {
			return this;
		}

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}

		// The body element only exists once, optimize finding it
		if ( selector === "body" && !context && document.body ) {
			this.context = document;
			this[0] = document.body;
			this.selector = selector;
			this.length = 1;
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			// Are we dealing with HTML string or an ID?
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = quickExpr.exec( selector );
			}

			// Verify a match, and that no context was specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;
					doc = ( context ? context.ownerDocument || context : document );

					// If a single string is passed in and it's a single tag
					// just do a createElement and skip the rest
					ret = rsingleTag.exec( selector );

					if ( ret ) {
						if ( jQuery.isPlainObject( context ) ) {
							selector = [ document.createElement( ret[1] ) ];
							jQuery.fn.attr.call( selector, context, true );

						} else {
							selector = [ doc.createElement( ret[1] ) ];
						}

					} else {
						ret = jQuery.buildFragment( [ match[1] ], [ doc ] );
						selector = ( ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment ).childNodes;
					}

					return jQuery.merge( this, selector );

				// HANDLE: $("#id")
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.7.1",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return slice.call( this, 0 );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {
		// Build a new jQuery matched element set
		var ret = this.constructor();

		if ( jQuery.isArray( elems ) ) {
			push.apply( ret, elems );

		} else {
			jQuery.merge( ret, elems );
		}

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Attach the listeners
		jQuery.bindReady();

		// Add the callback
		readyList.add( fn );

		return this;
	},

	eq: function( i ) {
		i = +i;
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ),
			"slice", slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {
		// Either a released hold or an DOMready/load event and not yet ready
		if ( (wait === true && !--jQuery.readyWait) || (wait !== true && !jQuery.isReady) ) {
			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
			if ( !document.body ) {
				return setTimeout( jQuery.ready, 1 );
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.fireWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.trigger ) {
				jQuery( document ).trigger( "ready" ).off( "ready" );
			}
		}
	},

	bindReady: function() {
		if ( readyList ) {
			return;
		}

		readyList = jQuery.Callbacks( "once memory" );

		// Catch cases where $(document).ready() is called after the
		// browser event has already occurred.
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			return setTimeout( jQuery.ready, 1 );
		}

		// Mozilla, Opera and webkit nightlies currently support this event
		if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else if ( document.attachEvent ) {
			// ensure firing before onload,
			// maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var toplevel = false;

			try {
				toplevel = window.frameElement == null;
			} catch(e) {}

			if ( document.documentElement.doScroll && toplevel ) {
				doScrollCheck();
			}
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	// A crude way of determining if an object is a window
	isWindow: function( obj ) {
		return obj && typeof obj === "object" && "setInterval" in obj;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		for ( var name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	parseJSON: function( data ) {
		if ( typeof data !== "string" || !data ) {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = jQuery.trim( data );

		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
			.replace( rvalidtokens, "]" )
			.replace( rvalidbraces, "")) ) {

			return ( new Function( "return " + data ) )();

		}
		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && rnotwhite.test( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
	},

	// args is for internal usage only
	each: function( object, callback, args ) {
		var name, i = 0,
			length = object.length,
			isObj = length === undefined || jQuery.isFunction( object );

		if ( args ) {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.apply( object[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( object[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
						break;
					}
				}
			}
		}

		return object;
	},

	// Use native String.trim function wherever possible
	trim: trim ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
		},

	// results is for internal usage only
	makeArray: function( array, results ) {
		var ret = results || [];

		if ( array != null ) {
			// The window, strings (and functions) also have 'length'
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			var type = jQuery.type( array );

			if ( array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( array ) ) {
				push.call( ret, array );
			} else {
				jQuery.merge( ret, array );
			}
		}

		return ret;
	},

	inArray: function( elem, array, i ) {
		var len;

		if ( array ) {
			if ( indexOf ) {
				return indexOf.call( array, elem, i );
			}

			len = array.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in array && array[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var i = first.length,
			j = 0;

		if ( typeof second.length === "number" ) {
			for ( var l = second.length; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var ret = [], retVal;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value, key, ret = [],
			i = 0,
			length = elems.length,
			// jquery objects are treated as arrays
			isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( key in elems ) {
				value = callback( elems[ key ], key, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return ret.concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		if ( typeof context === "string" ) {
			var tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		var args = slice.call( arguments, 2 ),
			proxy = function() {
				return fn.apply( context, args.concat( slice.call( arguments ) ) );
			};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;

		return proxy;
	},

	// Mutifunctional method to get and set values to a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, key, value, exec, fn, pass ) {
		var length = elems.length;

		// Setting many attributes
		if ( typeof key === "object" ) {
			for ( var k in key ) {
				jQuery.access( elems, k, key[k], exec, fn, value );
			}
			return elems;
		}

		// Setting one attribute
		if ( value !== undefined ) {
			// Optionally, function values get executed if exec is true
			exec = !pass && exec && jQuery.isFunction(value);

			for ( var i = 0; i < length; i++ ) {
				fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
			}

			return elems;
		}

		// Getting an attribute
		return length ? fn( elems[0], key ) : undefined;
	},

	now: function() {
		return ( new Date() ).getTime();
	},

	// Use of jQuery.browser is frowned upon.
	// More details: http://docs.jquery.com/Utilities/jQuery.browser
	uaMatch: function( ua ) {
		ua = ua.toLowerCase();

		var match = rwebkit.exec( ua ) ||
			ropera.exec( ua ) ||
			rmsie.exec( ua ) ||
			ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
			[];

		return { browser: match[1] || "", version: match[2] || "0" };
	},

	sub: function() {
		function jQuerySub( selector, context ) {
			return new jQuerySub.fn.init( selector, context );
		}
		jQuery.extend( true, jQuerySub, this );
		jQuerySub.superclass = this;
		jQuerySub.fn = jQuerySub.prototype = this();
		jQuerySub.fn.constructor = jQuerySub;
		jQuerySub.sub = this.sub;
		jQuerySub.fn.init = function init( selector, context ) {
			if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
				context = jQuerySub( context );
			}

			return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
		};
		jQuerySub.fn.init.prototype = jQuerySub.fn;
		var rootjQuerySub = jQuerySub(document);
		return jQuerySub;
	},

	browser: {}
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

browserMatch = jQuery.uaMatch( userAgent );
if ( browserMatch.browser ) {
	jQuery.browser[ browserMatch.browser ] = true;
	jQuery.browser.version = browserMatch.version;
}

// Deprecated, use jQuery.browser.webkit instead
if ( jQuery.browser.webkit ) {
	jQuery.browser.safari = true;
}

// IE doesn't match non-breaking spaces with \s
if ( rnotwhite.test( "\xA0" ) ) {
	trimLeft = /^[\s\xA0]+/;
	trimRight = /[\s\xA0]+$/;
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);

// Cleanup functions for the document ready method
if ( document.addEventListener ) {
	DOMContentLoaded = function() {
		document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
		jQuery.ready();
	};

} else if ( document.attachEvent ) {
	DOMContentLoaded = function() {
		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( document.readyState === "complete" ) {
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	};
}

// The DOM ready check for Internet Explorer
function doScrollCheck() {
	if ( jQuery.isReady ) {
		return;
	}

	try {
		// If IE is used, use the trick by Diego Perini
		// http://javascript.nwbox.com/IEContentLoaded/
		document.documentElement.doScroll("left");
	} catch(e) {
		setTimeout( doScrollCheck, 1 );
		return;
	}

	// and execute any waiting functions
	jQuery.ready();
}

return jQuery;

})();


// String to Object flags format cache
var flagsCache = {};

// Convert String-formatted flags into Object-formatted ones and store in cache
function createFlags( flags ) {
	var object = flagsCache[ flags ] = {},
		i, length;
	flags = flags.split( /\s+/ );
	for ( i = 0, length = flags.length; i < length; i++ ) {
		object[ flags[i] ] = true;
	}
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	flags:	an optional list of space-separated flags that will change how
 *			the callback list behaves
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible flags:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( flags ) {

	// Convert flags from String-formatted to Object-formatted
	// (we check in cache first)
	flags = flags ? ( flagsCache[ flags ] || createFlags( flags ) ) : {};

	var // Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = [],
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Add one or several callbacks to the list
		add = function( args ) {
			var i,
				length,
				elem,
				type,
				actual;
			for ( i = 0, length = args.length; i < length; i++ ) {
				elem = args[ i ];
				type = jQuery.type( elem );
				if ( type === "array" ) {
					// Inspect recursively
					add( elem );
				} else if ( type === "function" ) {
					// Add if not in unique mode and callback is not in
					if ( !flags.unique || !self.has( elem ) ) {
						list.push( elem );
					}
				}
			}
		},
		// Fire callbacks
		fire = function( context, args ) {
			args = args || [];
			memory = !flags.memory || [ context, args ];
			firing = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( context, args ) === false && flags.stopOnFalse ) {
					memory = true; // Mark as halted
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( !flags.once ) {
					if ( stack && stack.length ) {
						memory = stack.shift();
						self.fireWith( memory[ 0 ], memory[ 1 ] );
					}
				} else if ( memory === true ) {
					self.disable();
				} else {
					list = [];
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					var length = list.length;
					add( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away, unless previous
					// firing was halted (stopOnFalse)
					} else if ( memory && memory !== true ) {
						firingStart = length;
						fire( memory[ 0 ], memory[ 1 ] );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					var args = arguments,
						argIndex = 0,
						argLength = args.length;
					for ( ; argIndex < argLength ; argIndex++ ) {
						for ( var i = 0; i < list.length; i++ ) {
							if ( args[ argIndex ] === list[ i ] ) {
								// Handle firingIndex and firingLength
								if ( firing ) {
									if ( i <= firingLength ) {
										firingLength--;
										if ( i <= firingIndex ) {
											firingIndex--;
										}
									}
								}
								// Remove the element
								list.splice( i--, 1 );
								// If we have some unicity property then
								// we only need to do this once
								if ( flags.unique ) {
									break;
								}
							}
						}
					}
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				if ( list ) {
					var i = 0,
						length = list.length;
					for ( ; i < length; i++ ) {
						if ( fn === list[ i ] ) {
							return true;
						}
					}
				}
				return false;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory || memory === true ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( stack ) {
					if ( firing ) {
						if ( !flags.once ) {
							stack.push( [ context, args ] );
						}
					} else if ( !( flags.once && memory ) ) {
						fire( context, args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!memory;
			}
		};

	return self;
};




var // Static reference to slice
	sliceDeferred = [].slice;

jQuery.extend({

	Deferred: function( func ) {
		var doneList = jQuery.Callbacks( "once memory" ),
			failList = jQuery.Callbacks( "once memory" ),
			progressList = jQuery.Callbacks( "memory" ),
			state = "pending",
			lists = {
				resolve: doneList,
				reject: failList,
				notify: progressList
			},
			promise = {
				done: doneList.add,
				fail: failList.add,
				progress: progressList.add,

				state: function() {
					return state;
				},

				// Deprecated
				isResolved: doneList.fired,
				isRejected: failList.fired,

				then: function( doneCallbacks, failCallbacks, progressCallbacks ) {
					deferred.done( doneCallbacks ).fail( failCallbacks ).progress( progressCallbacks );
					return this;
				},
				always: function() {
					deferred.done.apply( deferred, arguments ).fail.apply( deferred, arguments );
					return this;
				},
				pipe: function( fnDone, fnFail, fnProgress ) {
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( {
							done: [ fnDone, "resolve" ],
							fail: [ fnFail, "reject" ],
							progress: [ fnProgress, "notify" ]
						}, function( handler, data ) {
							var fn = data[ 0 ],
								action = data[ 1 ],
								returned;
							if ( jQuery.isFunction( fn ) ) {
								deferred[ handler ](function() {
									returned = fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise().then( newDefer.resolve, newDefer.reject, newDefer.notify );
									} else {
										newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
									}
								});
							} else {
								deferred[ handler ]( newDefer[ action ] );
							}
						});
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					if ( obj == null ) {
						obj = promise;
					} else {
						for ( var key in promise ) {
							obj[ key ] = promise[ key ];
						}
					}
					return obj;
				}
			},
			deferred = promise.promise({}),
			key;

		for ( key in lists ) {
			deferred[ key ] = lists[ key ].fire;
			deferred[ key + "With" ] = lists[ key ].fireWith;
		}

		// Handle state
		deferred.done( function() {
			state = "resolved";
		}, failList.disable, progressList.lock ).fail( function() {
			state = "rejected";
		}, doneList.disable, progressList.lock );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( firstParam ) {
		var args = sliceDeferred.call( arguments, 0 ),
			i = 0,
			length = args.length,
			pValues = new Array( length ),
			count = length,
			pCount = length,
			deferred = length <= 1 && firstParam && jQuery.isFunction( firstParam.promise ) ?
				firstParam :
				jQuery.Deferred(),
			promise = deferred.promise();
		function resolveFunc( i ) {
			return function( value ) {
				args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
				if ( !( --count ) ) {
					deferred.resolveWith( deferred, args );
				}
			};
		}
		function progressFunc( i ) {
			return function( value ) {
				pValues[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
				deferred.notifyWith( promise, pValues );
			};
		}
		if ( length > 1 ) {
			for ( ; i < length; i++ ) {
				if ( args[ i ] && args[ i ].promise && jQuery.isFunction( args[ i ].promise ) ) {
					args[ i ].promise().then( resolveFunc(i), deferred.reject, progressFunc(i) );
				} else {
					--count;
				}
			}
			if ( !count ) {
				deferred.resolveWith( deferred, args );
			}
		} else if ( deferred !== firstParam ) {
			deferred.resolveWith( deferred, length ? [ firstParam ] : [] );
		}
		return promise;
	}
});




jQuery.support = (function() {

	var support,
		all,
		a,
		select,
		opt,
		input,
		marginDiv,
		fragment,
		tds,
		events,
		eventName,
		i,
		isSupported,
		div = document.createElement( "div" ),
		documentElement = document.documentElement;

	// Preliminary tests
	div.setAttribute("className", "t");
	div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";

	all = div.getElementsByTagName( "*" );
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Can't get basic test support
	if ( !all || !all.length || !a ) {
		return {};
	}

	// First batch of supports tests
	select = document.createElement( "select" );
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName( "input" )[ 0 ];

	support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: ( div.firstChild.nodeType === 3 ),

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: ( a.getAttribute("href") === "/a" ),

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.55/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn: ( input.value === "on" ),

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// Tests for enctype support on a form(#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// Will be defined later
		submitBubbles: true,
		changeBubbles: true,
		focusinBubbles: false,
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
		div.attachEvent( "onclick", function() {
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			support.noCloneEvent = false;
		});
		div.cloneNode( true ).fireEvent( "onclick" );
	}

	// Check if a radio maintains its value
	// after being appended to the DOM
	input = document.createElement("input");
	input.value = "t";
	input.setAttribute("type", "radio");
	support.radioValue = input.value === "t";

	input.setAttribute("checked", "checked");
	div.appendChild( input );
	fragment = document.createDocumentFragment();
	fragment.appendChild( div.lastChild );

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	fragment.removeChild( input );
	fragment.appendChild( div );

	div.innerHTML = "";

	// Check if div with explicit width and no margin-right incorrectly
	// gets computed margin-right based on width of container. For more
	// info see bug #3333
	// Fails in WebKit before Feb 2011 nightlies
	// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
	if ( window.getComputedStyle ) {
		marginDiv = document.createElement( "div" );
		marginDiv.style.width = "0";
		marginDiv.style.marginRight = "0";
		div.style.width = "2px";
		div.appendChild( marginDiv );
		support.reliableMarginRight =
			( parseInt( ( window.getComputedStyle( marginDiv, null ) || { marginRight: 0 } ).marginRight, 10 ) || 0 ) === 0;
	}

	// Technique from Juriy Zaytsev
	// http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
	// We only care about the case where non-standard event systems
	// are used, namely in IE. Short-circuiting here helps us to
	// avoid an eval call (in setAttribute) which can cause CSP
	// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
	if ( div.attachEvent ) {
		for( i in {
			submit: 1,
			change: 1,
			focusin: 1
		}) {
			eventName = "on" + i;
			isSupported = ( eventName in div );
			if ( !isSupported ) {
				div.setAttribute( eventName, "return;" );
				isSupported = ( typeof div[ eventName ] === "function" );
			}
			support[ i + "Bubbles" ] = isSupported;
		}
	}

	fragment.removeChild( div );

	// Null elements to avoid leaks in IE
	fragment = select = opt = marginDiv = div = input = null;

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, outer, inner, table, td, offsetSupport,
			conMarginTop, ptlm, vb, style, html,
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		conMarginTop = 1;
		ptlm = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;";
		vb = "visibility:hidden;border:0;";
		style = "style='" + ptlm + "border:5px solid #000;padding:0;'";
		html = "<div " + style + "><div></div></div>" +
			"<table " + style + " cellpadding='0' cellspacing='0'>" +
			"<tr><td></td></tr></table>";

		container = document.createElement("div");
		container.style.cssText = vb + "width:0;height:0;position:static;top:0;margin-top:" + conMarginTop + "px";
		body.insertBefore( container, body.firstChild );

		// Construct the test element
		div = document.createElement("div");
		container.appendChild( div );

		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		// (only IE 8 fails this test)
		div.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName( "td" );
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Check if empty table cells still have offsetWidth/Height
		// (IE <= 8 fail this test)
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Figure out if the W3C box model works as expected
		div.innerHTML = "";
		div.style.width = div.style.paddingLeft = "1px";
		jQuery.boxModel = support.boxModel = div.offsetWidth === 2;

		if ( typeof div.style.zoom !== "undefined" ) {
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			// (IE < 8 does this)
			div.style.display = "inline";
			div.style.zoom = 1;
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 2 );

			// Check if elements with layout shrink-wrap their children
			// (IE 6 does this)
			div.style.display = "";
			div.innerHTML = "<div style='width:4px;'></div>";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 2 );
		}

		div.style.cssText = ptlm + vb;
		div.innerHTML = html;

		outer = div.firstChild;
		inner = outer.firstChild;
		td = outer.nextSibling.firstChild.firstChild;

		offsetSupport = {
			doesNotAddBorder: ( inner.offsetTop !== 5 ),
			doesAddBorderForTableAndCells: ( td.offsetTop === 5 )
		};

		inner.style.position = "fixed";
		inner.style.top = "20px";

		// safari subtracts parent border width here which is 5px
		offsetSupport.fixedPosition = ( inner.offsetTop === 20 || inner.offsetTop === 15 );
		inner.style.position = inner.style.top = "";

		outer.style.overflow = "hidden";
		outer.style.position = "relative";

		offsetSupport.subtractsBorderForOverflowNotVisible = ( inner.offsetTop === -5 );
		offsetSupport.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== conMarginTop );

		body.removeChild( container );
		div  = container = null;

		jQuery.extend( support, offsetSupport );
	});

	return support;
})();




var rbrace = /^(?:\{.*\}|\[.*\])$/,
	rmultiDash = /([A-Z])/g;

jQuery.extend({
	cache: {},

	// Please use with caution
	uuid: 0,

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var privateCache, thisCache, ret,
			internalKey = jQuery.expando,
			getByName = typeof name === "string",

			// We have to handle DOM nodes and JS objects differently because IE6-7
			// can't GC object references properly across the DOM-JS boundary
			isNode = elem.nodeType,

			// Only DOM nodes need the global jQuery cache; JS object data is
			// attached directly to the object so GC can occur automatically
			cache = isNode ? jQuery.cache : elem,

			// Only defining an ID for JS objects if its cache already exists allows
			// the code to shortcut on the same path as a DOM node with no cache
			id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey,
			isEvents = name === "events";

		// Avoid doing any more work than we need to when trying to get data on an
		// object that has no data at all
		if ( (!id || !cache[id] || (!isEvents && !pvt && !cache[id].data)) && getByName && data === undefined ) {
			return;
		}

		if ( !id ) {
			// Only DOM nodes need a new unique ID for each element since their data
			// ends up in the global cache
			if ( isNode ) {
				elem[ internalKey ] = id = ++jQuery.uuid;
			} else {
				id = internalKey;
			}
		}

		if ( !cache[ id ] ) {
			cache[ id ] = {};

			// Avoids exposing jQuery metadata on plain JS objects when the object
			// is serialized using JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}
		}

		// An object can be passed to jQuery.data instead of a key/value pair; this gets
		// shallow copied over onto the existing cache
		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ] = jQuery.extend( cache[ id ], name );
			} else {
				cache[ id ].data = jQuery.extend( cache[ id ].data, name );
			}
		}

		privateCache = thisCache = cache[ id ];

		// jQuery data() is stored in a separate object inside the object's internal data
		// cache in order to avoid key collisions between internal data and user-defined
		// data.
		if ( !pvt ) {
			if ( !thisCache.data ) {
				thisCache.data = {};
			}

			thisCache = thisCache.data;
		}

		if ( data !== undefined ) {
			thisCache[ jQuery.camelCase( name ) ] = data;
		}

		// Users should not attempt to inspect the internal events object using jQuery.data,
		// it is undocumented and subject to change. But does anyone listen? No.
		if ( isEvents && !thisCache[ name ] ) {
			return privateCache.events;
		}

		// Check for both converted-to-camel and non-converted data property names
		// If a data property was specified
		if ( getByName ) {

			// First Try to find as-is property data
			ret = thisCache[ name ];

			// Test for null|undefined property data
			if ( ret == null ) {

				// Try to find the camelCased property
				ret = thisCache[ jQuery.camelCase( name ) ];
			}
		} else {
			ret = thisCache;
		}

		return ret;
	},

	removeData: function( elem, name, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, i, l,

			// Reference to internal data cache key
			internalKey = jQuery.expando,

			isNode = elem.nodeType,

			// See jQuery.data for more information
			cache = isNode ? jQuery.cache : elem,

			// See jQuery.data for more information
			id = isNode ? elem[ internalKey ] : internalKey;

		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {

			thisCache = pvt ? cache[ id ] : cache[ id ].data;

			if ( thisCache ) {

				// Support array or space separated string names for data keys
				if ( !jQuery.isArray( name ) ) {

					// try the string as a key before any manipulation
					if ( name in thisCache ) {
						name = [ name ];
					} else {

						// split the camel cased version by spaces unless a key with the spaces exists
						name = jQuery.camelCase( name );
						if ( name in thisCache ) {
							name = [ name ];
						} else {
							name = name.split( " " );
						}
					}
				}

				for ( i = 0, l = name.length; i < l; i++ ) {
					delete thisCache[ name[i] ];
				}

				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
					return;
				}
			}
		}

		// See jQuery.data for more information
		if ( !pvt ) {
			delete cache[ id ].data;

			// Don't destroy the parent cache unless the internal data object
			// had been the only thing left in it
			if ( !isEmptyDataObject(cache[ id ]) ) {
				return;
			}
		}

		// Browsers that fail expando deletion also refuse to delete expandos on
		// the window, but it will allow it on all other JS objects; other browsers
		// don't care
		// Ensure that `cache` is not a window object #10080
		if ( jQuery.support.deleteExpando || !cache.setInterval ) {
			delete cache[ id ];
		} else {
			cache[ id ] = null;
		}

		// We destroyed the cache and need to eliminate the expando on the node to avoid
		// false lookups in the cache for entries that no longer exist
		if ( isNode ) {
			// IE does not allow us to delete expando properties from nodes,
			// nor does it have a removeAttribute function on Document nodes;
			// we must handle all of these cases
			if ( jQuery.support.deleteExpando ) {
				delete elem[ internalKey ];
			} else if ( elem.removeAttribute ) {
				elem.removeAttribute( internalKey );
			} else {
				elem[ internalKey ] = null;
			}
		}
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return jQuery.data( elem, name, data, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		if ( elem.nodeName ) {
			var match = jQuery.noData[ elem.nodeName.toLowerCase() ];

			if ( match ) {
				return !(match === true || elem.getAttribute("classid") !== match);
			}
		}

		return true;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var parts, attr, name,
			data = null;

		if ( typeof key === "undefined" ) {
			if ( this.length ) {
				data = jQuery.data( this[0] );

				if ( this[0].nodeType === 1 && !jQuery._data( this[0], "parsedAttrs" ) ) {
					attr = this[0].attributes;
					for ( var i = 0, l = attr.length; i < l; i++ ) {
						name = attr[i].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.substring(5) );

							dataAttr( this[0], name, data[ name ] );
						}
					}
					jQuery._data( this[0], "parsedAttrs", true );
				}
			}

			return data;

		} else if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		parts = key.split(".");
		parts[1] = parts[1] ? "." + parts[1] : "";

		if ( value === undefined ) {
			data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);

			// Try to fetch any internally stored data first
			if ( data === undefined && this.length ) {
				data = jQuery.data( this[0], key );
				data = dataAttr( this[0], key, data );
			}

			return data === undefined && parts[1] ?
				this.data( parts[0] ) :
				data;

		} else {
			return this.each(function() {
				var self = jQuery( this ),
					args = [ parts[0], value ];

				self.triggerHandler( "setData" + parts[1] + "!", args );
				jQuery.data( this, key, value );
				self.triggerHandler( "changeData" + parts[1] + "!", args );
			});
		}
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				jQuery.isNumeric( data ) ? parseFloat( data ) :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	for ( var name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}




function handleQueueMarkDefer( elem, type, src ) {
	var deferDataKey = type + "defer",
		queueDataKey = type + "queue",
		markDataKey = type + "mark",
		defer = jQuery._data( elem, deferDataKey );
	if ( defer &&
		( src === "queue" || !jQuery._data(elem, queueDataKey) ) &&
		( src === "mark" || !jQuery._data(elem, markDataKey) ) ) {
		// Give room for hard-coded callbacks to fire first
		// and eventually mark/queue something else on the element
		setTimeout( function() {
			if ( !jQuery._data( elem, queueDataKey ) &&
				!jQuery._data( elem, markDataKey ) ) {
				jQuery.removeData( elem, deferDataKey, true );
				defer.fire();
			}
		}, 0 );
	}
}

jQuery.extend({

	_mark: function( elem, type ) {
		if ( elem ) {
			type = ( type || "fx" ) + "mark";
			jQuery._data( elem, type, (jQuery._data( elem, type ) || 0) + 1 );
		}
	},

	_unmark: function( force, elem, type ) {
		if ( force !== true ) {
			type = elem;
			elem = force;
			force = false;
		}
		if ( elem ) {
			type = type || "fx";
			var key = type + "mark",
				count = force ? 0 : ( (jQuery._data( elem, key ) || 1) - 1 );
			if ( count ) {
				jQuery._data( elem, key, count );
			} else {
				jQuery.removeData( elem, key, true );
				handleQueueMarkDefer( elem, type, "mark" );
			}
		}
	},

	queue: function( elem, type, data ) {
		var q;
		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			q = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !q || jQuery.isArray(data) ) {
					q = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					q.push( data );
				}
			}
			return q || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			fn = queue.shift(),
			hooks = {};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
		}

		if ( fn ) {
			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			jQuery._data( elem, type + ".run", hooks );
			fn.call( elem, function() {
				jQuery.dequeue( elem, type );
			}, hooks );
		}

		if ( !queue.length ) {
			jQuery.removeData( elem, type + "queue " + type + ".run", true );
			handleQueueMarkDefer( elem, type, "queue" );
		}
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
		}

		if ( data === undefined ) {
			return jQuery.queue( this[0], type );
		}
		return this.each(function() {
			var queue = jQuery.queue( this, type, data );

			if ( type === "fx" && queue[0] !== "inprogress" ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, object ) {
		if ( typeof type !== "string" ) {
			object = type;
			type = undefined;
		}
		type = type || "fx";
		var defer = jQuery.Deferred(),
			elements = this,
			i = elements.length,
			count = 1,
			deferDataKey = type + "defer",
			queueDataKey = type + "queue",
			markDataKey = type + "mark",
			tmp;
		function resolve() {
			if ( !( --count ) ) {
				defer.resolveWith( elements, [ elements ] );
			}
		}
		while( i-- ) {
			if (( tmp = jQuery.data( elements[ i ], deferDataKey, undefined, true ) ||
					( jQuery.data( elements[ i ], queueDataKey, undefined, true ) ||
						jQuery.data( elements[ i ], markDataKey, undefined, true ) ) &&
					jQuery.data( elements[ i ], deferDataKey, jQuery.Callbacks( "once memory" ), true ) )) {
				count++;
				tmp.add( resolve );
			}
		}
		resolve();
		return defer.promise();
	}
});




var rclass = /[\n\t\r]/g,
	rspace = /\s+/,
	rreturn = /\r/g,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea)?$/i,
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	nodeHook, boolHook, fixSpecified;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, name, value, true, jQuery.attr );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, name, value, true, jQuery.prop );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classNames, i, l, elem,
			setClass, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call(this, j, this.className) );
			});
		}

		if ( value && typeof value === "string" ) {
			classNames = value.split( rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className && classNames.length === 1 ) {
						elem.className = value;

					} else {
						setClass = " " + elem.className + " ";

						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
								setClass += classNames[ c ] + " ";
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classNames, i, l, elem, className, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call(this, j, this.className) );
			});
		}

		if ( (value && typeof value === "string") || value === undefined ) {
			classNames = ( value || "" ).split( rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 && elem.className ) {
					if ( value ) {
						className = (" " + elem.className + " ").replace( rclass, " " );
						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							className = className.replace(" " + classNames[ c ] + " ", " ");
						}
						elem.className = jQuery.trim( className );

					} else {
						elem.className = "";
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( rspace );

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space seperated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// toggle whole className
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.nodeName.toLowerCase() ] || jQuery.valHooks[ elem.type ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var self = jQuery(this), val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.nodeName.toLowerCase() ] || jQuery.valHooks[ this.type ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, i, max, option,
					index = elem.selectedIndex,
					values = [],
					options = elem.options,
					one = elem.type === "select-one";

				// Nothing was selected
				if ( index < 0 ) {
					return null;
				}

				// Loop through all the selected options
				i = one ? index : 0;
				max = one ? index + 1 : options.length;
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Don't return options that are disabled or in a disabled optgroup
					if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
							(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				// Fixes Bug #2551 -- select.val() broken in IE after form.reset()
				if ( one && !values.length && options.length ) {
					return jQuery( options[ index ] ).val();
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attrFn: {
		val: true,
		css: true,
		html: true,
		text: true,
		data: true,
		width: true,
		height: true,
		offset: true
	},

	attr: function( elem, name, value, pass ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( pass && name in jQuery.attrFn ) {
			return jQuery( elem )[ name ]( value );
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;

			} else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, "" + value );
				return value;
			}

		} else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			ret = elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return ret === null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var propName, attrNames, name, l,
			i = 0;

		if ( value && elem.nodeType === 1 ) {
			attrNames = value.toLowerCase().split( rspace );
			l = attrNames.length;

			for ( ; i < l; i++ ) {
				name = attrNames[ i ];

				if ( name ) {
					propName = jQuery.propFix[ name ] || name;

					// See #9699 for explanation of this approach (setting first, then removal)
					jQuery.attr( elem, name, "" );
					elem.removeAttribute( getSetAttribute ? name : propName );

					// Set corresponding property to false for boolean attributes
					if ( rboolean.test( name ) && propName in elem ) {
						elem[ propName ] = false;
					}
				}
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				// We can't allow the type property to be changed (since it causes problems in IE)
				if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
					jQuery.error( "type property can't be changed" );
				} else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to it's default in case type is set after value
					// This is for element creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		},
		// Use the value property for back compat
		// Use the nodeHook for button elements in IE6/7 (#1954)
		value: {
			get: function( elem, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.get( elem, name );
				}
				return name in elem ?
					elem.value :
					null;
			},
			set: function( elem, value, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.set( elem, value, name );
				}
				// Does not return so that setAttribute is also used
				elem.value = value;
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Add the tabIndex propHook to attrHooks for back-compat (different case is intentional)
jQuery.attrHooks.tabindex = jQuery.propHooks.tabIndex;

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		// Align boolean attributes with corresponding properties
		// Fall back to attribute presence where some booleans are not supported
		var attrNode,
			property = jQuery.prop( elem, name );
		return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		var propName;
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			// value is true since we know at this point it's type boolean and not false
			// Set boolean attributes to the same name and set the DOM property
			propName = jQuery.propFix[ name ] || name;
			if ( propName in elem ) {
				// Only set the IDL specifically if it already exists on the element
				elem[ propName ] = true;
			}

			elem.setAttribute( name, name.toLowerCase() );
		}
		return name;
	}
};

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	fixSpecified = {
		name: true,
		id: true
	};

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret;
			ret = elem.getAttributeNode( name );
			return ret && ( fixSpecified[ name ] ? ret.nodeValue !== "" : ret.specified ) ?
				ret.nodeValue :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				ret = document.createAttribute( name );
				elem.setAttributeNode( ret );
			}
			return ( ret.nodeValue = value + "" );
		}
	};

	// Apply the nodeHook to tabindex
	jQuery.attrHooks.tabindex.set = nodeHook.set;

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			if ( value === "" ) {
				value = "false";
			}
			nodeHook.set( elem, value, name );
		}
	};
}


// Some attributes require a special call on IE
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret === null ? undefined : ret;
			}
		});
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Normalize to lowercase since IE uppercases css property names
			return elem.style.cssText.toLowerCase() || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = "" + value );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});




var rformElems = /^(?:textarea|input|select)$/i,
	rtypenamespace = /^([^\.]*)?(?:\.(.+))?$/,
	rhoverHack = /\bhover(\.\S+)?\b/,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rquickIs = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
	quickParse = function( selector ) {
		var quick = rquickIs.exec( selector );
		if ( quick ) {
			//   0  1    2   3
			// [ _, tag, id, class ]
			quick[1] = ( quick[1] || "" ).toLowerCase();
			quick[3] = quick[3] && new RegExp( "(?:^|\\s)" + quick[3] + "(?:\\s|$)" );
		}
		return quick;
	},
	quickIs = function( elem, m ) {
		var attrs = elem.attributes || {};
		return (
			(!m[1] || elem.nodeName.toLowerCase() === m[1]) &&
			(!m[2] || (attrs.id || {}).value === m[2]) &&
			(!m[3] || m[3].test( (attrs[ "class" ] || {}).value ))
		);
	},
	hoverHack = function( events ) {
		return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
	};

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	add: function( elem, types, handler, data, selector ) {

		var elemData, eventHandle, events,
			t, tns, type, namespaces, handleObj,
			handleObjIn, quick, handlers, special;

		// Don't attach events to noData or text/comment nodes (allow plain objects tho)
		if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		events = elemData.events;
		if ( !events ) {
			elemData.events = events = {};
		}
		eventHandle = elemData.handle;
		if ( !eventHandle ) {
			elemData.handle = eventHandle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = jQuery.trim( hoverHack(types) ).split( " " );
		for ( t = 0; t < types.length; t++ ) {

			tns = rtypenamespace.exec( types[t] ) || [];
			type = tns[1];
			namespaces = ( tns[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: tns[1],
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				quick: quickParse( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			handlers = events[ type ];
			if ( !handlers ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	global: {},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var elemData = jQuery.hasData( elem ) && jQuery._data( elem ),
			t, tns, type, origType, namespaces, origCount,
			j, events, special, handle, eventType, handleObj;

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = jQuery.trim( hoverHack( types || "" ) ).split(" ");
		for ( t = 0; t < types.length; t++ ) {
			tns = rtypenamespace.exec( types[t] ) || [];
			type = origType = tns[1];
			namespaces = tns[2];

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector? special.delegateType : special.bindType ) || type;
			eventType = events[ type ] || [];
			origCount = eventType.length;
			namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;

			// Remove matching events
			for ( j = 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					 ( !handler || handler.guid === handleObj.guid ) &&
					 ( !namespaces || namespaces.test( handleObj.namespace ) ) &&
					 ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					eventType.splice( j--, 1 );

					if ( handleObj.selector ) {
						eventType.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( eventType.length === 0 && origCount !== eventType.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			handle = elemData.handle;
			if ( handle ) {
				handle.elem = null;
			}

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery.removeData( elem, [ "events", "handle" ], true );
		}
	},

	// Events that are safe to short-circuit if no handlers are attached.
	// Native DOM events should not be added, they may have inline handlers.
	customEvent: {
		"getData": true,
		"setData": true,
		"changeData": true
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		// Don't do events on text and comment nodes
		if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
			return;
		}

		// Event object or event type
		var type = event.type || event,
			namespaces = [],
			cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType;

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "!" ) >= 0 ) {
			// Exclusive events trigger only for the exact event (no namespaces)
			type = type.slice(0, -1);
			exclusive = true;
		}

		if ( type.indexOf( "." ) >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}

		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
			// No jQuery handlers for this event type, and it can't have inline handlers
			return;
		}

		// Caller can pass in an Event, Object, or just an event type string
		event = typeof event === "object" ?
			// jQuery.Event object
			event[ jQuery.expando ] ? event :
			// Object literal
			new jQuery.Event( type, event ) :
			// Just the event type (string)
			new jQuery.Event( type );

		event.type = type;
		event.isTrigger = true;
		event.exclusive = exclusive;
		event.namespace = namespaces.join( "." );
		event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
		ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";

		// Handle a global trigger
		if ( !elem ) {

			// TODO: Stop taunting the data cache; remove global events and always attach to document
			cache = jQuery.cache;
			for ( i in cache ) {
				if ( cache[ i ].events && cache[ i ].events[ type ] ) {
					jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
				}
			}
			return;
		}

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data != null ? jQuery.makeArray( data ) : [];
		data.unshift( event );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		eventPath = [[ elem, special.bindType || type ]];
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;
			old = null;
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push([ cur, bubbleType ]);
				old = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( old && old === elem.ownerDocument ) {
				eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
			}
		}

		// Fire handlers on the event path
		for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {

			cur = eventPath[i][0];
			event.type = eventPath[i][1];

			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}
			// Note that this is a bare JS function and not a jQuery handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				// IE<9 dies on focus/blur to hidden element (#1486)
				if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					old = elem[ ontype ];

					if ( old ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( old ) {
						elem[ ontype ] = old;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event || window.event );

		var handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
			delegateCount = handlers.delegateCount,
			args = [].slice.call( arguments, 0 ),
			run_all = !event.exclusive && !event.namespace,
			handlerQueue = [],
			i, j, cur, jqcur, ret, selMatch, matched, matches, handleObj, sel, related;

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Determine handlers that should run if there are delegated events
		// Avoid disabled elements in IE (#6911) and non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && !event.target.disabled && !(event.button && event.type === "click") ) {

			// Pregenerate a single jQuery object for reuse with .is()
			jqcur = jQuery(this);
			jqcur.context = this.ownerDocument || this;

			for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {
				selMatch = {};
				matches = [];
				jqcur[0] = cur;
				for ( i = 0; i < delegateCount; i++ ) {
					handleObj = handlers[ i ];
					sel = handleObj.selector;

					if ( selMatch[ sel ] === undefined ) {
						selMatch[ sel ] = (
							handleObj.quick ? quickIs( cur, handleObj.quick ) : jqcur.is( sel )
						);
					}
					if ( selMatch[ sel ] ) {
						matches.push( handleObj );
					}
				}
				if ( matches.length ) {
					handlerQueue.push({ elem: cur, matches: matches });
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( handlers.length > delegateCount ) {
			handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
		}

		// Run delegates first; they may want to stop propagation beneath us
		for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
			matched = handlerQueue[ i ];
			event.currentTarget = matched.elem;

			for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
				handleObj = matched.matches[ j ];

				// Triggered event must either 1) be non-exclusive and have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {

					event.data = handleObj.data;
					event.handleObj = handleObj;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		return event.result;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	// *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
	props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop,
			originalEvent = event,
			fixHook = jQuery.event.fixHooks[ event.type ] || {},
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = jQuery.Event( originalEvent );

		for ( i = copy.length; i; ) {
			prop = copy[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Target should not be a text node (#504, Safari)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// For mouse/key events; add metaKey if it's not there (#3368, IE6/7/8)
		if ( event.metaKey === undefined ) {
			event.metaKey = event.ctrlKey;
		}

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		ready: {
			// Make sure the ready event is setup
			setup: jQuery.bindReady
		},

		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},

		focus: {
			delegateType: "focusin"
		},
		blur: {
			delegateType: "focusout"
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

// Some plugins are using, but it's undocumented/deprecated and will be removed.
// The 1.7 special event interface should provide all the hooks needed now.
jQuery.event.handle = jQuery.event.dispatch;

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		if ( elem.detachEvent ) {
			elem.detachEvent( "on" + type, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}

		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj,
				selector = handleObj.selector,
				ret;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !form._submit_attached ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						// If form was submitted by the user, bubble the event up the tree
						if ( this.parentNode && !event.isTrigger ) {
							jQuery.event.simulate( "submit", this.parentNode, event, true );
						}
					});
					form._submit_attached = true;
				}
			});
			// return undefined since we don't need an event listener
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
							jQuery.event.simulate( "change", this, event, true );
						}
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !elem._change_attached ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					elem._change_attached = true;
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on.call( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			var handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace? handleObj.type + "." + handleObj.namespace : handleObj.type,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( var type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	live: function( types, data, fn ) {
		jQuery( this.context ).on( types, this.selector, data, fn );
		return this;
	},
	die: function( types, fn ) {
		jQuery( this.context ).off( types, this.selector || "**", fn );
		return this;
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length == 1? this.off( selector, "**" ) : this.off( types, selector, fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			return jQuery.event.trigger( type, data, this[0], true );
		}
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments,
			guid = fn.guid || jQuery.guid++,
			i = 0,
			toggler = function( event ) {
				// Figure out which function to execute
				var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
				jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

				// Make sure that clicks stop
				event.preventDefault();

				// and execute the function
				return args[ lastToggle ].apply( this, arguments ) || false;
			};

		// link all the functions, so any of them can unbind this click handler
		toggler.guid = guid;
		while ( i < args.length ) {
			args[ i++ ].guid = guid;
		}

		return this.click( toggler );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};

	if ( jQuery.attrFn ) {
		jQuery.attrFn[ name ] = true;
	}

	if ( rkeyEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
	}

	if ( rmouseEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
	}
});



/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	expando = "sizcache" + (Math.random() + '').replace('.', ''),
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true,
	rBackslash = /\\/g,
	rReturn = /\r\n/g,
	rNonWord = /\W/;

// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function( selector, context, results, seed ) {
	results = results || [];
	context = context || document;

	var origContext = context;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var m, set, checkSet, extra, ret, cur, pop, i,
		prune = true,
		contextXML = Sizzle.isXML( context ),
		parts = [],
		soFar = selector;
	
	// Reset the position of the chunker regexp (start from head)
	do {
		chunker.exec( "" );
		m = chunker.exec( soFar );

		if ( m ) {
			soFar = m[3];
		
			parts.push( m[1] );
		
			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

	if ( parts.length > 1 && origPOS.exec( selector ) ) {

		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context, seed );

		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] ) {
					selector += parts.shift();
				}
				
				set = posProcess( selector, set, seed );
			}
		}

	} else {
		// Take a shortcut and set the context if the root selector is an ID
		// (but not if it'll be faster if the inner selector is an ID)
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {

			ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ?
				Sizzle.filter( ret.expr, ret.set )[0] :
				ret.set[0];
		}

		if ( context ) {
			ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );

			set = ret.expr ?
				Sizzle.filter( ret.expr, ret.set ) :
				ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray( set );

			} else {
				prune = false;
			}

			while ( parts.length ) {
				cur = parts.pop();
				pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}

		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		Sizzle.error( cur || selector );
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );

		} else if ( context && context.nodeType === 1 ) {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}

		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}

	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function( results ) {
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function( expr, set ) {
	return Sizzle( expr, null, null, set );
};

Sizzle.matchesSelector = function( node, expr ) {
	return Sizzle( expr, null, null, [node] ).length > 0;
};

Sizzle.find = function( expr, context, isXML ) {
	var set, i, len, match, type, left;

	if ( !expr ) {
		return [];
	}

	for ( i = 0, len = Expr.order.length; i < len; i++ ) {
		type = Expr.order[i];
		
		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			left = match[1];
			match.splice( 1, 1 );

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace( rBackslash, "" );
				set = Expr.find[ type ]( match, context, isXML );

				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( "*" ) :
			[];
	}

	return { set: set, expr: expr };
};

Sizzle.filter = function( expr, set, inplace, not ) {
	var match, anyFound,
		type, found, item, filter, left,
		i, pass,
		old = expr,
		result = [],
		curLoop = set,
		isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );

	while ( expr && set.length ) {
		for ( type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				filter = Expr.filter[ type ];
				left = match[1];

				anyFound = false;

				match.splice(1,1);

				if ( left.substr( left.length - 1 ) === "\\" ) {
					continue;
				}

				if ( curLoop === result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;

					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							pass = not ^ found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;

								} else {
									curLoop[i] = false;
								}

							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr === old ) {
			if ( anyFound == null ) {
				Sizzle.error( expr );

			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Utility function for retreiving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
var getText = Sizzle.getText = function( elem ) {
    var i, node,
		nodeType = elem.nodeType,
		ret = "";

	if ( nodeType ) {
		if ( nodeType === 1 || nodeType === 9 ) {
			// Use textContent || innerText for elements
			if ( typeof elem.textContent === 'string' ) {
				return elem.textContent;
			} else if ( typeof elem.innerText === 'string' ) {
				// Replace IE's carriage returns
				return elem.innerText.replace( rReturn, '' );
			} else {
				// Traverse it's children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
	} else {

		// If no nodeType, this is expected to be an array
		for ( i = 0; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			if ( node.nodeType !== 8 ) {
				ret += getText( node );
			}
		}
	}
	return ret;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],

	match: {
		ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
	},

	leftMatch: {},

	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},

	attrHandle: {
		href: function( elem ) {
			return elem.getAttribute( "href" );
		},
		type: function( elem ) {
			return elem.getAttribute( "type" );
		}
	},

	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !rNonWord.test( part ),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag ) {
				part = part.toLowerCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},

		">": function( checkSet, part ) {
			var elem,
				isPartStr = typeof part === "string",
				i = 0,
				l = checkSet.length;

			if ( isPartStr && !rNonWord.test( part ) ) {
				part = part.toLowerCase();

				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}

			} else {
				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},

		"": function(checkSet, part, isXML){
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
		},

		"~": function( checkSet, part, isXML ) {
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
		}
	},

	find: {
		ID: function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		},

		NAME: function( match, context ) {
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [],
					results = context.getElementsByName( match[1] );

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},

		TAG: function( match, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( match[1] );
			}
		}
	},
	preFilter: {
		CLASS: function( match, curLoop, inplace, result, not, isXML ) {
			match = " " + match[1].replace( rBackslash, "" ) + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
						if ( !inplace ) {
							result.push( elem );
						}

					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},

		ID: function( match ) {
			return match[1].replace( rBackslash, "" );
		},

		TAG: function( match, curLoop ) {
			return match[1].replace( rBackslash, "" ).toLowerCase();
		},

		CHILD: function( match ) {
			if ( match[1] === "nth" ) {
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				match[2] = match[2].replace(/^\+|\s*/g, '');

				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}
			else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},

		ATTR: function( match, curLoop, inplace, result, not, isXML ) {
			var name = match[1] = match[1].replace( rBackslash, "" );
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			// Handle if an un-quoted value was used
			match[4] = ( match[4] || match[5] || "" ).replace( rBackslash, "" );

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},

		PSEUDO: function( match, curLoop, inplace, result, not ) {
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);

				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);

					if ( !inplace ) {
						result.push.apply( result, ret );
					}

					return false;
				}

			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},

		POS: function( match ) {
			match.unshift( true );

			return match;
		}
	},
	
	filters: {
		enabled: function( elem ) {
			return elem.disabled === false && elem.type !== "hidden";
		},

		disabled: function( elem ) {
			return elem.disabled === true;
		},

		checked: function( elem ) {
			return elem.checked === true;
		},
		
		selected: function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}
			
			return elem.selected === true;
		},

		parent: function( elem ) {
			return !!elem.firstChild;
		},

		empty: function( elem ) {
			return !elem.firstChild;
		},

		has: function( elem, i, match ) {
			return !!Sizzle( match[3], elem ).length;
		},

		header: function( elem ) {
			return (/h\d/i).test( elem.nodeName );
		},

		text: function( elem ) {
			var attr = elem.getAttribute( "type" ), type = elem.type;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc) 
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" && "text" === type && ( attr === type || attr === null );
		},

		radio: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
		},

		checkbox: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
		},

		file: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
		},

		password: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
		},

		submit: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && "submit" === elem.type;
		},

		image: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
		},

		reset: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && "reset" === elem.type;
		},

		button: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && "button" === elem.type || name === "button";
		},

		input: function( elem ) {
			return (/input|select|textarea|button/i).test( elem.nodeName );
		},

		focus: function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		}
	},
	setFilters: {
		first: function( elem, i ) {
			return i === 0;
		},

		last: function( elem, i, match, array ) {
			return i === array.length - 1;
		},

		even: function( elem, i ) {
			return i % 2 === 0;
		},

		odd: function( elem, i ) {
			return i % 2 === 1;
		},

		lt: function( elem, i, match ) {
			return i < match[3] - 0;
		},

		gt: function( elem, i, match ) {
			return i > match[3] - 0;
		},

		nth: function( elem, i, match ) {
			return match[3] - 0 === i;
		},

		eq: function( elem, i, match ) {
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function( elem, match, i, array ) {
			var name = match[1],
				filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );

			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || getText([ elem ]) || "").indexOf(match[3]) >= 0;

			} else if ( name === "not" ) {
				var not = match[3];

				for ( var j = 0, l = not.length; j < l; j++ ) {
					if ( not[j] === elem ) {
						return false;
					}
				}

				return true;

			} else {
				Sizzle.error( name );
			}
		},

		CHILD: function( elem, match ) {
			var first, last,
				doneName, parent, cache,
				count, diff,
				type = match[1],
				node = elem;

			switch ( type ) {
				case "only":
				case "first":
					while ( (node = node.previousSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					if ( type === "first" ) { 
						return true; 
					}

					node = elem;

				case "last":
					while ( (node = node.nextSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					return true;

				case "nth":
					first = match[2];
					last = match[3];

					if ( first === 1 && last === 0 ) {
						return true;
					}
					
					doneName = match[0];
					parent = elem.parentNode;
	
					if ( parent && (parent[ expando ] !== doneName || !elem.nodeIndex) ) {
						count = 0;
						
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 

						parent[ expando ] = doneName;
					}
					
					diff = elem.nodeIndex - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
			}
		},

		ID: function( elem, match ) {
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},

		TAG: function( elem, match ) {
			return (match === "*" && elem.nodeType === 1) || !!elem.nodeName && elem.nodeName.toLowerCase() === match;
		},
		
		CLASS: function( elem, match ) {
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},

		ATTR: function( elem, match ) {
			var name = match[1],
				result = Sizzle.attr ?
					Sizzle.attr( elem, name ) :
					Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				!type && Sizzle.attr ?
				result != null :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value !== check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},

		POS: function( elem, match, i, array ) {
			var name = match[2],
				filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS,
	fescape = function(all, num){
		return "\\" + (num - 0 + 1);
	};

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}

var makeArray = function( array, results ) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

// Provide a fallback method if it does not work
} catch( e ) {
	makeArray = function( array, results ) {
		var i = 0,
			ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );

		} else {
			if ( typeof array.length === "number" ) {
				for ( var l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}

			} else {
				for ( ; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder, siblingCheck;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			return a.compareDocumentPosition ? -1 : 1;
		}

		return a.compareDocumentPosition(b) & 4 ? -1 : 1;
	};

} else {
	sortOrder = function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

	siblingCheck = function( a, b, ret ) {
		if ( a === b ) {
			return ret;
		}

		var cur = a.nextSibling;

		while ( cur ) {
			if ( cur === b ) {
				return -1;
			}

			cur = cur.nextSibling;
		}

		return 1;
	};
}

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("div"),
		id = "script" + (new Date()).getTime(),
		root = document.documentElement;

	form.innerHTML = "<a name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( document.getElementById( id ) ) {
		Expr.find.ID = function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);

				return m ?
					m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
						[m] :
						undefined :
					[];
			}
		};

		Expr.filter.ID = function( elem, match ) {
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");

			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );

	// release memory in IE
	root = form = null;
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function( match, context ) {
			var results = context.getElementsByTagName( match[1] );

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";

	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {

		Expr.attrHandle.href = function( elem ) {
			return elem.getAttribute( "href", 2 );
		};
	}

	// release memory in IE
	div = null;
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle,
			div = document.createElement("div"),
			id = "__sizzle__";

		div.innerHTML = "<p class='TEST'></p>";

		// Safari can't handle uppercase or unicode characters when
		// in quirks mode.
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}
	
		Sizzle = function( query, context, extra, seed ) {
			context = context || document;

			// Only use querySelectorAll on non-XML documents
			// (ID selectors don't work in non-HTML documents)
			if ( !seed && !Sizzle.isXML(context) ) {
				// See if we find a selector to speed up
				var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );
				
				if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
					// Speed-up: Sizzle("TAG")
					if ( match[1] ) {
						return makeArray( context.getElementsByTagName( query ), extra );
					
					// Speed-up: Sizzle(".CLASS")
					} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
						return makeArray( context.getElementsByClassName( match[2] ), extra );
					}
				}
				
				if ( context.nodeType === 9 ) {
					// Speed-up: Sizzle("body")
					// The body element only exists once, optimize finding it
					if ( query === "body" && context.body ) {
						return makeArray( [ context.body ], extra );
						
					// Speed-up: Sizzle("#ID")
					} else if ( match && match[3] ) {
						var elem = context.getElementById( match[3] );

						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Handle the case where IE and Opera return items
							// by name instead of ID
							if ( elem.id === match[3] ) {
								return makeArray( [ elem ], extra );
							}
							
						} else {
							return makeArray( [], extra );
						}
					}
					
					try {
						return makeArray( context.querySelectorAll(query), extra );
					} catch(qsaError) {}

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var oldContext = context,
						old = context.getAttribute( "id" ),
						nid = old || id,
						hasParent = context.parentNode,
						relativeHierarchySelector = /^\s*[+~]/.test( query );

					if ( !old ) {
						context.setAttribute( "id", nid );
					} else {
						nid = nid.replace( /'/g, "\\$&" );
					}
					if ( relativeHierarchySelector && hasParent ) {
						context = context.parentNode;
					}

					try {
						if ( !relativeHierarchySelector || hasParent ) {
							return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
						}

					} catch(pseudoError) {
					} finally {
						if ( !old ) {
							oldContext.removeAttribute( "id" );
						}
					}
				}
			}
		
			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		// release memory in IE
		div = null;
	})();
}

(function(){
	var html = document.documentElement,
		matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;

	if ( matches ) {
		// Check to see if it's possible to do matchesSelector
		// on a disconnected node (IE 9 fails this)
		var disconnectedMatch = !matches.call( document.createElement( "div" ), "div" ),
			pseudoWorks = false;

		try {
			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( document.documentElement, "[test!='']:sizzle" );
	
		} catch( pseudoError ) {
			pseudoWorks = true;
		}

		Sizzle.matchesSelector = function( node, expr ) {
			// Make sure that attribute selectors are quoted
			expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

			if ( !Sizzle.isXML( node ) ) {
				try { 
					if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
						var ret = matches.call( node, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || !disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9, so check for that
								node.document && node.document.nodeType !== 11 ) {
							return ret;
						}
					}
				} catch(e) {}
			}

			return Sizzle(expr, null, null, [node]).length > 0;
		};
	}
})();

(function(){
	var div = document.createElement("div");

	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	// Also, make sure that getElementsByClassName actually exists
	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
		return;
	}

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 ) {
		return;
	}
	
	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function( match, context, isXML ) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	// release memory in IE
	div = null;
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;

			elem = elem[dir];

			while ( elem ) {
				if ( elem[ expando ] === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem[ expando ] = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName.toLowerCase() === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;
			
			elem = elem[dir];

			while ( elem ) {
				if ( elem[ expando ] === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem[ expando ] = doneName;
						elem.sizset = i;
					}

					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

if ( document.documentElement.contains ) {
	Sizzle.contains = function( a, b ) {
		return a !== b && (a.contains ? a.contains(b) : true);
	};

} else if ( document.documentElement.compareDocumentPosition ) {
	Sizzle.contains = function( a, b ) {
		return !!(a.compareDocumentPosition(b) & 16);
	};

} else {
	Sizzle.contains = function() {
		return false;
	};
}

Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833) 
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function( selector, context, seed ) {
	var match,
		tmpSet = [],
		later = "",
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet, seed );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE
// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
Sizzle.selectors.attrMap = {};
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.filters;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})();


var runtil = /Until$/,
	rparentsprev = /^(?:parents|prevUntil|prevAll)/,
	// Note: This RegExp should be improved, or likely pulled from Sizzle
	rmultiselector = /,/,
	isSimple = /^.[^:#\[\.,]*$/,
	slice = Array.prototype.slice,
	POS = jQuery.expr.match.POS,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var self = this,
			i, l;

		if ( typeof selector !== "string" ) {
			return jQuery( selector ).filter(function() {
				for ( i = 0, l = self.length; i < l; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			});
		}

		var ret = this.pushStack( "", "find", selector ),
			length, n, r;

		for ( i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				// Make sure that the results are unique
				for ( n = length; n < ret.length; n++ ) {
					for ( r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var targets = jQuery( target );
		return this.filter(function() {
			for ( var i = 0, l = targets.length; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},

	is: function( selector ) {
		return !!selector && ( 
			typeof selector === "string" ?
				// If this is a positional selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				POS.test( selector ) ? 
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var ret = [], i, l, cur = this[0];
		
		// Array (deprecated as of jQuery 1.7)
		if ( jQuery.isArray( selectors ) ) {
			var level = 1;

			while ( cur && cur.ownerDocument && cur !== context ) {
				for ( i = 0; i < selectors.length; i++ ) {

					if ( jQuery( cur ).is( selectors[ i ] ) ) {
						ret.push({ selector: selectors[ i ], elem: cur, level: level });
					}
				}

				cur = cur.parentNode;
				level++;
			}

			return ret;
		}

		// String
		var pos = POS.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( i = 0, l = this.length; i < l; i++ ) {
			cur = this[i];

			while ( cur ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;

				} else {
					cur = cur.parentNode;
					if ( !cur || !cur.ownerDocument || cur === context || cur.nodeType === 11 ) {
						break;
					}
				}
			}
		}

		ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

		return this.pushStack( ret, "closest", selectors );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	andSelf: function() {
		return this.add( this.prevObject );
	}
});

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return jQuery.nth( elem, 2, "nextSibling" );
	},
	prev: function( elem ) {
		return jQuery.nth( elem, 2, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( elem.parentNode.firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.makeArray( elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, slice.call( arguments ).join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	nth: function( cur, result, dir, elem ) {
		result = result || 1;
		var num = 0;

		for ( ; cur; cur = cur[dir] ) {
			if ( cur.nodeType === 1 && ++num === result ) {
				break;
			}
		}

		return cur;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}




function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
	safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style)/i,
	rnocache = /<(?:script|object|embed|option|style)/i,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")", "i"),
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /\/(java|ecma)script/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)/,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	},
	safeFragment = createSafeFragment( document );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE can't serialize <link> and <script> tags normally
if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "div<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( text ) {
		if ( jQuery.isFunction(text) ) {
			return this.each(function(i) {
				var self = jQuery( this );

				self.text( text.call(this, i, self.text()) );
			});
		}

		if ( typeof text !== "object" && text !== undefined ) {
			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );
		}

		return jQuery.text( this );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		} else if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			set.push.apply( set, this.toArray() );
			return this.pushStack( set, "before", arguments );
		}
	},

	after: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		} else if ( arguments.length ) {
			var set = this.pushStack( this, "after", arguments );
			set.push.apply( set, jQuery.clean(arguments) );
			return set;
		}
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		if ( value === undefined ) {
			return this[0] && this[0].nodeType === 1 ?
				this[0].innerHTML.replace(rinlinejQuery, "") :
				null;

		// See if we can take a shortcut and just use innerHTML
		} else if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
			(jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value )) &&
			!wrapMap[ (rtagName.exec( value ) || ["", ""])[1].toLowerCase() ] ) {

			value = value.replace(rxhtmlTag, "<$1></$2>");

			try {
				for ( var i = 0, l = this.length; i < l; i++ ) {
					// Remove element nodes and prevent memory leaks
					if ( this[i].nodeType === 1 ) {
						jQuery.cleanData( this[i].getElementsByTagName("*") );
						this[i].innerHTML = value;
					}
				}

			// If using innerHTML throws an exception, use the fallback method
			} catch(e) {
				this.empty().append( value );
			}

		} else if ( jQuery.isFunction( value ) ) {
			this.each(function(i){
				var self = jQuery( this );

				self.html( value.call(this, i, self.html()) );
			});

		} else {
			this.empty().append( value );
		}

		return this;
	},

	replaceWith: function( value ) {
		if ( this[0] && this[0].parentNode ) {
			// Make sure that the elements are removed from the DOM before they are inserted
			// this can help fix replacing a parent with child elements
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		} else {
			return this.length ?
				this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
				this;
		}
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {
		var results, first, fragment, parent,
			value = args[0],
			scripts = [];

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( !jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback, true );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call(this, i, table ? self.html() : undefined);
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			parent = value && value.parentNode;

			// If we're in a fragment, just use that instead of building a new one
			if ( jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length ) {
				results = { fragment: parent };

			} else {
				results = jQuery.buildFragment( args, this, scripts );
			}

			fragment = results.fragment;

			if ( fragment.childNodes.length === 1 ) {
				first = fragment = fragment.firstChild;
			} else {
				first = fragment.firstChild;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				for ( var i = 0, l = this.length, lastIndex = l - 1; i < l; i++ ) {
					callback.call(
						table ?
							root(this[i], first) :
							this[i],
						// Make sure that we do not leak memory by inadvertently discarding
						// the original fragment (which might have attached data) instead of
						// using it; in addition, use the original fragment object for the last
						// item instead of first because it can end up being emptied incorrectly
						// in certain situations (Bug #8070).
						// Fragments from the fragment cache must always be cloned and never used
						// in place.
						results.cacheable || ( l > 1 && i < lastIndex ) ?
							jQuery.clone( fragment, true, true ) :
							fragment
					);
				}
			}

			if ( scripts.length ) {
				jQuery.each( scripts, evalScript );
			}
		}

		return this;
	}
});

function root( elem, cur ) {
	return jQuery.nodeName(elem, "table") ?
		(elem.getElementsByTagName("tbody")[0] ||
		elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
		elem;
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type + ( events[ type ][ i ].namespace ? "." : "" ) + events[ type ][ i ].namespace, events[ type ][ i ], events[ type ][ i ].data );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function cloneFixAttributes( src, dest ) {
	var nodeName;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	// clearAttributes removes the attributes, which we don't want,
	// but also removes the attachEvent events, which we *do* want
	if ( dest.clearAttributes ) {
		dest.clearAttributes();
	}

	// mergeAttributes, in contrast, only merges back on the
	// original attributes, not the events
	if ( dest.mergeAttributes ) {
		dest.mergeAttributes( src );
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 fail to clone children inside object elements that use
	// the proprietary classid attribute value (rather than the type
	// attribute) to identify the type of content to display
	if ( nodeName === "object" ) {
		dest.outerHTML = src.outerHTML;

	} else if ( nodeName === "input" && (src.type === "checkbox" || src.type === "radio") ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set
		if ( src.checked ) {
			dest.defaultChecked = dest.checked = src.checked;
		}

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}

	// Event data gets referenced instead of copied if the expando
	// gets copied too
	dest.removeAttribute( jQuery.expando );
}

jQuery.buildFragment = function( args, nodes, scripts ) {
	var fragment, cacheable, cacheresults, doc,
	first = args[ 0 ];

	// nodes may contain either an explicit document object,
	// a jQuery collection or context object.
	// If nodes[0] contains a valid object to assign to doc
	if ( nodes && nodes[0] ) {
		doc = nodes[0].ownerDocument || nodes[0];
	}

	// Ensure that an attr object doesn't incorrectly stand in as a document object
	// Chrome and Firefox seem to allow this to occur and will throw exception
	// Fixes #8950
	if ( !doc.createDocumentFragment ) {
		doc = document;
	}

	// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	// Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
	if ( args.length === 1 && typeof first === "string" && first.length < 512 && doc === document &&
		first.charAt(0) === "<" && !rnocache.test( first ) &&
		(jQuery.support.checkClone || !rchecked.test( first )) &&
		(jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {

		cacheable = true;

		cacheresults = jQuery.fragments[ first ];
		if ( cacheresults && cacheresults !== 1 ) {
			fragment = cacheresults;
		}
	}

	if ( !fragment ) {
		fragment = doc.createDocumentFragment();
		jQuery.clean( args, doc, fragment, scripts );
	}

	if ( cacheable ) {
		jQuery.fragments[ first ] = cacheresults ? fragment : 1;
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var ret = [],
			insert = jQuery( selector ),
			parent = this.length === 1 && this[0].parentNode;

		if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
			insert[ original ]( this[0] );
			return this;

		} else {
			for ( var i = 0, l = insert.length; i < l; i++ ) {
				var elems = ( i > 0 ? this.clone(true) : this ).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
});

function getAll( elem ) {
	if ( typeof elem.getElementsByTagName !== "undefined" ) {
		return elem.getElementsByTagName( "*" );

	} else if ( typeof elem.querySelectorAll !== "undefined" ) {
		return elem.querySelectorAll( "*" );

	} else {
		return [];
	}
}

// Used in clean, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( elem.type === "checkbox" || elem.type === "radio" ) {
		elem.defaultChecked = elem.checked;
	}
}
// Finds all inputs and passes them to fixDefaultChecked
function findInputs( elem ) {
	var nodeName = ( elem.nodeName || "" ).toLowerCase();
	if ( nodeName === "input" ) {
		fixDefaultChecked( elem );
	// Skip scripts, get other children
	} else if ( nodeName !== "script" && typeof elem.getElementsByTagName !== "undefined" ) {
		jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
	}
}

// Derived From: http://www.iecss.com/shimprove/javascript/shimprove.1-0-1.js
function shimCloneNode( elem ) {
	var div = document.createElement( "div" );
	safeFragment.appendChild( div );

	div.innerHTML = elem.outerHTML;
	return div.firstChild;
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var srcElements,
			destElements,
			i,
			// IE<=8 does not properly clone detached, unknown element nodes
			clone = jQuery.support.html5Clone || !rnoshimcache.test( "<" + elem.nodeName ) ?
				elem.cloneNode( true ) :
				shimCloneNode( elem );

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
			// IE copies events bound via attachEvent when using cloneNode.
			// Calling detachEvent on the clone will also remove the events
			// from the original. In order to get around this, we use some
			// proprietary methods to clear the events. Thanks to MooTools
			// guys for this hotness.

			cloneFixAttributes( elem, clone );

			// Using Sizzle here is crazy slow, so we use getElementsByTagName instead
			srcElements = getAll( elem );
			destElements = getAll( clone );

			// Weird iteration because IE will replace the length property
			// with an element if you are cloning the body and one of the
			// elements on the page has a name or id of "length"
			for ( i = 0; srcElements[i]; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					cloneFixAttributes( srcElements[i], destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			cloneCopyEvent( elem, clone );

			if ( deepDataAndEvents ) {
				srcElements = getAll( elem );
				destElements = getAll( clone );

				for ( i = 0; srcElements[i]; ++i ) {
					cloneCopyEvent( srcElements[i], destElements[i] );
				}
			}
		}

		srcElements = destElements = null;

		// Return the cloned set
		return clone;
	},

	clean: function( elems, context, fragment, scripts ) {
		var checkScriptType;

		context = context || document;

		// !context.createElement fails in IE with an error but returns typeof 'object'
		if ( typeof context.createElement === "undefined" ) {
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
		}

		var ret = [], j;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				if ( !rhtml.test( elem ) ) {
					elem = context.createTextNode( elem );
				} else {
					// Fix "XHTML"-style tags in all browsers
					elem = elem.replace(rxhtmlTag, "<$1></$2>");

					// Trim whitespace, otherwise indexOf won't work as expected
					var tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase(),
						wrap = wrapMap[ tag ] || wrapMap._default,
						depth = wrap[0],
						div = context.createElement("div");

					// Append wrapper element to unknown element safe doc fragment
					if ( context === document ) {
						// Use the fragment we've already created for this document
						safeFragment.appendChild( div );
					} else {
						// Use a fragment created with the owner document
						createSafeFragment( context ).appendChild( div );
					}

					// Go to html and back, then peel off extra wrappers
					div.innerHTML = wrap[1] + elem + wrap[2];

					// Move to the right depth
					while ( depth-- ) {
						div = div.lastChild;
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						var hasBody = rtbody.test(elem),
							tbody = tag === "table" && !hasBody ?
								div.firstChild && div.firstChild.childNodes :

								// String was a bare <thead> or <tfoot>
								wrap[1] === "<table>" && !hasBody ?
									div.childNodes :
									[];

						for ( j = tbody.length - 1; j >= 0 ; --j ) {
							if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
								tbody[ j ].parentNode.removeChild( tbody[ j ] );
							}
						}
					}

					// IE completely kills leading whitespace when innerHTML is used
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
					}

					elem = div.childNodes;
				}
			}

			// Resets defaultChecked for any radios and checkboxes
			// about to be appended to the DOM in IE 6/7 (#8060)
			var len;
			if ( !jQuery.support.appendChecked ) {
				if ( elem[0] && typeof (len = elem.length) === "number" ) {
					for ( j = 0; j < len; j++ ) {
						findInputs( elem[j] );
					}
				} else {
					findInputs( elem );
				}
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				ret = jQuery.merge( ret, elem );
			}
		}

		if ( fragment ) {
			checkScriptType = function( elem ) {
				return !elem.type || rscriptType.test( elem.type );
			};
			for ( i = 0; ret[i]; i++ ) {
				if ( scripts && jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );

				} else {
					if ( ret[i].nodeType === 1 ) {
						var jsTags = jQuery.grep( ret[i].getElementsByTagName( "script" ), checkScriptType );

						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
					}
					fragment.appendChild( ret[i] );
				}
			}
		}

		return ret;
	},

	cleanData: function( elems ) {
		var data, id,
			cache = jQuery.cache,
			special = jQuery.event.special,
			deleteExpando = jQuery.support.deleteExpando;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
				continue;
			}

			id = elem[ jQuery.expando ];

			if ( id ) {
				data = cache[ id ];

				if ( data && data.events ) {
					for ( var type in data.events ) {
						if ( special[ type ] ) {
							jQuery.event.remove( elem, type );

						// This is a shortcut to avoid jQuery.event.remove's overhead
						} else {
							jQuery.removeEvent( elem, type, data.handle );
						}
					}

					// Null the DOM reference to avoid IE6/7/8 leak (#7054)
					if ( data.handle ) {
						data.handle.elem = null;
					}
				}

				if ( deleteExpando ) {
					delete elem[ jQuery.expando ];

				} else if ( elem.removeAttribute ) {
					elem.removeAttribute( jQuery.expando );
				}

				delete cache[ id ];
			}
		}
	}
});

function evalScript( i, elem ) {
	if ( elem.src ) {
		jQuery.ajax({
			url: elem.src,
			async: false,
			dataType: "script"
		});
	} else {
		jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "/*$0*/" ) );
	}

	if ( elem.parentNode ) {
		elem.parentNode.removeChild( elem );
	}
}




var ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	// fixed for IE9, see #8346
	rupper = /([A-Z]|^ms)/g,
	rnumpx = /^-?\d+(?:px)?$/i,
	rnum = /^-?\d/,
	rrelNum = /^([\-+])=([\-+.\de]+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssWidth = [ "Left", "Right" ],
	cssHeight = [ "Top", "Bottom" ],
	curCSS,

	getComputedStyle,
	currentStyle;

jQuery.fn.css = function( name, value ) {
	// Setting 'undefined' is a no-op
	if ( arguments.length === 2 && value === undefined ) {
		return this;
	}

	return jQuery.access( this, name, value, true, function( elem, name, value ) {
		return value !== undefined ?
			jQuery.style( elem, name, value ) :
			jQuery.css( elem, name );
	});
};

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity", "opacity" );
					return ret === "" ? "1" : ret;

				} else {
					return elem.style.opacity;
				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, origName = jQuery.camelCase( name ),
			style = elem.style, hooks = jQuery.cssHooks[ origName ];

		name = jQuery.cssProps[ origName ] || origName;

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( +( ret[1] + 1) * +ret[2] ) + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra ) {
		var ret, hooks;

		// Make sure that we're working with the right name
		name = jQuery.camelCase( name );
		hooks = jQuery.cssHooks[ name ];
		name = jQuery.cssProps[ name ] || name;

		// cssFloat needs a special treatment
		if ( name === "cssFloat" ) {
			name = "float";
		}

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {
			return ret;

		// Otherwise, if a way to get the computed value exists, use that
		} else if ( curCSS ) {
			return curCSS( elem, name );
		}
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var old = {};

		// Remember the old values, and insert the new ones
		for ( var name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	}
});

// DEPRECATED, Use jQuery.css() instead
jQuery.curCSS = jQuery.css;

jQuery.each(["height", "width"], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			var val;

			if ( computed ) {
				if ( elem.offsetWidth !== 0 ) {
					return getWH( elem, name, extra );
				} else {
					jQuery.swap( elem, cssShow, function() {
						val = getWH( elem, name, extra );
					});
				}

				return val;
			}
		},

		set: function( elem, value ) {
			if ( rnumpx.test( value ) ) {
				// ignore negative width and height values #1599
				value = parseFloat( value );

				if ( value >= 0 ) {
					return value + "px";
				}

			} else {
				return value;
			}
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( parseFloat( RegExp.$1 ) / 100 ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there there is no filter style applied in a css rule, we are done
				if ( currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery(function() {
	// This hook cannot be added until DOM ready because the support test
	// for it is not run until after DOM ready
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				var ret;
				jQuery.swap( elem, { "display": "inline-block" }, function() {
					if ( computed ) {
						ret = curCSS( elem, "margin-right", "marginRight" );
					} else {
						ret = elem.style.marginRight;
					}
				});
				return ret;
			}
		};
	}
});

if ( document.defaultView && document.defaultView.getComputedStyle ) {
	getComputedStyle = function( elem, name ) {
		var ret, defaultView, computedStyle;

		name = name.replace( rupper, "-$1" ).toLowerCase();

		if ( (defaultView = elem.ownerDocument.defaultView) &&
				(computedStyle = defaultView.getComputedStyle( elem, null )) ) {
			ret = computedStyle.getPropertyValue( name );
			if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
				ret = jQuery.style( elem, name );
			}
		}

		return ret;
	};
}

if ( document.documentElement.currentStyle ) {
	currentStyle = function( elem, name ) {
		var left, rsLeft, uncomputed,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret === null && style && (uncomputed = style[ name ]) ) {
			ret = uncomputed;
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		if ( !rnumpx.test( ret ) && rnum.test( ret ) ) {

			// Remember the original values
			left = style.left;
			rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				elem.runtimeStyle.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ( ret || 0 );
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

curCSS = getComputedStyle || currentStyle;

function getWH( elem, name, extra ) {

	// Start with offset property
	var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		which = name === "width" ? cssWidth : cssHeight,
		i = 0,
		len = which.length;

	if ( val > 0 ) {
		if ( extra !== "border" ) {
			for ( ; i < len; i++ ) {
				if ( !extra ) {
					val -= parseFloat( jQuery.css( elem, "padding" + which[ i ] ) ) || 0;
				}
				if ( extra === "margin" ) {
					val += parseFloat( jQuery.css( elem, extra + which[ i ] ) ) || 0;
				} else {
					val -= parseFloat( jQuery.css( elem, "border" + which[ i ] + "Width" ) ) || 0;
				}
			}
		}

		return val + "px";
	}

	// Fall back to computed then uncomputed css if necessary
	val = curCSS( elem, name, name );
	if ( val < 0 || val == null ) {
		val = elem.style[ name ] || 0;
	}
	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Add padding, border, margin
	if ( extra ) {
		for ( ; i < len; i++ ) {
			val += parseFloat( jQuery.css( elem, "padding" + which[ i ] ) ) || 0;
			if ( extra !== "padding" ) {
				val += parseFloat( jQuery.css( elem, "border" + which[ i ] + "Width" ) ) || 0;
			}
			if ( extra === "margin" ) {
				val += parseFloat( jQuery.css( elem, extra + which[ i ] ) ) || 0;
			}
		}
	}

	return val + "px";
}

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		var width = elem.offsetWidth,
			height = elem.offsetHeight;

		return ( width === 0 && height === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rhash = /#.*$/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rquery = /\?/,
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rselectTextarea = /^(?:select|textarea)/i,
	rspacesAjax = /\s+/,
	rts = /([?&])_=[^&]*/,
	rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Document location
	ajaxLocation,

	// Document location segments
	ajaxLocParts,

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = ["*/"] + ["*"];

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		if ( jQuery.isFunction( func ) ) {
			var dataTypes = dataTypeExpression.toLowerCase().split( rspacesAjax ),
				i = 0,
				length = dataTypes.length,
				dataType,
				list,
				placeBefore;

			// For each dataType in the dataTypeExpression
			for ( ; i < length; i++ ) {
				dataType = dataTypes[ i ];
				// We control if we're asked to add before
				// any existing element
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				// then we add to the structure accordingly
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
		dataType /* internal */, inspected /* internal */ ) {

	dataType = dataType || options.dataTypes[ 0 ];
	inspected = inspected || {};

	inspected[ dataType ] = true;

	var list = structure[ dataType ],
		i = 0,
		length = list ? list.length : 0,
		executeOnly = ( structure === prefilters ),
		selection;

	for ( ; i < length && ( executeOnly || !selection ); i++ ) {
		selection = list[ i ]( options, originalOptions, jqXHR );
		// If we got redirected to another dataType
		// we try there if executing only and not done already
		if ( typeof selection === "string" ) {
			if ( !executeOnly || inspected[ selection ] ) {
				selection = undefined;
			} else {
				options.dataTypes.unshift( selection );
				selection = inspectPrefiltersOrTransports(
						structure, options, originalOptions, jqXHR, selection, inspected );
			}
		}
	}
	// If we're only executing or nothing was selected
	// we try the catchall dataType if not done already
	if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
		selection = inspectPrefiltersOrTransports(
				structure, options, originalOptions, jqXHR, "*", inspected );
	}
	// unnecessary when only executing (prefilters)
	// but it'll be ignored by the caller in that case
	return selection;
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};
	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}
}

jQuery.fn.extend({
	load: function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );

		// Don't do a request if no elements are being requested
		} else if ( !this.length ) {
			return this;
		}

		var off = url.indexOf( " " );
		if ( off >= 0 ) {
			var selector = url.slice( off, url.length );
			url = url.slice( 0, off );
		}

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params ) {
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = undefined;

			// Otherwise, build a param string
			} else if ( typeof params === "object" ) {
				params = jQuery.param( params, jQuery.ajaxSettings.traditional );
				type = "POST";
			}
		}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			// Complete callback (responseText is used internally)
			complete: function( jqXHR, status, responseText ) {
				// Store the response as specified by the jqXHR object
				responseText = jqXHR.responseText;
				// If successful, inject the HTML into all the matched elements
				if ( jqXHR.isResolved() ) {
					// #4825: Get the actual response in case
					// a dataFilter is present in ajaxSettings
					jqXHR.done(function( r ) {
						responseText = r;
					});
					// See if a selector was specified
					self.html( selector ?
						// Create a dummy div to hold the results
						jQuery("<div>")
							// inject the contents of the document in, removing the scripts
							// to avoid any 'Permission Denied' errors in IE
							.append(responseText.replace(rscript, ""))

							// Locate the specified elements
							.find(selector) :

						// If not, just inject the full result
						responseText );
				}

				if ( callback ) {
					self.each( callback, [ responseText, status, jqXHR ] );
				}
			}
		});

		return this;
	},

	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},

	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val, i ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
	jQuery.fn[ o ] = function( f ){
		return this.on( o, f );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
});

jQuery.extend({

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		if ( settings ) {
			// Building a settings object
			ajaxExtend( target, jQuery.ajaxSettings );
		} else {
			// Extending ajaxSettings
			settings = target;
			target = jQuery.ajaxSettings;
		}
		ajaxExtend( target, settings );
		return target;
	},

	ajaxSettings: {
		url: ajaxLocation,
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		traditional: false,
		headers: {},
		*/

		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain",
			json: "application/json, text/javascript",
			"*": allTypes
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// List of data converters
		// 1) key format is "source_type destination_type" (a single space in-between)
		// 2) the catchall symbol "*" can be used for source_type
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			context: true,
			url: true
		}
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events
			// It's the callbackContext if one was provided in the options
			// and if it's a DOM node or a jQuery collection
			globalEventContext = callbackContext !== s &&
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
						jQuery( callbackContext ) : jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// ifModified key
			ifModifiedKey,
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// Response headers
			responseHeadersString,
			responseHeaders,
			// transport
			transport,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// The jqXHR state
			state = 0,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Fake xhr
			jqXHR = {

				readyState: 0,

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( !state ) {
						var lname = name.toLowerCase();
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match === undefined ? null : match;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					statusText = statusText || "abort";
					if ( transport ) {
						transport.abort( statusText );
					}
					done( 0, statusText );
					return this;
				}
			};

		// Callback for when everything is done
		// It is defined here because jslint complains if it is declared
		// at the end of the function (which would be more logical and readable)
		function done( status, nativeStatusText, responses, headers ) {

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			var isSuccess,
				success,
				error,
				statusText = nativeStatusText,
				response = responses ? ajaxHandleResponses( s, jqXHR, responses ) : undefined,
				lastModified,
				etag;

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {

					if ( ( lastModified = jqXHR.getResponseHeader( "Last-Modified" ) ) ) {
						jQuery.lastModified[ ifModifiedKey ] = lastModified;
					}
					if ( ( etag = jqXHR.getResponseHeader( "Etag" ) ) ) {
						jQuery.etag[ ifModifiedKey ] = etag;
					}
				}

				// If not modified
				if ( status === 304 ) {

					statusText = "notmodified";
					isSuccess = true;

				// If we have data
				} else {

					try {
						success = ajaxConvert( s, response );
						statusText = "success";
						isSuccess = true;
					} catch(e) {
						// We have a parsererror
						statusText = "parsererror";
						error = e;
					}
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = "" + ( nativeStatusText || statusText );

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
						[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		// Attach deferreds
		deferred.promise( jqXHR );
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;
		jqXHR.complete = completeDeferred.add;

		// Status-dependent callbacks
		jqXHR.statusCode = function( map ) {
			if ( map ) {
				var tmp;
				if ( state < 2 ) {
					for ( tmp in map ) {
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
					}
				} else {
					tmp = map[ jqXHR.status ];
					jqXHR.then( tmp, tmp );
				}
			}
			return this;
		};

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// We also use the url parameter if available
		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( rspacesAjax );

		// Determine if a cross-domain request is in order
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefiler, stop there
		if ( state === 2 ) {
			return false;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Get ifModifiedKey before adding the anti-cache parameter
			ifModifiedKey = s.url;

			// Add anti-cache in url if needed
			if ( s.cache === false ) {

				var ts = jQuery.now(),
					// try replacing _= if it is there
					ret = s.url.replace( rts, "$1_=" + ts );

				// if nothing was replaced, add timestamp to the end
				s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			ifModifiedKey = ifModifiedKey || s.url;
			if ( jQuery.lastModified[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
			}
			if ( jQuery.etag[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
			}
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already
				jqXHR.abort();
				return false;

		}

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout( function(){
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch (e) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		return jqXHR;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a, traditional ) {
		var s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : value;
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( var prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	}
});

function buildParams( prefix, obj, traditional, add ) {
	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// If array item is non-scalar (array or object), encode its
				// numeric index to resolve deserialization ambiguity issues.
				// Note that rack (as of 1.0.0) can't currently deserialize
				// nested arrays properly, and attempting to do so may cause
				// a server error. Possible fixes are to modify rack's
				// deserialization algorithm or to provide an option or flag
				// to force array serialization to be shallow.
				buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && obj != null && typeof obj === "object" ) {
		// Serialize object item.
		for ( var name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// This is still on the jQuery object... for now
// Want to move this to jQuery.ajax some day
jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields,
		ct,
		type,
		finalDataType,
		firstDataType;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	var dataTypes = s.dataTypes,
		converters = {},
		i,
		key,
		length = dataTypes.length,
		tmp,
		// Current and previous dataTypes
		current = dataTypes[ 0 ],
		prev,
		// Conversion expression
		conversion,
		// Conversion function
		conv,
		// Conversion functions (transitive conversion)
		conv1,
		conv2;

	// For each dataType in the chain
	for ( i = 1; i < length; i++ ) {

		// Create converters map
		// with lowercased keys
		if ( i === 1 ) {
			for ( key in s.converters ) {
				if ( typeof key === "string" ) {
					converters[ key.toLowerCase() ] = s.converters[ key ];
				}
			}
		}

		// Get the dataTypes
		prev = current;
		current = dataTypes[ i ];

		// If current is auto dataType, update it to prev
		if ( current === "*" ) {
			current = prev;
		// If no auto and dataTypes are actually different
		} else if ( prev !== "*" && prev !== current ) {

			// Get the converter
			conversion = prev + " " + current;
			conv = converters[ conversion ] || converters[ "* " + current ];

			// If there is no direct converter, search transitively
			if ( !conv ) {
				conv2 = undefined;
				for ( conv1 in converters ) {
					tmp = conv1.split( " " );
					if ( tmp[ 0 ] === prev || tmp[ 0 ] === "*" ) {
						conv2 = converters[ tmp[1] + " " + current ];
						if ( conv2 ) {
							conv1 = converters[ conv1 ];
							if ( conv1 === true ) {
								conv = conv2;
							} else if ( conv2 === true ) {
								conv = conv1;
							}
							break;
						}
					}
				}
			}
			// If we found no converter, dispatch an error
			if ( !( conv || conv2 ) ) {
				jQuery.error( "No conversion from " + conversion.replace(" "," to ") );
			}
			// If found converter is not an equivalence
			if ( conv !== true ) {
				// Convert with 1 or 2 converters accordingly
				response = conv ? conv( response ) : conv2( conv1(response) );
			}
		}
	}
	return response;
}




var jsc = jQuery.now(),
	jsre = /(\=)\?(&|$)|\?\?/i;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		return jQuery.expando + "_" + ( jsc++ );
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var inspectData = s.contentType === "application/x-www-form-urlencoded" &&
		( typeof s.data === "string" );

	if ( s.dataTypes[ 0 ] === "jsonp" ||
		s.jsonp !== false && ( jsre.test( s.url ) ||
				inspectData && jsre.test( s.data ) ) ) {

		var responseContainer,
			jsonpCallback = s.jsonpCallback =
				jQuery.isFunction( s.jsonpCallback ) ? s.jsonpCallback() : s.jsonpCallback,
			previous = window[ jsonpCallback ],
			url = s.url,
			data = s.data,
			replace = "$1" + jsonpCallback + "$2";

		if ( s.jsonp !== false ) {
			url = url.replace( jsre, replace );
			if ( s.url === url ) {
				if ( inspectData ) {
					data = data.replace( jsre, replace );
				}
				if ( s.data === data ) {
					// Add callback manually
					url += (/\?/.test( url ) ? "&" : "?") + s.jsonp + "=" + jsonpCallback;
				}
			}
		}

		s.url = url;
		s.data = data;

		// Install callback
		window[ jsonpCallback ] = function( response ) {
			responseContainer = [ response ];
		};

		// Clean-up function
		jqXHR.always(function() {
			// Set callback back to previous value
			window[ jsonpCallback ] = previous;
			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( previous ) ) {
				window[ jsonpCallback ]( responseContainer[ 0 ] );
			}
		});

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( jsonpCallback + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Delegate to script
		return "script";
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /javascript|ecmascript/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = "async";

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}

						// Dereference the script
						script = undefined;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};
				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
				// This arises when a base node is used (#2709 and #4378).
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( 0, 1 );
				}
			}
		};
	}
});




var // #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject ? function() {
		// Abort all pending requests
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( 0, 1 );
		}
	} : false,
	xhrId = 0,
	xhrCallbacks;

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
(function( xhr ) {
	jQuery.extend( jQuery.support, {
		ajax: !!xhr,
		cors: !!xhr && ( "withCredentials" in xhr )
	});
})( jQuery.ajaxSettings.xhr() );

// Create transport if the browser can provide an xhr
if ( jQuery.support.ajax ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var xhr = s.xhr(),
						handle,
						i;

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( _ ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occured
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();
									responses = {};
									xml = xhr.responseXML;

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}
									responses.text = xhr.responseText;

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					// if we're in sync mode or it's in cache
					// and has been retrieved directly (IE6 & IE7)
					// we need to manually fire the callback
					if ( !s.async || xhr.readyState === 4 ) {
						callback();
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback(0,1);
					}
				}
			};
		}
	});
}




var elemdisplay = {},
	iframe, iframeDoc,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
	timerId,
	fxAttrs = [
		// height animations
		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
		// width animations
		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
		// opacity animations
		[ "opacity" ]
	],
	fxNow;

jQuery.fn.extend({
	show: function( speed, easing, callback ) {
		var elem, display;

		if ( speed || speed === 0 ) {
			return this.animate( genFx("show", 3), speed, easing, callback );

		} else {
			for ( var i = 0, j = this.length; i < j; i++ ) {
				elem = this[ i ];

				if ( elem.style ) {
					display = elem.style.display;

					// Reset the inline display of this element to learn if it is
					// being hidden by cascaded rules or not
					if ( !jQuery._data(elem, "olddisplay") && display === "none" ) {
						display = elem.style.display = "";
					}

					// Set elements which have been overridden with display: none
					// in a stylesheet to whatever the default browser style is
					// for such an element
					if ( display === "" && jQuery.css(elem, "display") === "none" ) {
						jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
					}
				}
			}

			// Set the display of most of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				elem = this[ i ];

				if ( elem.style ) {
					display = elem.style.display;

					if ( display === "" || display === "none" ) {
						elem.style.display = jQuery._data( elem, "olddisplay" ) || "";
					}
				}
			}

			return this;
		}
	},

	hide: function( speed, easing, callback ) {
		if ( speed || speed === 0 ) {
			return this.animate( genFx("hide", 3), speed, easing, callback);

		} else {
			var elem, display,
				i = 0,
				j = this.length;

			for ( ; i < j; i++ ) {
				elem = this[i];
				if ( elem.style ) {
					display = jQuery.css( elem, "display" );

					if ( display !== "none" && !jQuery._data( elem, "olddisplay" ) ) {
						jQuery._data( elem, "olddisplay", display );
					}
				}
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				if ( this[i].style ) {
					this[i].style.display = "none";
				}
			}

			return this;
		}
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2, callback ) {
		var bool = typeof fn === "boolean";

		if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {
			this._toggle.apply( this, arguments );

		} else if ( fn == null || bool ) {
			this.each(function() {
				var state = bool ? fn : jQuery(this).is(":hidden");
				jQuery(this)[ state ? "show" : "hide" ]();
			});

		} else {
			this.animate(genFx("toggle", 3), fn, fn2, callback);
		}

		return this;
	},

	fadeTo: function( speed, to, easing, callback ) {
		return this.filter(":hidden").css("opacity", 0).show().end()
					.animate({opacity: to}, speed, easing, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed( speed, easing, callback );

		if ( jQuery.isEmptyObject( prop ) ) {
			return this.each( optall.complete, [ false ] );
		}

		// Do not change referenced properties as per-property easing will be lost
		prop = jQuery.extend( {}, prop );

		function doAnimation() {
			// XXX 'this' does not always have a nodeName when running the
			// test suite

			if ( optall.queue === false ) {
				jQuery._mark( this );
			}

			var opt = jQuery.extend( {}, optall ),
				isElement = this.nodeType === 1,
				hidden = isElement && jQuery(this).is(":hidden"),
				name, val, p, e,
				parts, start, end, unit,
				method;

			// will store per property easing and be used to determine when an animation is complete
			opt.animatedProperties = {};

			for ( p in prop ) {

				// property name normalization
				name = jQuery.camelCase( p );
				if ( p !== name ) {
					prop[ name ] = prop[ p ];
					delete prop[ p ];
				}

				val = prop[ name ];

				// easing resolution: per property > opt.specialEasing > opt.easing > 'swing' (default)
				if ( jQuery.isArray( val ) ) {
					opt.animatedProperties[ name ] = val[ 1 ];
					val = prop[ name ] = val[ 0 ];
				} else {
					opt.animatedProperties[ name ] = opt.specialEasing && opt.specialEasing[ name ] || opt.easing || 'swing';
				}

				if ( val === "hide" && hidden || val === "show" && !hidden ) {
					return opt.complete.call( this );
				}

				if ( isElement && ( name === "height" || name === "width" ) ) {
					// Make sure that nothing sneaks out
					// Record all 3 overflow attributes because IE does not
					// change the overflow attribute when overflowX and
					// overflowY are set to the same value
					opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];

					// Set display property to inline-block for height/width
					// animations on inline elements that are having width/height animated
					if ( jQuery.css( this, "display" ) === "inline" &&
							jQuery.css( this, "float" ) === "none" ) {

						// inline-level elements accept inline-block;
						// block-level elements need to be inline with layout
						if ( !jQuery.support.inlineBlockNeedsLayout || defaultDisplay( this.nodeName ) === "inline" ) {
							this.style.display = "inline-block";

						} else {
							this.style.zoom = 1;
						}
					}
				}
			}

			if ( opt.overflow != null ) {
				this.style.overflow = "hidden";
			}

			for ( p in prop ) {
				e = new jQuery.fx( this, opt, p );
				val = prop[ p ];

				if ( rfxtypes.test( val ) ) {

					// Tracks whether to show or hide based on private
					// data attached to the element
					method = jQuery._data( this, "toggle" + p ) || ( val === "toggle" ? hidden ? "show" : "hide" : 0 );
					if ( method ) {
						jQuery._data( this, "toggle" + p, method === "show" ? "hide" : "show" );
						e[ method ]();
					} else {
						e[ val ]();
					}

				} else {
					parts = rfxnum.exec( val );
					start = e.cur();

					if ( parts ) {
						end = parseFloat( parts[2] );
						unit = parts[3] || ( jQuery.cssNumber[ p ] ? "" : "px" );

						// We need to compute starting value
						if ( unit !== "px" ) {
							jQuery.style( this, p, (end || 1) + unit);
							start = ( (end || 1) / e.cur() ) * start;
							jQuery.style( this, p, start + unit);
						}

						// If a +=/-= token was provided, we're doing a relative animation
						if ( parts[1] ) {
							end = ( (parts[ 1 ] === "-=" ? -1 : 1) * end ) + start;
						}

						e.custom( start, end, unit );

					} else {
						e.custom( start, val, "" );
					}
				}
			}

			// For JS strict compliance
			return true;
		}

		return optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},

	stop: function( type, clearQueue, gotoEnd ) {
		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var index,
				hadTimers = false,
				timers = jQuery.timers,
				data = jQuery._data( this );

			// clear marker counters if we know they won't be
			if ( !gotoEnd ) {
				jQuery._unmark( true, this );
			}

			function stopQueue( elem, data, index ) {
				var hooks = data[ index ];
				jQuery.removeData( elem, index, true );
				hooks.stop( gotoEnd );
			}

			if ( type == null ) {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && index.indexOf(".run") === index.length - 4 ) {
						stopQueue( this, data, index );
					}
				}
			} else if ( data[ index = type + ".run" ] && data[ index ].stop ){
				stopQueue( this, data, index );
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					if ( gotoEnd ) {

						// force the next step to be the last
						timers[ index ]( true );
					} else {
						timers[ index ].saveState();
					}
					hadTimers = true;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( !( gotoEnd && hadTimers ) ) {
				jQuery.dequeue( this, type );
			}
		});
	}

});

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout( clearFxNow, 0 );
	return ( fxNow = jQuery.now() );
}

function clearFxNow() {
	fxNow = undefined;
}

// Generate parameters to create a standard animation
function genFx( type, num ) {
	var obj = {};

	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice( 0, num )), function() {
		obj[ this ] = type;
	});

	return obj;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx( "show", 1 ),
	slideUp: genFx( "hide", 1 ),
	slideToggle: genFx( "toggle", 1 ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.extend({
	speed: function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function( noUnmark ) {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			} else if ( noUnmark !== false ) {
				jQuery._unmark( this );
			}
		};

		return opt;
	},

	easing: {
		linear: function( p, n, firstNum, diff ) {
			return firstNum + diff * p;
		},
		swing: function( p, n, firstNum, diff ) {
			return ( ( -Math.cos( p*Math.PI ) / 2 ) + 0.5 ) * diff + firstNum;
		}
	},

	timers: [],

	fx: function( elem, options, prop ) {
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		options.orig = options.orig || {};
	}

});

jQuery.fx.prototype = {
	// Simple function for setting a style value
	update: function() {
		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		( jQuery.fx.step[ this.prop ] || jQuery.fx.step._default )( this );
	},

	// Get the current size
	cur: function() {
		if ( this.elem[ this.prop ] != null && (!this.elem.style || this.elem.style[ this.prop ] == null) ) {
			return this.elem[ this.prop ];
		}

		var parsed,
			r = jQuery.css( this.elem, this.prop );
		// Empty strings, null, undefined and "auto" are converted to 0,
		// complex values such as "rotate(1rad)" are returned as is,
		// simple values such as "10px" are parsed to Float.
		return isNaN( parsed = parseFloat( r ) ) ? !r || r === "auto" ? 0 : r : parsed;
	},

	// Start an animation from one number to another
	custom: function( from, to, unit ) {
		var self = this,
			fx = jQuery.fx;

		this.startTime = fxNow || createFxNow();
		this.end = to;
		this.now = this.start = from;
		this.pos = this.state = 0;
		this.unit = unit || this.unit || ( jQuery.cssNumber[ this.prop ] ? "" : "px" );

		function t( gotoEnd ) {
			return self.step( gotoEnd );
		}

		t.queue = this.options.queue;
		t.elem = this.elem;
		t.saveState = function() {
			if ( self.options.hide && jQuery._data( self.elem, "fxshow" + self.prop ) === undefined ) {
				jQuery._data( self.elem, "fxshow" + self.prop, self.start );
			}
		};

		if ( t() && jQuery.timers.push(t) && !timerId ) {
			timerId = setInterval( fx.tick, fx.interval );
		}
	},

	// Simple 'show' function
	show: function() {
		var dataShow = jQuery._data( this.elem, "fxshow" + this.prop );

		// Remember where we started, so that we can go back to it later
		this.options.orig[ this.prop ] = dataShow || jQuery.style( this.elem, this.prop );
		this.options.show = true;

		// Begin the animation
		// Make sure that we start at a small width/height to avoid any flash of content
		if ( dataShow !== undefined ) {
			// This show is picking up where a previous hide or show left off
			this.custom( this.cur(), dataShow );
		} else {
			this.custom( this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur() );
		}

		// Start by showing the element
		jQuery( this.elem ).show();
	},

	// Simple 'hide' function
	hide: function() {
		// Remember where we started, so that we can go back to it later
		this.options.orig[ this.prop ] = jQuery._data( this.elem, "fxshow" + this.prop ) || jQuery.style( this.elem, this.prop );
		this.options.hide = true;

		// Begin the animation
		this.custom( this.cur(), 0 );
	},

	// Each step of an animation
	step: function( gotoEnd ) {
		var p, n, complete,
			t = fxNow || createFxNow(),
			done = true,
			elem = this.elem,
			options = this.options;

		if ( gotoEnd || t >= options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			options.animatedProperties[ this.prop ] = true;

			for ( p in options.animatedProperties ) {
				if ( options.animatedProperties[ p ] !== true ) {
					done = false;
				}
			}

			if ( done ) {
				// Reset the overflow
				if ( options.overflow != null && !jQuery.support.shrinkWrapBlocks ) {

					jQuery.each( [ "", "X", "Y" ], function( index, value ) {
						elem.style[ "overflow" + value ] = options.overflow[ index ];
					});
				}

				// Hide the element if the "hide" operation was done
				if ( options.hide ) {
					jQuery( elem ).hide();
				}

				// Reset the properties, if the item has been hidden or shown
				if ( options.hide || options.show ) {
					for ( p in options.animatedProperties ) {
						jQuery.style( elem, p, options.orig[ p ] );
						jQuery.removeData( elem, "fxshow" + p, true );
						// Toggle data is no longer needed
						jQuery.removeData( elem, "toggle" + p, true );
					}
				}

				// Execute the complete function
				// in the event that the complete function throws an exception
				// we must ensure it won't be called twice. #5684

				complete = options.complete;
				if ( complete ) {

					options.complete = false;
					complete.call( elem );
				}
			}

			return false;

		} else {
			// classical easing cannot be used with an Infinity duration
			if ( options.duration == Infinity ) {
				this.now = t;
			} else {
				n = t - this.startTime;
				this.state = n / options.duration;

				// Perform the easing function, defaults to swing
				this.pos = jQuery.easing[ options.animatedProperties[this.prop] ]( this.state, n, 0, 1, options.duration );
				this.now = this.start + ( (this.end - this.start) * this.pos );
			}
			// Perform the next step of the animation
			this.update();
		}

		return true;
	}
};

jQuery.extend( jQuery.fx, {
	tick: function() {
		var timer,
			timers = jQuery.timers,
			i = 0;

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
	},

	interval: 13,

	stop: function() {
		clearInterval( timerId );
		timerId = null;
	},

	speeds: {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	},

	step: {
		opacity: function( fx ) {
			jQuery.style( fx.elem, "opacity", fx.now );
		},

		_default: function( fx ) {
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {
				fx.elem.style[ fx.prop ] = fx.now + fx.unit;
			} else {
				fx.elem[ fx.prop ] = fx.now;
			}
		}
	}
});

// Adds width/height step functions
// Do not set anything below 0
jQuery.each([ "width", "height" ], function( i, prop ) {
	jQuery.fx.step[ prop ] = function( fx ) {
		jQuery.style( fx.elem, prop, Math.max(0, fx.now) + fx.unit );
	};
});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}

// Try to restore the default display value of an element
function defaultDisplay( nodeName ) {

	if ( !elemdisplay[ nodeName ] ) {

		var body = document.body,
			elem = jQuery( "<" + nodeName + ">" ).appendTo( body ),
			display = elem.css( "display" );
		elem.remove();

		// If the simple way fails,
		// get element's real default display by attaching it to a temp iframe
		if ( display === "none" || display === "" ) {
			// No iframe to use yet, so create it
			if ( !iframe ) {
				iframe = document.createElement( "iframe" );
				iframe.frameBorder = iframe.width = iframe.height = 0;
			}

			body.appendChild( iframe );

			// Create a cacheable copy of the iframe document on first call.
			// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
			// document to it; WebKit & Firefox won't allow reusing the iframe document.
			if ( !iframeDoc || !iframe.createElement ) {
				iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
				iframeDoc.write( ( document.compatMode === "CSS1Compat" ? "<!doctype html>" : "" ) + "<html><body>" );
				iframeDoc.close();
			}

			elem = iframeDoc.createElement( nodeName );

			iframeDoc.body.appendChild( elem );

			display = jQuery.css( elem, "display" );
			body.removeChild( iframe );
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return elemdisplay[ nodeName ];
}




var rtable = /^t(?:able|d|h)$/i,
	rroot = /^(?:body|html)$/i;

if ( "getBoundingClientRect" in document.documentElement ) {
	jQuery.fn.offset = function( options ) {
		var elem = this[0], box;

		if ( options ) {
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		try {
			box = elem.getBoundingClientRect();
		} catch(e) {}

		var doc = elem.ownerDocument,
			docElem = doc.documentElement;

		// Make sure we're not dealing with a disconnected DOM node
		if ( !box || !jQuery.contains( docElem, elem ) ) {
			return box ? { top: box.top, left: box.left } : { top: 0, left: 0 };
		}

		var body = doc.body,
			win = getWindow(doc),
			clientTop  = docElem.clientTop  || body.clientTop  || 0,
			clientLeft = docElem.clientLeft || body.clientLeft || 0,
			scrollTop  = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop,
			scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
			top  = box.top  + scrollTop  - clientTop,
			left = box.left + scrollLeft - clientLeft;

		return { top: top, left: left };
	};

} else {
	jQuery.fn.offset = function( options ) {
		var elem = this[0];

		if ( options ) {
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		var computedStyle,
			offsetParent = elem.offsetParent,
			prevOffsetParent = elem,
			doc = elem.ownerDocument,
			docElem = doc.documentElement,
			body = doc.body,
			defaultView = doc.defaultView,
			prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,
			top = elem.offsetTop,
			left = elem.offsetLeft;

		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
			if ( jQuery.support.fixedPosition && prevComputedStyle.position === "fixed" ) {
				break;
			}

			computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
			top  -= elem.scrollTop;
			left -= elem.scrollLeft;

			if ( elem === offsetParent ) {
				top  += elem.offsetTop;
				left += elem.offsetLeft;

				if ( jQuery.support.doesNotAddBorder && !(jQuery.support.doesAddBorderForTableAndCells && rtable.test(elem.nodeName)) ) {
					top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
					left += parseFloat( computedStyle.borderLeftWidth ) || 0;
				}

				prevOffsetParent = offsetParent;
				offsetParent = elem.offsetParent;
			}

			if ( jQuery.support.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
				top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
				left += parseFloat( computedStyle.borderLeftWidth ) || 0;
			}

			prevComputedStyle = computedStyle;
		}

		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
			top  += body.offsetTop;
			left += body.offsetLeft;
		}

		if ( jQuery.support.fixedPosition && prevComputedStyle.position === "fixed" ) {
			top  += Math.max( docElem.scrollTop, body.scrollTop );
			left += Math.max( docElem.scrollLeft, body.scrollLeft );
		}

		return { top: top, left: left };
	};
}

jQuery.offset = {

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[0] ) {
			return null;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( ["Left", "Top"], function( i, name ) {
	var method = "scroll" + name;

	jQuery.fn[ method ] = function( val ) {
		var elem, win;

		if ( val === undefined ) {
			elem = this[ 0 ];

			if ( !elem ) {
				return null;
			}

			win = getWindow( elem );

			// Return the scroll offset
			return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset" ] :
				jQuery.support.boxModel && win.document.documentElement[ method ] ||
					win.document.body[ method ] :
				elem[ method ];
		}

		// Set the scroll offset
		return this.each(function() {
			win = getWindow( this );

			if ( win ) {
				win.scrollTo(
					!i ? val : jQuery( win ).scrollLeft(),
					 i ? val : jQuery( win ).scrollTop()
				);

			} else {
				this[ method ] = val;
			}
		});
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}




// Create width, height, innerHeight, innerWidth, outerHeight and outerWidth methods
jQuery.each([ "Height", "Width" ], function( i, name ) {

	var type = name.toLowerCase();

	// innerHeight and innerWidth
	jQuery.fn[ "inner" + name ] = function() {
		var elem = this[0];
		return elem ?
			elem.style ?
			parseFloat( jQuery.css( elem, type, "padding" ) ) :
			this[ type ]() :
			null;
	};

	// outerHeight and outerWidth
	jQuery.fn[ "outer" + name ] = function( margin ) {
		var elem = this[0];
		return elem ?
			elem.style ?
			parseFloat( jQuery.css( elem, type, margin ? "margin" : "border" ) ) :
			this[ type ]() :
			null;
	};

	jQuery.fn[ type ] = function( size ) {
		// Get window width or height
		var elem = this[0];
		if ( !elem ) {
			return size == null ? null : this;
		}

		if ( jQuery.isFunction( size ) ) {
			return this.each(function( i ) {
				var self = jQuery( this );
				self[ type ]( size.call( this, i, self[ type ]() ) );
			});
		}

		if ( jQuery.isWindow( elem ) ) {
			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
			// 3rd condition allows Nokia support, as it supports the docElem prop but not CSS1Compat
			var docElemProp = elem.document.documentElement[ "client" + name ],
				body = elem.document.body;
			return elem.document.compatMode === "CSS1Compat" && docElemProp ||
				body && body[ "client" + name ] || docElemProp;

		// Get document width or height
		} else if ( elem.nodeType === 9 ) {
			// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
			return Math.max(
				elem.documentElement["client" + name],
				elem.body["scroll" + name], elem.documentElement["scroll" + name],
				elem.body["offset" + name], elem.documentElement["offset" + name]
			);

		// Get or set width or height on the element
		} else if ( size === undefined ) {
			var orig = jQuery.css( elem, type ),
				ret = parseFloat( orig );

			return jQuery.isNumeric( ret ) ? ret : orig;

		// Set the width or height on the element (default to pixels if value is unitless)
		} else {
			return this.css( type, typeof size === "string" ? size : size + "px" );
		}
	};

});




// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}



})( window );

; browserify_shim__define__module__export__(typeof $ != "undefined" ? $ : window.$);

}).call(global, undefined, undefined, function defineExport(ex) { module.exports = ex; });

})(window)
},{}],"knockback":[function(require,module,exports){
module.exports=require('XGgBAH');
},{}],"XGgBAH":[function(require,module,exports){
(function(global){(function browserifyShim(module, define) {

; global.ko = require("knockout");
// Generated by CoffeeScript 1.3.3

/*
  knockback.js 0.16.1
  (c) 2011, 2012 Kevin Malakoff.
  Knockback.js is freely distributable under the MIT license.
  See the following for full license details:
    https://github.com/kmalakoff/knockback/blob/master/LICENSE
  Dependencies: Knockout.js, Backbone.js, and Underscore.js.
*/


(function() {
  var Backbone, KB_TYPE_ARRAY, KB_TYPE_COLLECTION, KB_TYPE_MODEL, KB_TYPE_SIMPLE, KB_TYPE_UNKNOWN, Knockback, addStatisticsEvent, arraySlice, arraySplice, collapseOptions, kb, ko, legacyWarning, throwMissing, throwUnexpected, _, _argumentsAddKey, _unwrapModels, _wrappedKey,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  kb = (function() {

    function kb() {}

    kb.VERSION = '0.16.1';

    kb.release = function(obj, pre_release_fn) {
      var array, item, view_model, view_models, _i, _j, _len, _len1;
      if ((!obj || (obj !== Object(obj))) || ((typeof obj === 'function') && !ko.isObservable(obj)) || obj.__kb_destroyed || ((obj instanceof Backbone.Model) || (obj instanceof Backbone.Collection))) {
        return this;
      }
      if (_.isArray(obj)) {
        array = obj.splice(0, obj.length);
        for (_i = 0, _len = array.length; _i < _len; _i++) {
          item = array[_i];
          kb.release(item);
        }
        return this;
      }
      obj.__kb_destroyed = true;
      !pre_release_fn || pre_release_fn();
      if (ko.isObservable(obj) || (typeof obj.dispose === 'function') || (typeof obj.destroy === 'function') || (typeof obj.release === 'function')) {
        if (ko.isObservable(obj) && _.isArray(array = obj())) {
          if (obj.__kb_is_co || (obj.__kb_is_o && (obj.valueType() === KB_TYPE_COLLECTION))) {
            if (obj.destroy) {
              obj.destroy();
            } else if (obj.dispose) {
              obj.dispose();
            }
          } else if (array.length) {
            view_models = array.slice(0);
            array.splice(0, array.length);
            for (_j = 0, _len1 = view_models.length; _j < _len1; _j++) {
              view_model = view_models[_j];
              kb.release(view_model);
            }
          }
        } else if (obj.release) {
          obj.release();
        } else if (obj.destroy) {
          obj.destroy();
        } else if (obj.dispose) {
          obj.dispose();
        }
      } else {
        this.releaseKeys(obj);
      }
      return this;
    };

    kb.releaseKeys = function(obj) {
      var key, value;
      for (key in obj) {
        value = obj[key];
        (key === '__kb') || kb.release(value, (function() {
          return obj[key] = null;
        }));
      }
      return this;
    };

    kb.releaseOnNodeRemove = function(view_model, node) {
      view_model || throwUnexpected(this, 'missing view model');
      node || throwUnexpected(this, 'missing node');
      return ko.utils.domNodeDisposal.addDisposeCallback(node, function() {
        return kb.release(view_model);
      });
    };

    kb.renderAutoReleasedTemplate = function(template, view_model, options) {
      var el, observable;
      if (options == null) {
        options = {};
      }
      el = document.createElement('div');
      observable = ko.renderTemplate(template, view_model, options, el, 'replaceChildren');
      if (el.children.length === 1) {
        el = el.children[0];
      }
      kb.releaseOnNodeRemove(view_model, el);
      observable.dispose();
      return el;
    };

    kb.applyBindings = function(view_model, node) {
      ko.applyBindings(view_model, node);
      return kb.releaseOnNodeRemove(view_model, node);
    };

    return kb;

  })();

  this.Knockback = Knockback = this.kb = kb;

  if (typeof exports !== 'undefined') {
    module.exports = kb;
  }

  if (!this._ && (typeof require !== 'undefined')) {
    try {
      _ = require('underscore');
    } catch (e) {
        // ...
    }
  } else {
    _ = this._;
  }

  kb._ = _ = _.hasOwnProperty('_') ? _._ : _;

  kb.Backbone = Backbone = !this.Backbone && (typeof require !== 'undefined') ? require('backbone') : this.Backbone;

  kb.ko = ko = !this.ko && (typeof require !== 'undefined') ? require('knockout') : this.ko;

  throwMissing = function(instance, message) {
    throw "" + instance.constructor.name + ": " + message + " is missing";
  };

  throwUnexpected = function(instance, message) {
    throw "" + instance.constructor.name + ": " + message + " is unexpected";
  };

  legacyWarning = function(identifier, last_version, message) {
    var _base;
    this._legacy_warnings || (this._legacy_warnings = {});
    (_base = this._legacy_warnings)[identifier] || (_base[identifier] = 0);
    this._legacy_warnings[identifier]++;
    return console.warn("warning: '" + identifier + "' has been deprecated (will be removed in Knockback after " + last_version + "). " + message + ".");
  };

  arraySplice = Array.prototype.splice;

  collapseOptions = function(options) {
    var result;
    result = _.clone(options);
    while (options.options) {
      _.defaults(result, options.options);
      options = options.options;
    }
    delete result.options;
    return result;
  };

  kb.TYPE_UNKNOWN = KB_TYPE_UNKNOWN = 0;

  kb.TYPE_SIMPLE = KB_TYPE_SIMPLE = 1;

  kb.TYPE_ARRAY = KB_TYPE_ARRAY = 2;

  kb.TYPE_MODEL = KB_TYPE_MODEL = 3;

  kb.TYPE_COLLECTION = KB_TYPE_COLLECTION = 4;

  /*
    knockback-utils.js
    (c) 2011, 2012 Kevin Malakoff.
    Knockback.js is freely distributable under the MIT license.
    See the following for full license details:
      https://github.com/kmalakoff/knockback/blob/master/LICENSE
    Dependencies: Knockout.js, Backbone.js, and Underscore.js.
      Optional dependency: Backbone.ModelRef.js.
  */


  _wrappedKey = function(obj, key, value) {
    if (arguments.length === 2) {
      if (obj && obj.__kb && obj.__kb.hasOwnProperty(key)) {
        return obj.__kb[key];
      } else {
        return void 0;
      }
    }
    obj || throwUnexpected(this, "no obj for wrapping " + key);
    obj.__kb || (obj.__kb = {});
    obj.__kb[key] = value;
    return value;
  };

  _argumentsAddKey = function(args, key) {
    arraySplice.call(args, 1, 0, key);
    return args;
  };

  _unwrapModels = function(obj) {
    var key, result, value;
    if (!obj) {
      return obj;
    } else if (obj.__kb) {
      if ('object' in obj.__kb) {
        return obj.__kb.object;
      } else {
        return obj;
      }
    } else if (_.isArray(obj)) {
      return _.map(obj, function(test) {
        return _unwrapModels(test);
      });
    } else if (_.isObject(obj) && !ko.isObservable(obj) && !_.isDate(obj) && !_.isString(obj)) {
      result = {};
      for (key in obj) {
        value = obj[key];
        result[key] = _unwrapModels(value);
      }
      return result;
    } else {
      return obj;
    }
  };

  kb.utils = (function() {

    function utils() {}

    utils.wrappedObservable = function(obj, value) {
      return _wrappedKey.apply(this, _argumentsAddKey(arguments, 'observable'));
    };

    utils.wrappedObject = function(obj, value) {
      return _wrappedKey.apply(this, _argumentsAddKey(arguments, 'object'));
    };

    utils.wrappedModel = function(obj, value) {
      if (arguments.length === 1) {
        value = _wrappedKey(obj, 'object');
        if (_.isUndefined(value)) {
          return obj;
        } else {
          return value;
        }
      } else {
        return _wrappedKey(obj, 'object', value);
      }
    };

    utils.wrappedStore = function(obj, value) {
      return _wrappedKey.apply(this, _argumentsAddKey(arguments, 'store'));
    };

    utils.wrappedStoreIsOwned = function(obj, value) {
      return _wrappedKey.apply(this, _argumentsAddKey(arguments, 'store_is_owned'));
    };

    utils.wrappedFactory = function(obj, value) {
      return _wrappedKey.apply(this, _argumentsAddKey(arguments, 'factory'));
    };

    utils.wrappedModelWatcher = function(obj, value) {
      return _wrappedKey.apply(this, _argumentsAddKey(arguments, 'model_watcher'));
    };

    utils.wrappedModelWatcherIsOwned = function(obj, value) {
      return _wrappedKey.apply(this, _argumentsAddKey(arguments, 'model_watcher_is_owned'));
    };

    utils.wrappedDestroy = function(obj) {
      var __kb;
      if (!obj.__kb) {
        return;
      }
      if (obj.__kb.model_watcher) {
        obj.__kb.model_watcher.releaseCallbacks(obj);
      }
      __kb = obj.__kb;
      obj.__kb = null;
      if (__kb.observable) {
        __kb.observable.destroy = __kb.observable.release = null;
        this.wrappedDestroy(__kb.observable);
        __kb.observable = null;
      }
      __kb.factory = null;
      if (__kb.model_watcher_is_owned) {
        __kb.model_watcher.destroy();
      }
      __kb.model_watcher = null;
      if (__kb.store_is_owned) {
        __kb.store.destroy();
      }
      return __kb.store = null;
    };

    utils.valueType = function(observable) {
      if (!observable) {
        return KB_TYPE_UNKNOWN;
      }
      if (observable.__kb_is_o) {
        return observable.valueType();
      }
      if (observable.__kb_is_co || (observable instanceof Backbone.Collection)) {
        return KB_TYPE_COLLECTION;
      }
      if ((observable instanceof kb.ViewModel) || (observable instanceof Backbone.Model)) {
        return KB_TYPE_MODEL;
      }
      if (_.isArray(observable)) {
        return KB_TYPE_ARRAY;
      }
      return KB_TYPE_SIMPLE;
    };

    utils.pathJoin = function(path1, path2) {
      return (path1 ? (path1[path1.length - 1] !== '.' ? "" + path1 + "." : path1) : '') + path2;
    };

    utils.optionsPathJoin = function(options, path) {
      return _.defaults({
        path: this.pathJoin(options.path, path)
      }, options);
    };

    utils.inferCreator = function(value, factory, path, owner, key) {
      var creator, relation;
      if (factory) {
        creator = factory.creatorForPath(value, path);
      }
      if (creator) {
        return creator;
      }
      if (owner && Backbone.RelationalModel && (owner instanceof Backbone.RelationalModel)) {
        key = ko.utils.unwrapObservable(key);
        relation = _.find(owner.getRelations(), function(test) {
          return test.key === key;
        });
        if (relation) {
          if (relation.collectionType || _.isArray(relation.keyContents)) {
            return kb.CollectionObservable;
          } else {
            return kb.ViewModel;
          }
        }
      }
      if (!value) {
        return null;
      }
      if (value instanceof Backbone.Model) {
        return kb.ViewModel;
      }
      if (value instanceof Backbone.Collection) {
        return kb.CollectionObservable;
      }
      return null;
    };

    utils.createFromDefaultCreator = function(obj, options) {
      if (obj instanceof Backbone.Model) {
        return kb.viewModel(obj, options);
      }
      if (obj instanceof Backbone.Collection) {
        return kb.collectionObservable(obj, options);
      }
      if (_.isArray(obj)) {
        return ko.observableArray(obj);
      }
      return ko.observable(obj);
    };

    utils.release = function(obj) {
      legacyWarning('kb.utils.release', '0.16.1', 'Please use kb.release instead');
      return kb.release(obj);
    };

    return utils;

  })();

  /*
    knockback_factory.js
    (c) 2011, 2012 Kevin Malakoff.
    Knockback.Factory is freely distributable under the MIT license.
    See the following for full license details:
      https://github.com/kmalakoff/knockback/blob/master/LICENSE
  */


  kb.Factory = (function() {

    Factory.useOptionsOrCreate = function(options, obj, owner_path) {
      var factory;
      if (options.factory && !options.factories) {
        factory = kb.utils.wrappedFactory(obj, options.factory);
      } else {
        factory = kb.utils.wrappedFactory(obj, new kb.Factory(options.factory));
      }
      if (options.factories) {
        factory.addPathMappings(options.factories, owner_path);
      }
      return factory;
    };

    function Factory(parent_factory) {
      this.parent_factory = parent_factory;
      this.paths = {};
    }

    Factory.prototype.hasPath = function(path) {
      return this.paths.hasOwnProperty(path) || (this.parent_factory && this.parent_factory.hasPath(path));
    };

    Factory.prototype.addPathMapping = function(path, create_info) {
      return this.paths[path] = create_info;
    };

    Factory.prototype.addPathMappings = function(factories, owner_path) {
      var create_info, path;
      for (path in factories) {
        create_info = factories[path];
        this.paths[kb.utils.pathJoin(owner_path, path)] = create_info;
      }
      return this;
    };

    Factory.prototype.creatorForPath = function(obj, path) {
      var creator;
      if ((creator = this.paths[path])) {
        if (creator.view_model) {
          return creator.view_model;
        } else {
          return creator;
        }
      }
      if (this.parent_factory) {
        if ((creator = this.parent_factory.creatorForPath(obj, path))) {
          return creator;
        }
      }
      return null;
    };

    return Factory;

  })();

  /*
    knockback_store.js
    (c) 2012 Kevin Malakoff.
    Knockback.Store is freely distributable under the MIT license.
    See the following for full license details:
      https://github.com/kmalakoff/knockback/blob/master/LICENSE
  */


  kb.Store = (function() {

    Store.useOptionsOrCreate = function(options, obj, observable) {
      if (options.store) {
        options.store.register(obj, observable, options);
        return kb.utils.wrappedStore(observable, options.store);
      } else {
        kb.utils.wrappedStoreIsOwned(observable, true);
        return kb.utils.wrappedStore(observable, new kb.Store());
      }
    };

    function Store() {
      this.observable_records = [];
      this.replaced_observables = [];
    }

    Store.prototype.destroy = function() {
      var observable, record, _i, _j, _len, _len1, _ref, _ref1;
      _ref = this.observable_records;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        record = _ref[_i];
        kb.release(record.observable);
      }
      _ref1 = this.replaced_observables;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        observable = _ref1[_j];
        kb.release(observable);
      }
      this.observable_records = null;
      return this.replaced_observables = null;
    };

    Store.prototype.register = function(obj, observable, options) {
      var creator;
      if (!observable) {
        return;
      }
      if (ko.isObservable(observable) || observable.__kb_is_co) {
        return;
      }
      kb.utils.wrappedObject(observable, obj);
      if (!obj) {
        observable.__kb_null = true;
      }
      creator = options.creator ? options.creator : (options.path && options.factory ? options.factory.creatorForPath(obj, options.path) : null);
      if (!creator) {
        creator = observable.constructor;
      }
      this.observable_records.push({
        obj: obj,
        observable: observable,
        creator: creator
      });
      return observable;
    };

    Store.prototype.findIndex = function(obj, creator) {
      var index, record, _ref;
      if (!obj || (obj instanceof Backbone.Model)) {
        _ref = this.observable_records;
        for (index in _ref) {
          record = _ref[index];
          if (!record.observable) {
            continue;
          }
          if (record.observable.__kb_destroyed) {
            record.obj = null;
            record.observable = null;
            continue;
          }
          if ((!obj && !record.observable.__kb_null) || (obj && (record.observable.__kb_null || (record.obj !== obj)))) {
            continue;
          } else if ((record.creator === creator) || (record.creator.create && (record.creator.create === creator.create))) {
            return index;
          }
        }
      }
      return -1;
    };

    Store.prototype.find = function(obj, creator) {
      var index;
      if ((index = this.findIndex(obj, creator)) < 0) {
        return null;
      } else {
        return this.observable_records[index].observable;
      }
    };

    Store.prototype.isRegistered = function(observable) {
      var record, _i, _len, _ref;
      _ref = this.observable_records;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        record = _ref[_i];
        if (record.observable === observable) {
          return true;
        }
      }
      return false;
    };

    Store.prototype.findOrCreate = function(obj, options) {
      var creator, observable;
      options.store = this;
      options.creator || (options.creator = kb.utils.inferCreator(obj, options.factory, options.path));
      if (!options.creator && (obj instanceof Backbone.Model)) {
        options.creator = kv.ViewModel;
      }
      creator = options.creator;
      if (!creator) {
        return kb.utils.createFromDefaultCreator(obj, options);
      } else if (creator.models_only) {
        return obj;
      }
      if (creator) {
        observable = this.find(obj, creator);
      }
      if (observable) {
        return observable;
      }
      if (creator.create) {
        observable = creator.create(obj, options);
      } else {
        observable = new creator(obj, options);
      }
      observable || (observable = ko.observable(null));
      if (!ko.isObservable(observable)) {
        this.isRegistered(observable) || this.register(obj, observable, options);
      }
      return observable;
    };

    Store.prototype.findOrReplace = function(obj, creator, observable) {
      var index, record;
      obj || raiseUnexpected('obj missing');
      if ((index = this.findIndex(obj, creator)) < 0) {
        return this.register(obj, observable, {
          creator: creator
        });
      } else {
        record = this.observable_records[index];
        (kb.utils.wrappedObject(record.observable) === obj) || throwUnexpected(this, 'different object');
        if (record.observable !== observable) {
          (record.observable.constructor === observable.constructor) || throwUnexpected(this, 'replacing different type');
          this.replaced_observables.push(record.observable);
          record.observable = observable;
        }
        return observable;
      }
    };

    return Store;

  })();

  /*
    knockback_model_watcher.js
    (c) 2011, 2012 Kevin Malakoff.
    Knockback.Observable is freely distributable under the MIT license.
    See the following for full license details:
      https://github.com/kmalakoff/knockback/blob/master/LICENSE
  */


  addStatisticsEvent = function(model, event_name, info) {
    return !kb.statistics || kb.statistics.addModelEvent({
      name: event_name,
      model: model,
      key: info.key,
      path: info.path
    });
  };

  kb.ModelWatcher = (function() {

    ModelWatcher.useOptionsOrCreate = function(options, model, obj, callback_options) {
      if (options.model_watcher) {
        if (!(options.model_watcher.model() === model || (options.model_watcher.model_ref === model))) {
          throwUnexpected(this, 'model not matching');
        }
        return kb.utils.wrappedModelWatcher(obj, options.model_watcher).registerCallbacks(obj, callback_options);
      } else {
        kb.utils.wrappedModelWatcherIsOwned(obj, true);
        return kb.utils.wrappedModelWatcher(obj, new kb.ModelWatcher(model)).registerCallbacks(obj, callback_options);
      }
    };

    function ModelWatcher(model, obj, callback_options) {
      this._onModelUnloaded = __bind(this._onModelUnloaded, this);

      this._onModelLoaded = __bind(this._onModelLoaded, this);
      this.__kb || (this.__kb = {});
      this.__kb.callbacks = {};
      this.__kb._onModelLoaded = _.bind(this._onModelLoaded, this);
      this.__kb._onModelUnloaded = _.bind(this._onModelUnloaded, this);
      if (callback_options) {
        this.registerCallbacks(obj, callback_options);
      }
      if (model) {
        this.model(model);
      } else {
        this.m = null;
      }
    }

    ModelWatcher.prototype.destroy = function() {
      this.model(null);
      this.__kb.callbacks = null;
      return kb.utils.wrappedDestroy(this);
    };

    ModelWatcher.prototype.model = function(new_model) {
      var callbacks, event_name, info, list, previous_model, _i, _len, _ref;
      if ((arguments.length === 0) || (this.m === new_model)) {
        return this.m;
      }
      if (this.model_ref) {
        this.model_ref.unbind('loaded', this.__kb._onModelLoaded);
        this.model_ref.unbind('unloaded', this.__kb._onModelUnloaded);
        this.model_ref.release();
        this.model_ref = null;
      }
      if (Backbone.ModelRef && (new_model instanceof Backbone.ModelRef)) {
        this.model_ref = new_model;
        this.model_ref.retain();
        this.model_ref.bind('loaded', this.__kb._onModelLoaded);
        this.model_ref.bind('unloaded', this.__kb._onModelUnloaded);
        new_model = this.model_ref.model();
      } else {
        delete this.model_ref;
      }
      previous_model = this.m;
      this.m = new_model;
      _ref = this.__kb.callbacks;
      for (event_name in _ref) {
        callbacks = _ref[event_name];
        if (previous_model) {
          previous_model.unbind(event_name, callbacks.fn);
        }
        if (new_model) {
          new_model.bind(event_name, callbacks.fn);
        }
        list = callbacks.list;
        for (_i = 0, _len = list.length; _i < _len; _i++) {
          info = list[_i];
          if (info.model) {
            info.model(new_model);
          }
        }
      }
      return new_model;
    };

    ModelWatcher.prototype.registerCallbacks = function(obj, callback_info) {
      var callbacks, event_name, info, list;
      obj || throwMissing(this, 'obj');
      callback_info || throwMissing(this, 'info');
      event_name = callback_info.event_name ? callback_info.event_name : 'change';
      callbacks = this.__kb.callbacks[event_name];
      if (!callbacks) {
        list = [];
        callbacks = {
          list: list,
          fn: function(model) {
            var info, _i, _len;
            for (_i = 0, _len = list.length; _i < _len; _i++) {
              info = list[_i];
              if (info.update && !info.rel_fn) {
                if (model && info.key && (model.hasChanged && !model.hasChanged(ko.utils.unwrapObservable(info.key)))) {
                  continue;
                }
                !kb.statistics || addStatisticsEvent(model, event_name, info);
                info.update();
              }
            }
            return null;
          }
        };
        this.__kb.callbacks[event_name] = callbacks;
        if (this.m) {
          this.m.bind(event_name, callbacks.fn);
        }
      }
      info = _.defaults({
        obj: obj
      }, callback_info);
      callbacks.list.push(info);
      if (this.m) {
        if (Backbone.RelationalModel && (this.m instanceof Backbone.RelationalModel)) {
          this._modelBindRelatationalInfo(event_name, info);
        }
        info.model(this.m) && info.model;
      }
      return this;
    };

    ModelWatcher.prototype.releaseCallbacks = function(obj) {
      var callbacks, event_name, index, info, _ref, _ref1;
      if (!this.__kb.callbacks) {
        return;
      }
      _ref = this.__kb.callbacks;
      for (event_name in _ref) {
        callbacks = _ref[event_name];
        _ref1 = callbacks.list;
        for (index in _ref1) {
          info = _ref1[index];
          if (info.obj === obj) {
            callbacks.list.splice(index, 1);
            if (info.rel_fn) {
              this._modelUnbindRelatationalInfo(event_name, info);
            }
            if (info.model) {
              info.model(null);
            }
            return;
          }
        }
      }
    };

    ModelWatcher.prototype._onModelLoaded = function(model) {
      var callbacks, event_name, info, is_relational, list, _i, _len, _ref;
      is_relational = Backbone.RelationalModel && (model instanceof Backbone.RelationalModel);
      this.m = model;
      _ref = this.__kb.callbacks;
      for (event_name in _ref) {
        callbacks = _ref[event_name];
        model.bind(event_name, callbacks.fn);
        list = callbacks.list;
        for (_i = 0, _len = list.length; _i < _len; _i++) {
          info = list[_i];
          if (is_relational) {
            this._modelBindRelatationalInfo(event_name, info);
          }
          if (info.model) {
            info.model(model);
          }
        }
      }
      return this;
    };

    ModelWatcher.prototype._onModelUnloaded = function(model) {
      var callbacks, event_name, info, list, _i, _len, _ref;
      this.m = null;
      _ref = this.__kb.callbacks;
      for (event_name in _ref) {
        callbacks = _ref[event_name];
        model.unbind(event_name, callbacks.fn);
        list = callbacks.list;
        for (_i = 0, _len = list.length; _i < _len; _i++) {
          info = list[_i];
          if (info.rel_fn) {
            this._modelUnbindRelatationalInfo(event_name, info);
          }
          if (info.model) {
            info.model(null);
          }
        }
      }
      return this;
    };

    ModelWatcher.prototype._modelBindRelatationalInfo = function(event_name, info) {
      var key, relation;
      if ((event_name === 'change') && info.key && info.update) {
        key = ko.utils.unwrapObservable(info.key);
        relation = _.find(this.m.getRelations(), function(test) {
          return test.key === key;
        });
        if (!relation) {
          return;
        }
        info.rel_fn = function(model) {
          !kb.statistics || addStatisticsEvent(model, "" + event_name + " (relational)", info);
          return info.update();
        };
        if (relation.collectionType || _.isArray(relation.keyContents)) {
          info.is_collection = true;
          this.m.bind("add:" + info.key, info.rel_fn);
          this.m.bind("remove:" + info.key, info.rel_fn);
        } else {
          this.m.bind("update:" + info.key, info.rel_fn);
        }
      }
      return this;
    };

    ModelWatcher.prototype._modelUnbindRelatationalInfo = function(event_name, info) {
      if (!info.rel_fn) {
        return;
      }
      if (info.is_collection) {
        this.m.unbind("add:" + info.key, info.rel_fn);
        this.m.unbind("remove:" + info.key, info.rel_fn);
      } else {
        this.m.unbind("update:" + info.key, info.rel_fn);
      }
      info.rel_fn = null;
      return this;
    };

    return ModelWatcher;

  })();

  kb.modelObservable = function(model, observable) {
    return new kb.ModelWatcher(model, observable);
  };

  /*
    knockback-observable.js
    (c) 2012 Kevin Malakoff.
    Knockback.Observable is freely distributable under the MIT license.
    See the following for full license details:
      https://github.com/kmalakoff/knockback/blob/master/LICENSE
  */


  kb.Observable = (function() {

    function Observable(model, options, vm) {
      var create_options, model_watcher, observable,
        _this = this;
      this.vm = vm;
      options || throwMissing(this, 'options');
      this.vm || (this.vm = {});
      if (_.isString(options) || ko.isObservable(options)) {
        create_options = this.create_options = {
          key: options
        };
      } else {
        create_options = this.create_options = collapseOptions(options);
      }
      this.key = create_options.key;
      delete create_options.key;
      this.key || throwMissing(this, 'key');
      !create_options.args || (this.args = create_options.args, delete create_options.args);
      !create_options.read || (this.read = create_options.read, delete create_options.read);
      !create_options.write || (this.write = create_options.write, delete create_options.write);
      model_watcher = create_options.model_watcher;
      delete create_options.model_watcher;
      this.vo = ko.observable(null);
      observable = kb.utils.wrappedObservable(this, ko.dependentObservable({
        read: function() {
          var arg, args, new_value, _i, _len, _ref;
          args = [ko.utils.unwrapObservable(_this.key)];
          if (_this.args) {
            if (_.isArray(_this.args)) {
              _ref = _this.args;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                arg = _ref[_i];
                args.push(ko.utils.unwrapObservable(arg));
              }
            } else {
              args.push(ko.utils.unwrapObservable(_this.args));
            }
          }
          if (_this.m) {
            new_value = _this.read ? _this.read.apply(_this.vm, args) : _this.m.get.apply(_this.m, args);
            _this.update(new_value);
          }
          return ko.utils.unwrapObservable(_this.vo());
        },
        write: function(new_value) {
          var arg, args, set_info, unwrapped_new_value, _i, _len, _ref;
          unwrapped_new_value = _unwrapModels(new_value);
          set_info = {};
          set_info[ko.utils.unwrapObservable(_this.key)] = unwrapped_new_value;
          args = _this.write ? [unwrapped_new_value] : [set_info];
          if (_this.args) {
            if (_.isArray(_this.args)) {
              _ref = _this.args;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                arg = _ref[_i];
                args.push(ko.utils.unwrapObservable(arg));
              }
            } else {
              args.push(ko.utils.unwrapObservable(_this.args));
            }
          }
          if (_this.m) {
            if (_this.write) {
              _this.write.apply(_this.vm, args);
            } else {
              _this.m.set.apply(_this.m, args);
            }
          }
          return _this.update(new_value);
        },
        owner: this.vm
      }));
      observable.__kb_is_o = true;
      create_options.store = kb.utils.wrappedStore(observable, create_options.store);
      create_options.path = kb.utils.pathJoin(create_options.path, this.key);
      if (create_options.factories && ((typeof create_options.factories === 'function') || create_options.factories.create)) {
        create_options.factory = kb.utils.wrappedFactory(observable, new kb.Factory(create_options.factory));
        create_options.factory.addPathMapping(create_options.path, create_options.factories);
      } else {
        create_options.factory = kb.Factory.useOptionsOrCreate(create_options, observable, create_options.path);
      }
      delete create_options.factories;
      observable.value = _.bind(this.value, this);
      observable.valueType = _.bind(this.valueType, this);
      observable.destroy = _.bind(this.destroy, this);
      kb.ModelWatcher.useOptionsOrCreate({
        model_watcher: model_watcher
      }, model, this, {
        model: _.bind(this.model, this),
        update: _.bind(this.update, this),
        key: this.key,
        path: create_options.path
      });
      this.__kb_value || this.update();
      if (kb.LocalizedObservable && create_options.localizer) {
        observable = new create_options.localizer(observable);
        delete create_options.localizer;
      }
      if (kb.DefaultObservable && create_options.hasOwnProperty('default')) {
        observable = kb.defaultObservable(observable, create_options["default"]);
        delete create_options["default"];
      }
      return observable;
    }

    Observable.prototype.destroy = function() {
      this.__kb_destroyed = true;
      kb.release(this.__kb_value);
      this.__kb_value = null;
      this.vm = null;
      this.create_options = null;
      return kb.utils.wrappedDestroy(this);
    };

    Observable.prototype.value = function() {
      return this.__kb_value;
    };

    Observable.prototype.valueType = function() {
      var new_value;
      new_value = this.m ? this.m.get(this.key) : null;
      this.value_type || this._updateValueObservable(new_value);
      return this.value_type;
    };

    Observable.prototype.model = function(new_model) {
      if ((arguments.length === 0) || (this.m === new_model)) {
        return this.m;
      }
      this.m = new_model;
      return this.__kb_destroyed || this.update();
    };

    Observable.prototype.update = function(new_value) {
      var new_type, value;
      if (this.m && !arguments.length) {
        new_value = this.m.get(ko.utils.unwrapObservable(this.key));
      }
      new_value || (new_value = null);
      new_type = kb.utils.valueType(new_value);
      if (!this.__kb_value || (this.__kb_value.__kb_destroyed || (this.__kb_value.__kb_null && new_value))) {
        this.__kb_value = null;
        this.value_type = void 0;
      }
      value = this.__kb_value;
      if (_.isUndefined(this.value_type) || (this.value_type !== new_type && new_type !== KB_TYPE_UNKNOWN)) {
        if ((this.value_type === KB_TYPE_COLLECTION) && (new_type === KB_TYPE_ARRAY)) {
          return value(new_value);
        } else {
          return this._updateValueObservable(new_value);
        }
      } else if (this.value_type === KB_TYPE_MODEL) {
        if (typeof value.model === 'function') {
          if (value.model() !== new_value) {
            return value.model(new_value);
          }
        } else if (kb.utils.wrappedObject(value) !== new_value) {
          return this._updateValueObservable(new_value);
        }
      } else if (this.value_type === KB_TYPE_COLLECTION) {
        if (value.collection() !== new_value) {
          return value.collection(new_value);
        }
      } else {
        if (value() !== new_value) {
          return value(new_value);
        }
      }
    };

    Observable.prototype._updateValueObservable = function(new_value) {
      var create_options, creator, previous_value, value;
      create_options = this.create_options;
      create_options.creator = kb.utils.inferCreator(new_value, create_options.factory, create_options.path, this.m, this.key);
      this.value_type = KB_TYPE_UNKNOWN;
      creator = create_options.creator;
      previous_value = this.__kb_value;
      this.__kb_value = null;
      if (previous_value) {
        kb.release(previous_value);
      }
      if (creator) {
        if (create_options.store) {
          value = create_options.store.findOrCreate(new_value, create_options);
        } else {
          if (creator.models_only) {
            value = new_value;
            this.value_type = KB_TYPE_SIMPLE;
          } else if (creator.create) {
            value = creator.create(new_value, create_options);
          } else {
            value = new creator(new_value, create_options);
          }
        }
      } else {
        this.value_type = KB_TYPE_SIMPLE;
        if (_.isArray(new_value)) {
          value = ko.observableArray(new_value);
        } else {
          value = ko.observable(new_value);
        }
      }
      if (this.value_type === KB_TYPE_UNKNOWN) {
        if (!ko.isObservable(value)) {
          this.value_type = KB_TYPE_MODEL;
          if (typeof value.model !== 'function') {
            kb.utils.wrappedObject(value, new_value);
          }
        } else if (value.__kb_is_co) {
          this.value_type = KB_TYPE_COLLECTION;
        } else {
          this.value_type = KB_TYPE_SIMPLE;
        }
      }
      this.__kb_value = value;
      return this.vo(value);
    };

    return Observable;

  })();

  kb.observable = function(model, options, view_model) {
    return new kb.Observable(model, options, view_model);
  };

  /*
    knockback-view-model.js
    (c) 2011, 2012 Kevin Malakoff.
    Knockback.Observable is freely distributable under the MIT license.
    See the following for full license details:
      https://github.com/kmalakoff/knockback/blob/master/LICENSE
  */


  kb.ViewModel = (function() {

    ViewModel.extend = Backbone.Model.extend;

    function ViewModel(model, options, view_model) {
      var attribute_keys, bb_model, keys, mapped_keys, mapping_info, model_watcher, vm_key, _ref;
      !model || (model instanceof Backbone.Model) || ((typeof model.get === 'function') && (typeof model.bind === 'function')) || throwUnexpected(this, 'not a model');
      options || (options = {});
      view_model || (view_model = {});
      if (_.isArray(options)) {
        options = {
          keys: options
        };
      } else {
        options = collapseOptions(options);
      }
      this.__kb || (this.__kb = {});
      this.__kb.vm_keys = {};
      this.__kb.model_keys = {};
      this.__kb.view_model = _.isUndefined(view_model) ? this : view_model;
      !options.internals || (this.__kb.internals = options.internals);
      !options.excludes || (this.__kb.excludes = options.excludes);
      kb.Store.useOptionsOrCreate(options, model, this);
      this.__kb.path = options.path;
      kb.Factory.useOptionsOrCreate(options, this, options.path);
      model_watcher = kb.utils.wrappedModelWatcher(this, new kb.ModelWatcher(model, this, {
        model: _.bind(this.model, this)
      }));
      if (options.requires && _.isArray(options.requires)) {
        keys = _.clone(options.requires);
      }
      if (this.__kb.internals) {
        keys = keys ? _.union(keys, this.__kb.internals) : _.clone(this.__kb.internals);
      }
      if (options.keys) {
        if (_.isArray(options.keys)) {
          this.__kb.keys = options.keys;
          keys = keys ? _.union(keys, options.keys) : _.clone(options.keys);
        } else {
          mapped_keys = {};
          _ref = options.keys;
          for (vm_key in _ref) {
            mapping_info = _ref[vm_key];
            mapped_keys[_.isString(mapping_info) ? mapping_info : (mapping_info.key ? mapping_info.key : vm_key)] = true;
          }
          this.__kb.keys = _.keys(mapped_keys);
        }
      } else {
        bb_model = model_watcher.model();
        if (bb_model && bb_model.attributes) {
          attribute_keys = _.keys(bb_model.attributes);
          keys = keys ? _.union(keys, attribute_keys) : attribute_keys;
        }
      }
      if (keys && this.__kb.excludes) {
        keys = _.difference(keys, this.__kb.excludes);
      }
      if (_.isObject(options.keys) && !_.isArray(options.keys)) {
        this._mapObservables(model, options.keys);
      }
      if (_.isObject(options.requires) && !_.isArray(options.requires)) {
        this._mapObservables(model, options.requires);
      }
      !options.mappings || this._mapObservables(model, options.mappings);
      !keys || this._createObservables(model, keys);
      !kb.statistics || kb.statistics.register('ViewModel', this);
    }

    ViewModel.prototype.destroy = function() {
      var vm_key;
      if (this.__kb.view_model !== this) {
        for (vm_key in this.__kb.vm_keys) {
          this.__kb.view_model[vm_key] = null;
        }
      }
      this.__kb.view_model = null;
      kb.releaseKeys(this);
      kb.utils.wrappedDestroy(this);
      return !kb.statistics || kb.statistics.unregister('ViewModel', this);
    };

    ViewModel.prototype.shareOptions = function() {
      return {
        store: kb.utils.wrappedStore(this),
        factory: kb.utils.wrappedFactory(this)
      };
    };

    ViewModel.prototype.model = function(new_model) {
      var missing, model, model_watcher;
      model = kb.utils.wrappedObject(this);
      if ((arguments.length === 0) || (model === new_model)) {
        return model;
      }
      if (this.__kb_null) {
        !new_model || throwUnexpected(this, 'model set on shared null');
        return;
      }
      kb.utils.wrappedObject(this, new_model);
      model_watcher = kb.utils.wrappedModelWatcher(this);
      if (!model_watcher) {
        return;
      }
      model_watcher.model(new_model);
      if (this.__kb.keys || !new_model || !new_model.attributes) {
        return;
      }
      missing = _.difference(_.keys(new_model.attributes), _.keys(this.__kb.model_keys));
      if (missing) {
        return this._createObservables(new_model, missing);
      }
    };

    ViewModel.prototype._createObservables = function(model, keys) {
      var create_options, key, vm_key, _i, _len;
      create_options = {
        store: kb.utils.wrappedStore(this),
        factory: kb.utils.wrappedFactory(this),
        path: this.__kb.path,
        model_watcher: kb.utils.wrappedModelWatcher(this)
      };
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        vm_key = this.__kb.internals && _.contains(this.__kb.internals, key) ? "_" + key : key;
        if (this[vm_key]) {
          continue;
        }
        this.__kb.vm_keys[vm_key] = true;
        this.__kb.model_keys[key] = true;
        create_options.key = key;
        this[vm_key] = this.__kb.view_model[vm_key] = kb.observable(model, create_options, this);
      }
      return this;
    };

    ViewModel.prototype._mapObservables = function(model, mappings) {
      var create_options, mapping_info, vm_key;
      create_options = {
        store: kb.utils.wrappedStore(this),
        factory: kb.utils.wrappedFactory(this),
        path: this.__kb.path,
        model_watcher: kb.utils.wrappedModelWatcher(this)
      };
      for (vm_key in mappings) {
        mapping_info = mappings[vm_key];
        if (this[vm_key]) {
          continue;
        }
        mapping_info = _.isString(mapping_info) ? {
          key: mapping_info
        } : _.clone(mapping_info);
        mapping_info.key || (mapping_info.key = vm_key);
        this.__kb.vm_keys[vm_key] = true;
        this.__kb.model_keys[mapping_info.key] = true;
        this[vm_key] = this.__kb.view_model[vm_key] = kb.observable(model, _.defaults(mapping_info, create_options), this);
      }
      return this;
    };

    return ViewModel;

  })();

  kb.viewModel = function(model, options, view_model) {
    return new kb.ViewModel(model, options, view_model);
  };

  kb.observables = function(model, binding_info, view_model) {
    legacyWarning('ko.observables', '0.16.1', 'Please use kb.viewModel instead');
    return new kb.ViewModel(model, binding_info, view_model);
  };

  /*
    knockback-collection-observable.js
    (c) 2011, 2012 Kevin Malakoff.
    Knockback.CollectionObservable is freely distributable under the MIT license.
    See the following for full license details:
      https://github.com/kmalakoff/knockback/blob/master/LICENSE
  */


  kb.CollectionObservable = (function() {

    CollectionObservable.extend = Backbone.Model.extend;

    function CollectionObservable(collection, options) {
      var create_options, factory, observable;
      !collection || (collection instanceof Backbone.Collection) || throwUnexpected(this, 'not a collection');
      options || (options = {});
      observable = kb.utils.wrappedObservable(this, ko.observableArray([]));
      observable.__kb_is_co = true;
      this.in_edit = 0;
      this.__kb || (this.__kb = {});
      this.__kb._onCollectionChange = _.bind(this._onCollectionChange, this);
      options = collapseOptions(options);
      this.sort_attribute = options.sort_attribute;
      this.sorted_index = options.sorted_index;
      this.filters = _.isArray(options.filters) ? options.filters : options.filters ? [options.filters] : void 0;
      create_options = this.create_options = {
        store: kb.Store.useOptionsOrCreate(options, collection, observable)
      };
      this.path = options.path;
      factory = create_options.factory = kb.utils.wrappedFactory(observable, new kb.Factory(options.factory));
      if (options.factories) {
        factory.addPathMappings(options.factories, options.path);
      }
      create_options.path = kb.utils.pathJoin(options.path, 'models');
      create_options.creator = factory.creatorForPath(null, create_options.path);
      if (create_options.creator) {
        this.models_only = create_options.creator.models_only;
      } else {
        if (options.hasOwnProperty('models_only')) {
          if (options.models_only) {
            factory.addPathMapping(create_options.path, {
              models_only: options.models_only
            });
            this.models_only = options.models_only;
          } else {
            factory.addPathMapping(create_options.path, kb.ViewModel);
          }
        } else if (options.view_model) {
          factory.addPathMapping(create_options.path, options.view_model);
        } else if (options.create) {
          factory.addPathMapping(create_options.path, {
            create: options.create
          });
        } else {
          factory.addPathMapping(create_options.path, kb.ViewModel);
        }
        create_options.creator = factory.creatorForPath(null, create_options.path);
      }
      observable.destroy = _.bind(this.destroy, this);
      observable.shareOptions = _.bind(this.shareOptions, this);
      observable.collection = _.bind(this.collection, this);
      observable.viewModelByModel = _.bind(this.viewModelByModel, this);
      observable.sortedIndex = _.bind(this.sortedIndex, this);
      observable.sortAttribute = _.bind(this.sortAttribute, this);
      observable.hasViewModels = _.bind(this.hasViewModels, this);
      observable.bind = _.bind(this.bind, this);
      observable.unbind = _.bind(this.unbind, this);
      observable.trigger = _.bind(this.trigger, this);
      kb.utils.wrappedObject(observable, null);
      if (collection) {
        this.collection(collection, {
          silent: true,
          'defer': options['defer']
        });
      }
      observable.subscribe(_.bind(this._onObservableArrayChange, this));
      !kb.statistics || kb.statistics.register('CollectionObservable', this);
      return observable;
    }

    CollectionObservable.prototype.destroy = function() {
      var collection, observable;
      observable = kb.utils.wrappedObservable(this);
      collection = kb.utils.wrappedObject(observable);
      if (collection) {
        collection.unbind('all', this.__kb._onCollectionChange);
        this._clear(true);
        kb.utils.wrappedObject(observable, null);
      }
      this.filters = null;
      this.sorted_index;
      this.create_options = null;
      kb.utils.wrappedDestroy(this);
      return !kb.statistics || kb.statistics.unregister('CollectionObservable', this);
    };

    CollectionObservable.prototype.shareOptions = function() {
      var observable;
      observable = kb.utils.wrappedObservable(this);
      return {
        store: kb.utils.wrappedStore(observable),
        factory: kb.utils.wrappedFactory(observable)
      };
    };

    CollectionObservable.prototype.collection = function(collection, options) {
      var observable, previous_collection;
      observable = kb.utils.wrappedObservable(this);
      previous_collection = kb.utils.wrappedObject(observable);
      if ((arguments.length === 0) || (collection === previous_collection)) {
        observable();
        return previous_collection;
      }
      if (collection) {
        if (typeof collection.retain === "function") {
          collection.retain();
        }
      }
      if (previous_collection) {
        previous_collection.unbind('all', this.__kb._onCollectionChange);
        if (typeof previous_collection.release === "function") {
          previous_collection.release();
        }
      }
      kb.utils.wrappedObject(observable, collection);
      if (collection) {
        collection.bind('all', this.__kb._onCollectionChange);
        this.sortedIndex(this.sorted_index, this.sort_attribute, options);
      } else {
        this._clear();
      }
      return collection;
    };

    CollectionObservable.prototype.sortedIndex = function(sorted_index, sort_attribute, options) {
      var _resync,
        _this = this;
      options || (options = {});
      if (sorted_index) {
        this.sorted_index = sorted_index;
        this.sort_attribute = sort_attribute;
      } else if (sort_attribute) {
        this.sort_attribute = sort_attribute;
        this.sorted_index = this._sortAttributeFn(sort_attribute);
      } else {
        this.sort_attribute = null;
        this.sorted_index = null;
      }
      _resync = function() {
        var collection, observable;
        observable = kb.utils.wrappedObservable(_this);
        collection = kb.utils.wrappedObject(observable);
        if ((collection.models.length === 0) && (observable().length === 0)) {
          return;
        }
        _this._collectionResync(true);
        if (!options.silent) {
          return _this.trigger('resort', observable());
        }
      };
      if (options['defer']) {
        _.defer(_resync);
      } else {
        _resync();
      }
      return this;
    };

    CollectionObservable.prototype.sortAttribute = function(sort_attribute, sorted_index, options) {
      return this.sortedIndex(sorted_index, sort_attribute, options);
    };

    CollectionObservable.prototype.viewModelByModel = function(model) {
      var id_attribute;
      if (this.models_only) {
        return null;
      }
      id_attribute = model.hasOwnProperty(model.idAttribute) ? model.idAttribute : 'cid';
      return _.find(kb.utils.wrappedObservable(this)(), function(test) {
        return test.__kb.object[id_attribute] === model[id_attribute];
      });
    };

    CollectionObservable.prototype.hasViewModels = function() {
      return !this.models_only;
    };

    CollectionObservable.prototype._onCollectionChange = function(event, arg) {
      var add_index, collection, observable, view_model;
      if (this.in_edit) {
        return;
      }
      switch (event) {
        case 'reset':
          return this._collectionResync();
        case 'resort':
          return !this.sorted_index;
          if (_.isArray(arg)) {
            return this.trigger('resort', kb.utils.wrappedObservable(this)());
          } else {
            return this._onModelResort(arg);
          }
          break;
        case 'new':
        case 'add':
          if (this._modelIsFiltered(arg)) {
            return;
          }
          observable = kb.utils.wrappedObservable(this);
          collection = kb.utils.wrappedObject(observable);
          view_model = this._createViewModel(arg);
          add_index = this.sorted_index ? this.sorted_index(observable(), view_model) : collection.indexOf(arg);
          this.in_edit++;
          observable.splice(add_index, 0, view_model);
          this.in_edit--;
          return this.trigger('add', view_model, observable());
        case 'remove':
        case 'destroy':
          return this._onModelRemove(arg);
        case 'change':
          return this._onModelChange(arg);
      }
    };

    CollectionObservable.prototype._onModelRemove = function(model) {
      var observable, view_model;
      view_model = this.models_only ? model : this.viewModelByModel(model);
      if (!view_model) {
        return;
      }
      observable = kb.utils.wrappedObservable(this);
      this.in_edit++;
      observable.remove(view_model);
      this.in_edit--;
      return this.trigger('remove', view_model, observable);
    };

    CollectionObservable.prototype._onModelChange = function(model) {
      if (this._modelIsFiltered(model)) {
        return this._onModelRemove(model);
      } else {
        if (this.sorted_index && (!this.sort_attribute || model.hasChanged(this.sort_attribute))) {
          return this._onModelResort(model);
        }
      }
    };

    CollectionObservable.prototype._onModelResort = function(model) {
      var collection, new_index, observable, previous_index, sorted_view_models, view_model;
      observable = kb.utils.wrappedObservable(this);
      collection = kb.utils.wrappedObject(observable);
      view_model = this.models_only ? model : this.viewModelByModel(model);
      previous_index = observable.indexOf(view_model);
      if (this.sorted_index) {
        sorted_view_models = _.clone(observable());
        sorted_view_models.splice(previous_index, 1);
        new_index = this.sorted_index(sorted_view_models, view_model);
      } else {
        new_index = collection.indexOf(model);
      }
      if (previous_index === new_index) {
        return;
      }
      this.in_edit++;
      observable.splice(previous_index, 1);
      observable.splice(new_index, 0, view_model);
      this.in_edit--;
      return this.trigger('resort', view_model, observable(), new_index);
    };

    CollectionObservable.prototype._onObservableArrayChange = function(values) {
      var collection, has_view_model, models, observable, value, _i, _j, _len, _len1,
        _this = this;
      if (this.in_edit) {
        return;
      }
      observable = kb.utils.wrappedObservable(this);
      collection = kb.utils.wrappedObject(observable);
      if (!this.models_only) {
        for (_i = 0, _len = values.length; _i < _len; _i++) {
          value = values[_i];
          if (value && !(value instanceof Backbone.Model)) {
            has_view_model = true;
            break;
          }
        }
        if (has_view_model) {
          for (_j = 0, _len1 = values.length; _j < _len1; _j++) {
            value = values[_j];
            this.create_options.store.findOrReplace(kb.utils.wrappedObject(value), this.create_options.creator, value);
          }
        }
      }
      models = _.map(values, function(test) {
        return kb.utils.wrappedModel(test);
      });
      if (this.filters) {
        models = _.filter(models, function(model) {
          return !_this._modelIsFiltered(model);
        });
      }
      if ((models.length !== values.length) || _.difference(collection.models, models).length) {
        this.in_edit++;
        collection.reset(models);
        return this.in_edit--;
      }
    };

    CollectionObservable.prototype._clear = function(silent) {
      var array, observable;
      observable = kb.utils.wrappedObservable(this);
      if (!silent) {
        this.trigger('remove', observable());
      }
      if (silent) {
        array = observable();
        array.splice(0, array.length);
      } else {
        this.in_edit++;
        observable.removeAll();
        this.in_edit--;
      }
      return this;
    };

    CollectionObservable.prototype._collectionResync = function(silent) {
      var add_index, array, collection, model, models, observable, view_model, view_models, _i, _len,
        _this = this;
      observable = kb.utils.wrappedObservable(this);
      collection = kb.utils.wrappedObject(observable);
      if (!silent) {
        this.trigger('remove', observable());
      }
      array = observable();
      array.splice(0, array.length);
      if (this.filters) {
        models = _.filter(collection.models, function(model) {
          return !_this._modelIsFiltered(model);
        });
      } else {
        models = collection.models;
      }
      if (this.sorted_index) {
        view_models = [];
        for (_i = 0, _len = models.length; _i < _len; _i++) {
          model = models[_i];
          view_model = this._createViewModel(model);
          add_index = this.sorted_index(view_models, view_model);
          view_models.splice(add_index, 0, view_model);
        }
      } else {
        view_models = this.models_only ? (this.filters ? models : _.clone(models)) : _.map(models, function(model) {
          return _this._createViewModel(model);
        });
      }
      this.in_edit++;
      observable(view_models);
      this.in_edit--;
      if (!silent) {
        return this.trigger('add', observable());
      }
    };

    CollectionObservable.prototype._sortAttributeFn = function(sort_attribute) {
      if (this.models_only) {
        return function(models, model) {
          return _.sortedIndex(models, model, function(test) {
            return test.get(sort_attribute);
          });
        };
      } else {
        return function(view_models, model) {
          return _.sortedIndex(view_models, model, function(test) {
            return kb.utils.wrappedModel(test).get(sort_attribute);
          });
        };
      }
    };

    CollectionObservable.prototype._createViewModel = function(model) {
      if (this.models_only) {
        return model;
      } else {
        return this.create_options.store.findOrCreate(model, this.create_options);
      }
    };

    CollectionObservable.prototype._modelIsFiltered = function(model) {
      var filter, _i, _len, _ref;
      if (this.filters) {
        _ref = this.filters;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          filter = _ref[_i];
          filter = ko.utils.unwrapObservable(filter);
          if (((typeof filter === 'function') && filter(model)) || (model && (model.id === filter))) {
            return true;
          }
        }
      }
      return false;
    };

    return CollectionObservable;

  })();

  __extends(kb.CollectionObservable.prototype, Backbone.Events);

  kb.collectionObservable = function(collection, options) {
    return new kb.CollectionObservable(collection, options);
  };

  kb.sortedIndexWrapAttr = kb.siwa = function(attribute_name, wrapper_constructor) {
    return function(models, model) {
      return _.sortedIndex(models, model, function(test) {
        return new wrapper_constructor(kb.utils.wrappedModel(test).get(attribute_name));
      });
    };
  };

  /*
    knockback_default_wrapper.js
    (c) 2011, 2012 Kevin Malakoff.
    Knockback.DefaultObservable is freely distributable under the MIT license.
    See the following for full license details:
      https://github.com/kmalakoff/knockback/blob/master/LICENSE
  */


  kb.DefaultObservable = (function() {

    function DefaultObservable(target_observable, dv) {
      var observable,
        _this = this;
      this.dv = dv;
      observable = kb.utils.wrappedObservable(this, ko.dependentObservable({
        read: function() {
          var current_target;
          if ((current_target = ko.utils.unwrapObservable(target_observable()))) {
            return current_target;
          } else {
            return ko.utils.unwrapObservable(_this.dv);
          }
        },
        write: function(value) {
          return target_observable(value);
        }
      }));
      observable.destroy = _.bind(this.destroy, this);
      observable.setToDefault = _.bind(this.setToDefault, this);
      return observable;
    }

    DefaultObservable.prototype.destroy = function() {
      return kb.utils.wrappedDestroy(this);
    };

    DefaultObservable.prototype.setToDefault = function() {
      return kb.utils.wrappedObservable(this)(this.dv);
    };

    return DefaultObservable;

  })();

  kb.defaultObservable = function(target, default_value) {
    return new kb.DefaultObservable(target, default_value);
  };

  kb.defaultWrapper = function(target, default_value) {
    legacyWarning('ko.defaultWrapper', '0.16.1', 'Please use kb.defaultObservable instead');
    return new kb.DefaultObservable(target, default_value);
  };

  /*
    knockback-formatted-observable.js
    (c) 2011, 2012 Kevin Malakoff.
    Knockback.FormattedObservable is freely distributable under the MIT license.
    See the following for full license details:
      https://github.com/kmalakoff/knockback/blob/master/LICENSE
  */


  arraySlice = Array.prototype.slice;

  kb.toFormattedString = function(format) {
    var arg, args, index, parameter_index, result, value;
    result = format.slice();
    args = arraySlice.call(arguments, 1);
    for (index in args) {
      arg = args[index];
      value = ko.utils.unwrapObservable(arg);
      value || (value = '');
      parameter_index = format.indexOf("\{" + index + "\}");
      while (parameter_index >= 0) {
        result = result.replace("{" + index + "}", value);
        parameter_index = format.indexOf("\{" + index + "\}", parameter_index + 1);
      }
    }
    return result;
  };

  kb.parseFormattedString = function(string, format) {
    var count, format_indices_to_matched_indices, index, match_index, matches, parameter_count, parameter_index, positions, regex, regex_string, result, results, sorted_positions;
    regex_string = format.slice();
    index = 0;
    parameter_count = 0;
    positions = {};
    while (regex_string.search("\\{" + index + "\\}") >= 0) {
      parameter_index = format.indexOf("\{" + index + "\}");
      while (parameter_index >= 0) {
        regex_string = regex_string.replace("\{" + index + "\}", '(.*)');
        positions[parameter_index] = index;
        parameter_count++;
        parameter_index = format.indexOf("\{" + index + "\}", parameter_index + 1);
      }
      index++;
    }
    count = index;
    regex = new RegExp(regex_string);
    matches = regex.exec(string);
    if (matches) {
      matches.shift();
    }
    if (!matches || (matches.length !== parameter_count)) {
      result = [];
      while (count-- > 0) {
        result.push('');
      }
      return result;
    }
    sorted_positions = _.sortBy(_.keys(positions), function(parameter_index, format_index) {
      return parseInt(parameter_index, 10);
    });
    format_indices_to_matched_indices = {};
    for (match_index in sorted_positions) {
      parameter_index = sorted_positions[match_index];
      index = positions[parameter_index];
      if (format_indices_to_matched_indices.hasOwnProperty(index)) {
        continue;
      }
      format_indices_to_matched_indices[index] = match_index;
    }
    results = [];
    index = 0;
    while (index < count) {
      results.push(matches[format_indices_to_matched_indices[index]]);
      index++;
    }
    return results;
  };

  kb.FormattedObservable = (function() {

    function FormattedObservable(format, args) {
      var observable, observable_args;
      if (_.isArray(args)) {
        format = format;
        observable_args = args;
      } else {
        observable_args = arraySlice.call(arguments, 1);
      }
      observable = kb.utils.wrappedObservable(this, ko.dependentObservable({
        read: function() {
          var arg, _i, _len;
          args = [ko.utils.unwrapObservable(format)];
          for (_i = 0, _len = observable_args.length; _i < _len; _i++) {
            arg = observable_args[_i];
            args.push(ko.utils.unwrapObservable(arg));
          }
          return kb.toFormattedString.apply(null, args);
        },
        write: function(value) {
          var index, matches, max_count;
          matches = kb.parseFormattedString(value, ko.utils.unwrapObservable(format));
          max_count = Math.min(observable_args.length, matches.length);
          index = 0;
          while (index < max_count) {
            observable_args[index](matches[index]);
            index++;
          }
          return this;
        }
      }));
      return observable;
    }

    FormattedObservable.prototype.destroy = function() {
      return kb.utils.wrappedDestroy(this);
    };

    return FormattedObservable;

  })();

  kb.formattedObservable = function(format, args) {
    return new kb.FormattedObservable(format, arraySlice.call(arguments, 1));
  };

  /*
    knockback-localized-observable.js
    (c) 2011, 2012 Kevin Malakoff.
    Knockback.LocalizedObservable is freely distributable under the MIT license.
    See the following for full license details:
      https://github.com/kmalakoff/knockback/blob/master/LICENSE
  */


  kb.LocalizedObservable = (function() {

    LocalizedObservable.extend = Backbone.Model.extend;

    function LocalizedObservable(value, options, vm) {
      var observable,
        _this = this;
      this.value = value;
      this.vm = vm;
      options || (options = {});
      this.vm || (this.vm = {});
      this.read || throwMissing(this, 'read');
      kb.locale_manager || throwMissing(this, 'kb.locale_manager');
      this.__kb || (this.__kb = {});
      this.__kb._onLocaleChange = _.bind(this._onLocaleChange, this);
      this.__kb._onChange = options.onChange;
      if (this.value) {
        value = ko.utils.unwrapObservable(this.value);
      }
      this.vo = ko.observable(!value ? null : this.read(value, null));
      observable = kb.utils.wrappedObservable(this, ko.dependentObservable({
        read: function() {
          if (_this.value) {
            ko.utils.unwrapObservable(_this.value);
          }
          _this.vo();
          return _this.read(ko.utils.unwrapObservable(_this.value));
        },
        write: function(value) {
          _this.write || throwUnexpected(_this, 'writing to read-only');
          _this.write(value, ko.utils.unwrapObservable(_this.value));
          _this.vo(value);
          if (_this.__kb._onChange) {
            return _this.__kb._onChange(value);
          }
        },
        owner: this.vm
      }));
      observable.destroy = _.bind(this.destroy, this);
      observable.observedValue = _.bind(this.observedValue, this);
      observable.resetToCurrent = _.bind(this.resetToCurrent, this);
      kb.locale_manager.bind('change', this.__kb._onLocaleChange);
      if (options.hasOwnProperty('default')) {
        observable = kb.DefaultObservable && ko.defaultObservable(observable, options["default"]);
      }
      return observable;
    }

    LocalizedObservable.prototype.destroy = function() {
      kb.locale_manager.unbind('change', this.__kb._onLocaleChange);
      this.vm = null;
      return kb.utils.wrappedDestroy(this);
    };

    LocalizedObservable.prototype.resetToCurrent = function() {
      var current_value, observable;
      observable = kb.utils.wrappedObservable(this);
      current_value = this.value ? this.read(ko.utils.unwrapObservable(this.value)) : null;
      if (observable() === current_value) {
        return;
      }
      return observable(current_value);
    };

    LocalizedObservable.prototype.observedValue = function(value) {
      if (arguments.length === 0) {
        return this.value;
      }
      this.value = value;
      this._onLocaleChange();
      return this;
    };

    LocalizedObservable.prototype._onLocaleChange = function() {
      var value;
      value = this.read(ko.utils.unwrapObservable(this.value));
      this.vo(value);
      if (this.__kb._onChange) {
        return this.__kb._onChange(value);
      }
    };

    return LocalizedObservable;

  })();

  kb.localizedObservable = function(value, options, view_model) {
    return new kb.LocalizedObservable(value, options, view_model);
  };

  /*
    knockback-triggered-observable.js
    (c) 2011, 2012 Kevin Malakoff.
    Knockback.Observable is freely distributable under the MIT license.
    See the following for full license details:
      https://github.com/kmalakoff/knockback/blob/master/LICENSE
  */


  kb.TriggeredObservable = (function() {

    function TriggeredObservable(model, event_name) {
      var observable,
        _this = this;
      this.event_name = event_name;
      model || throwMissing(this, 'model');
      this.event_name || throwMissing(this, 'event_name');
      this.vo = ko.observable();
      observable = kb.utils.wrappedObservable(this, ko.dependentObservable(function() {
        return _this.vo();
      }));
      observable.destroy = _.bind(this.destroy, this);
      kb.utils.wrappedModelWatcher(this, new kb.ModelWatcher(model, this, {
        model: _.bind(this.model, this),
        update: _.bind(this.update, this),
        event_name: this.event_name
      }));
      return observable;
    }

    TriggeredObservable.prototype.destroy = function() {
      return kb.utils.wrappedDestroy(this);
    };

    TriggeredObservable.prototype.model = function(new_model) {
      if ((arguments.length === 0) || (this.m === new_model)) {
        return this.m;
      }
      if ((this.m = new_model)) {
        return this.update();
      }
    };

    TriggeredObservable.prototype.update = function() {
      if (!this.m) {
        return;
      }
      if (this.vo() !== this.m) {
        return this.vo(this.m);
      } else {
        return this.vo.valueHasMutated();
      }
    };

    return TriggeredObservable;

  })();

  kb.triggeredObservable = function(model, event_name) {
    return new kb.TriggeredObservable(model, event_name);
  };

}).call(this);

}).call(global, module, undefined);

})(window)
},{"knockout":"i/30Ax","underscore":"GoDQOv","backbone":"/Z1EQg"}],"knockout":[function(require,module,exports){
module.exports=require('i/30Ax');
},{}],"i/30Ax":[function(require,module,exports){
(function(global){(function browserifyShim(module, define, browserify_shim__define__module__export__) {

; global._ = require("underscore");
global.$ = require("jquery");
// Knockout JavaScript library v2.1.0
// (c) Steven Sanderson - http://knockoutjs.com/
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function(window,document,navigator,undefined){
function m(w){throw w;}var n=void 0,p=!0,s=null,t=!1;function A(w){return function(){return w}};function E(w){function B(b,c,d){d&&c!==a.k.r(b)&&a.k.S(b,c);c!==a.k.r(b)&&a.a.va(b,"change")}var a="undefined"!==typeof w?w:{};a.b=function(b,c){for(var d=b.split("."),f=a,g=0;g<d.length-1;g++)f=f[d[g]];f[d[d.length-1]]=c};a.B=function(a,c,d){a[c]=d};a.version="2.1.0";a.b("version",a.version);a.a=new function(){function b(b,c){if("input"!==a.a.o(b)||!b.type||"click"!=c.toLowerCase())return t;var e=b.type;return"checkbox"==e||"radio"==e}var c=/^(\s|\u00A0)+|(\s|\u00A0)+$/g,d={},f={};d[/Firefox\/2/i.test(navigator.userAgent)?
"KeyboardEvent":"UIEvents"]=["keyup","keydown","keypress"];d.MouseEvents="click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");for(var g in d){var e=d[g];if(e.length)for(var h=0,j=e.length;h<j;h++)f[e[h]]=g}var k={propertychange:p},i=function(){for(var a=3,b=document.createElement("div"),c=b.getElementsByTagName("i");b.innerHTML="<\!--[if gt IE "+ ++a+"]><i></i><![endif]--\>",c[0];);return 4<a?a:n}();return{Ca:["authenticity_token",/^__RequestVerificationToken(_.*)?$/],
v:function(a,b){for(var c=0,e=a.length;c<e;c++)b(a[c])},j:function(a,b){if("function"==typeof Array.prototype.indexOf)return Array.prototype.indexOf.call(a,b);for(var c=0,e=a.length;c<e;c++)if(a[c]===b)return c;return-1},ab:function(a,b,c){for(var e=0,f=a.length;e<f;e++)if(b.call(c,a[e]))return a[e];return s},ba:function(b,c){var e=a.a.j(b,c);0<=e&&b.splice(e,1)},za:function(b){for(var b=b||[],c=[],e=0,f=b.length;e<f;e++)0>a.a.j(c,b[e])&&c.push(b[e]);return c},T:function(a,b){for(var a=a||[],c=[],
e=0,f=a.length;e<f;e++)c.push(b(a[e]));return c},aa:function(a,b){for(var a=a||[],c=[],e=0,f=a.length;e<f;e++)b(a[e])&&c.push(a[e]);return c},N:function(a,b){if(b instanceof Array)a.push.apply(a,b);else for(var c=0,e=b.length;c<e;c++)a.push(b[c]);return a},extend:function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a},ga:function(b){for(;b.firstChild;)a.removeNode(b.firstChild)},Ab:function(b){for(var b=a.a.L(b),c=document.createElement("div"),e=0,f=b.length;e<f;e++)a.F(b[e]),
c.appendChild(b[e]);return c},X:function(b,c){a.a.ga(b);if(c)for(var e=0,f=c.length;e<f;e++)b.appendChild(c[e])},Na:function(b,c){var e=b.nodeType?[b]:b;if(0<e.length){for(var f=e[0],d=f.parentNode,g=0,h=c.length;g<h;g++)d.insertBefore(c[g],f);g=0;for(h=e.length;g<h;g++)a.removeNode(e[g])}},Pa:function(a,b){0<=navigator.userAgent.indexOf("MSIE 6")?a.setAttribute("selected",b):a.selected=b},w:function(a){return(a||"").replace(c,"")},Ib:function(b,c){for(var e=[],f=(b||"").split(c),g=0,d=f.length;g<
d;g++){var h=a.a.w(f[g]);""!==h&&e.push(h)}return e},Hb:function(a,b){a=a||"";return b.length>a.length?t:a.substring(0,b.length)===b},eb:function(a,b){for(var c="return ("+a+")",e=0;e<b;e++)c="with(sc["+e+"]) { "+c+" } ";return new Function("sc",c)},kb:function(a,b){if(b.compareDocumentPosition)return 16==(b.compareDocumentPosition(a)&16);for(;a!=s;){if(a==b)return p;a=a.parentNode}return t},fa:function(b){return a.a.kb(b,b.ownerDocument)},o:function(a){return a&&a.tagName&&a.tagName.toLowerCase()},
n:function(a,c,e){var f=i&&k[c];if(!f&&"undefined"!=typeof jQuery){if(b(a,c))var g=e,e=function(a,b){var c=this.checked;b&&(this.checked=b.fb!==p);g.call(this,a);this.checked=c};jQuery(a).bind(c,e)}else!f&&"function"==typeof a.addEventListener?a.addEventListener(c,e,t):"undefined"!=typeof a.attachEvent?a.attachEvent("on"+c,function(b){e.call(a,b)}):m(Error("Browser doesn't support addEventListener or attachEvent"))},va:function(a,c){(!a||!a.nodeType)&&m(Error("element must be a DOM node when calling triggerEvent"));
if("undefined"!=typeof jQuery){var e=[];b(a,c)&&e.push({fb:a.checked});jQuery(a).trigger(c,e)}else"function"==typeof document.createEvent?"function"==typeof a.dispatchEvent?(e=document.createEvent(f[c]||"HTMLEvents"),e.initEvent(c,p,p,window,0,0,0,0,0,t,t,t,t,0,a),a.dispatchEvent(e)):m(Error("The supplied element doesn't support dispatchEvent")):"undefined"!=typeof a.fireEvent?(b(a,c)&&(a.checked=a.checked!==p),a.fireEvent("on"+c)):m(Error("Browser doesn't support triggering events"))},d:function(b){return a.la(b)?
b():b},Ua:function(b,c,e){var f=(b.className||"").split(/\s+/),g=0<=a.a.j(f,c);if(e&&!g)b.className+=(f[0]?" ":"")+c;else if(g&&!e){e="";for(g=0;g<f.length;g++)f[g]!=c&&(e+=f[g]+" ");b.className=a.a.w(e)}},Qa:function(b,c){var e=a.a.d(c);if(e===s||e===n)e="";"innerText"in b?b.innerText=e:b.textContent=e;9<=i&&(b.style.display=b.style.display)},lb:function(a){if(9<=i){var b=a.style.width;a.style.width=0;a.style.width=b}},Eb:function(b,e){for(var b=a.a.d(b),e=a.a.d(e),c=[],f=b;f<=e;f++)c.push(f);return c},
L:function(a){for(var b=[],e=0,c=a.length;e<c;e++)b.push(a[e]);return b},tb:6===i,ub:7===i,ja:i,Da:function(b,e){for(var c=a.a.L(b.getElementsByTagName("input")).concat(a.a.L(b.getElementsByTagName("textarea"))),f="string"==typeof e?function(a){return a.name===e}:function(a){return e.test(a.name)},g=[],d=c.length-1;0<=d;d--)f(c[d])&&g.push(c[d]);return g},Bb:function(b){return"string"==typeof b&&(b=a.a.w(b))?window.JSON&&window.JSON.parse?window.JSON.parse(b):(new Function("return "+b))():s},sa:function(b,
e,c){("undefined"==typeof JSON||"undefined"==typeof JSON.stringify)&&m(Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js"));return JSON.stringify(a.a.d(b),e,c)},Cb:function(b,e,c){var c=c||{},f=c.params||{},g=c.includeFields||this.Ca,d=b;if("object"==typeof b&&"form"===a.a.o(b))for(var d=b.action,h=g.length-1;0<=h;h--)for(var k=a.a.Da(b,g[h]),
j=k.length-1;0<=j;j--)f[k[j].name]=k[j].value;var e=a.a.d(e),i=document.createElement("form");i.style.display="none";i.action=d;i.method="post";for(var z in e)b=document.createElement("input"),b.name=z,b.value=a.a.sa(a.a.d(e[z])),i.appendChild(b);for(z in f)b=document.createElement("input"),b.name=z,b.value=f[z],i.appendChild(b);document.body.appendChild(i);c.submitter?c.submitter(i):i.submit();setTimeout(function(){i.parentNode.removeChild(i)},0)}}};a.b("utils",a.a);a.b("utils.arrayForEach",a.a.v);
a.b("utils.arrayFirst",a.a.ab);a.b("utils.arrayFilter",a.a.aa);a.b("utils.arrayGetDistinctValues",a.a.za);a.b("utils.arrayIndexOf",a.a.j);a.b("utils.arrayMap",a.a.T);a.b("utils.arrayPushAll",a.a.N);a.b("utils.arrayRemoveItem",a.a.ba);a.b("utils.extend",a.a.extend);a.b("utils.fieldsIncludedWithJsonPost",a.a.Ca);a.b("utils.getFormFields",a.a.Da);a.b("utils.postJson",a.a.Cb);a.b("utils.parseJson",a.a.Bb);a.b("utils.registerEventHandler",a.a.n);a.b("utils.stringifyJson",a.a.sa);a.b("utils.range",a.a.Eb);
a.b("utils.toggleDomNodeCssClass",a.a.Ua);a.b("utils.triggerEvent",a.a.va);a.b("utils.unwrapObservable",a.a.d);Function.prototype.bind||(Function.prototype.bind=function(a){var c=this,d=Array.prototype.slice.call(arguments),a=d.shift();return function(){return c.apply(a,d.concat(Array.prototype.slice.call(arguments)))}});a.a.f=new function(){var b=0,c="__ko__"+(new Date).getTime(),d={};return{get:function(b,c){var e=a.a.f.getAll(b,t);return e===n?n:e[c]},set:function(b,c,e){e===n&&a.a.f.getAll(b,
t)===n||(a.a.f.getAll(b,p)[c]=e)},getAll:function(a,g){var e=a[c];if(!(e&&"null"!==e)){if(!g)return;e=a[c]="ko"+b++;d[e]={}}return d[e]},clear:function(a){var b=a[c];b&&(delete d[b],a[c]=s)}}};a.b("utils.domData",a.a.f);a.b("utils.domData.clear",a.a.f.clear);a.a.G=new function(){function b(b,c){var f=a.a.f.get(b,d);f===n&&c&&(f=[],a.a.f.set(b,d,f));return f}function c(e){var f=b(e,t);if(f)for(var f=f.slice(0),d=0;d<f.length;d++)f[d](e);a.a.f.clear(e);"function"==typeof jQuery&&"function"==typeof jQuery.cleanData&&
jQuery.cleanData([e]);if(g[e.nodeType])for(f=e.firstChild;e=f;)f=e.nextSibling,8===e.nodeType&&c(e)}var d="__ko_domNodeDisposal__"+(new Date).getTime(),f={1:p,8:p,9:p},g={1:p,9:p};return{wa:function(a,c){"function"!=typeof c&&m(Error("Callback must be a function"));b(a,p).push(c)},Ma:function(c,f){var g=b(c,t);g&&(a.a.ba(g,f),0==g.length&&a.a.f.set(c,d,n))},F:function(b){if(f[b.nodeType]&&(c(b),g[b.nodeType])){var d=[];a.a.N(d,b.getElementsByTagName("*"));for(var b=0,j=d.length;b<j;b++)c(d[b])}},
removeNode:function(b){a.F(b);b.parentNode&&b.parentNode.removeChild(b)}}};a.F=a.a.G.F;a.removeNode=a.a.G.removeNode;a.b("cleanNode",a.F);a.b("removeNode",a.removeNode);a.b("utils.domNodeDisposal",a.a.G);a.b("utils.domNodeDisposal.addDisposeCallback",a.a.G.wa);a.b("utils.domNodeDisposal.removeDisposeCallback",a.a.G.Ma);(function(){a.a.pa=function(b){var c;if("undefined"!=typeof jQuery){if((c=jQuery.clean([b]))&&c[0]){for(b=c[0];b.parentNode&&11!==b.parentNode.nodeType;)b=b.parentNode;b.parentNode&&
b.parentNode.removeChild(b)}}else{var d=a.a.w(b).toLowerCase();c=document.createElement("div");d=d.match(/^<(thead|tbody|tfoot)/)&&[1,"<table>","</table>"]||!d.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!d.indexOf("<td")||!d.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||[0,"",""];b="ignored<div>"+d[1]+b+d[2]+"</div>";for("function"==typeof window.innerShiv?c.appendChild(window.innerShiv(b)):c.innerHTML=b;d[0]--;)c=c.lastChild;c=a.a.L(c.lastChild.childNodes)}return c};
a.a.Y=function(b,c){a.a.ga(b);if(c!==s&&c!==n)if("string"!=typeof c&&(c=c.toString()),"undefined"!=typeof jQuery)jQuery(b).html(c);else for(var d=a.a.pa(c),f=0;f<d.length;f++)b.appendChild(d[f])}})();a.b("utils.parseHtmlFragment",a.a.pa);a.b("utils.setHtml",a.a.Y);a.s=function(){function b(){return(4294967296*(1+Math.random())|0).toString(16).substring(1)}function c(b,g){if(b)if(8==b.nodeType){var e=a.s.Ja(b.nodeValue);e!=s&&g.push({jb:b,yb:e})}else if(1==b.nodeType)for(var e=0,d=b.childNodes,j=d.length;e<
j;e++)c(d[e],g)}var d={};return{na:function(a){"function"!=typeof a&&m(Error("You can only pass a function to ko.memoization.memoize()"));var c=b()+b();d[c]=a;return"<\!--[ko_memo:"+c+"]--\>"},Va:function(a,b){var c=d[a];c===n&&m(Error("Couldn't find any memo with ID "+a+". Perhaps it's already been unmemoized."));try{return c.apply(s,b||[]),p}finally{delete d[a]}},Wa:function(b,d){var e=[];c(b,e);for(var h=0,j=e.length;h<j;h++){var k=e[h].jb,i=[k];d&&a.a.N(i,d);a.s.Va(e[h].yb,i);k.nodeValue="";k.parentNode&&
k.parentNode.removeChild(k)}},Ja:function(a){return(a=a.match(/^\[ko_memo\:(.*?)\]$/))?a[1]:s}}}();a.b("memoization",a.s);a.b("memoization.memoize",a.s.na);a.b("memoization.unmemoize",a.s.Va);a.b("memoization.parseMemoText",a.s.Ja);a.b("memoization.unmemoizeDomNodeAndDescendants",a.s.Wa);a.Ba={throttle:function(b,c){b.throttleEvaluation=c;var d=s;return a.h({read:b,write:function(a){clearTimeout(d);d=setTimeout(function(){b(a)},c)}})},notify:function(b,c){b.equalityComparer="always"==c?A(t):a.m.fn.equalityComparer;
return b}};a.b("extenders",a.Ba);a.Sa=function(b,c,d){this.target=b;this.ca=c;this.ib=d;a.B(this,"dispose",this.A)};a.Sa.prototype.A=function(){this.sb=p;this.ib()};a.R=function(){this.u={};a.a.extend(this,a.R.fn);a.B(this,"subscribe",this.ta);a.B(this,"extend",this.extend);a.B(this,"getSubscriptionsCount",this.ob)};a.R.fn={ta:function(b,c,d){var d=d||"change",b=c?b.bind(c):b,f=new a.Sa(this,b,function(){a.a.ba(this.u[d],f)}.bind(this));this.u[d]||(this.u[d]=[]);this.u[d].push(f);return f},notifySubscribers:function(b,
c){c=c||"change";this.u[c]&&a.a.v(this.u[c].slice(0),function(a){a&&a.sb!==p&&a.ca(b)})},ob:function(){var a=0,c;for(c in this.u)this.u.hasOwnProperty(c)&&(a+=this.u[c].length);return a},extend:function(b){var c=this;if(b)for(var d in b){var f=a.Ba[d];"function"==typeof f&&(c=f(c,b[d]))}return c}};a.Ga=function(a){return"function"==typeof a.ta&&"function"==typeof a.notifySubscribers};a.b("subscribable",a.R);a.b("isSubscribable",a.Ga);a.U=function(){var b=[];return{bb:function(a){b.push({ca:a,Aa:[]})},
end:function(){b.pop()},La:function(c){a.Ga(c)||m(Error("Only subscribable things can act as dependencies"));if(0<b.length){var d=b[b.length-1];0<=a.a.j(d.Aa,c)||(d.Aa.push(c),d.ca(c))}}}}();var G={undefined:p,"boolean":p,number:p,string:p};a.m=function(b){function c(){if(0<arguments.length){if(!c.equalityComparer||!c.equalityComparer(d,arguments[0]))c.I(),d=arguments[0],c.H();return this}a.U.La(c);return d}var d=b;a.R.call(c);c.H=function(){c.notifySubscribers(d)};c.I=function(){c.notifySubscribers(d,
"beforeChange")};a.a.extend(c,a.m.fn);a.B(c,"valueHasMutated",c.H);a.B(c,"valueWillMutate",c.I);return c};a.m.fn={equalityComparer:function(a,c){return a===s||typeof a in G?a===c:t}};var x=a.m.Db="__ko_proto__";a.m.fn[x]=a.m;a.ia=function(b,c){return b===s||b===n||b[x]===n?t:b[x]===c?p:a.ia(b[x],c)};a.la=function(b){return a.ia(b,a.m)};a.Ha=function(b){return"function"==typeof b&&b[x]===a.m||"function"==typeof b&&b[x]===a.h&&b.pb?p:t};a.b("observable",a.m);a.b("isObservable",a.la);a.b("isWriteableObservable",
a.Ha);a.Q=function(b){0==arguments.length&&(b=[]);b!==s&&(b!==n&&!("length"in b))&&m(Error("The argument passed when initializing an observable array must be an array, or null, or undefined."));var c=a.m(b);a.a.extend(c,a.Q.fn);return c};a.Q.fn={remove:function(a){for(var c=this(),d=[],f="function"==typeof a?a:function(c){return c===a},g=0;g<c.length;g++){var e=c[g];f(e)&&(0===d.length&&this.I(),d.push(e),c.splice(g,1),g--)}d.length&&this.H();return d},removeAll:function(b){if(b===n){var c=this(),
d=c.slice(0);this.I();c.splice(0,c.length);this.H();return d}return!b?[]:this.remove(function(c){return 0<=a.a.j(b,c)})},destroy:function(a){var c=this(),d="function"==typeof a?a:function(c){return c===a};this.I();for(var f=c.length-1;0<=f;f--)d(c[f])&&(c[f]._destroy=p);this.H()},destroyAll:function(b){return b===n?this.destroy(A(p)):!b?[]:this.destroy(function(c){return 0<=a.a.j(b,c)})},indexOf:function(b){var c=this();return a.a.j(c,b)},replace:function(a,c){var d=this.indexOf(a);0<=d&&(this.I(),
this()[d]=c,this.H())}};a.a.v("pop push reverse shift sort splice unshift".split(" "),function(b){a.Q.fn[b]=function(){var a=this();this.I();a=a[b].apply(a,arguments);this.H();return a}});a.a.v(["slice"],function(b){a.Q.fn[b]=function(){var a=this();return a[b].apply(a,arguments)}});a.b("observableArray",a.Q);a.h=function(b,c,d){function f(){a.a.v(v,function(a){a.A()});v=[]}function g(){var a=h.throttleEvaluation;a&&0<=a?(clearTimeout(x),x=setTimeout(e,a)):e()}function e(){if(!l)if(i&&w())u();else{l=
p;try{var b=a.a.T(v,function(a){return a.target});a.U.bb(function(c){var e;0<=(e=a.a.j(b,c))?b[e]=n:v.push(c.ta(g))});for(var e=q.call(c),f=b.length-1;0<=f;f--)b[f]&&v.splice(f,1)[0].A();i=p;h.notifySubscribers(k,"beforeChange");k=e}finally{a.U.end()}h.notifySubscribers(k);l=t}}function h(){if(0<arguments.length)j.apply(h,arguments);else return i||e(),a.U.La(h),k}function j(){"function"===typeof o?o.apply(c,arguments):m(Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters."))}
var k,i=t,l=t,q=b;q&&"object"==typeof q?(d=q,q=d.read):(d=d||{},q||(q=d.read));"function"!=typeof q&&m(Error("Pass a function that returns the value of the ko.computed"));var o=d.write;c||(c=d.owner);var v=[],u=f,r="object"==typeof d.disposeWhenNodeIsRemoved?d.disposeWhenNodeIsRemoved:s,w=d.disposeWhen||A(t);if(r){u=function(){a.a.G.Ma(r,arguments.callee);f()};a.a.G.wa(r,u);var y=w,w=function(){return!a.a.fa(r)||y()}}var x=s;h.nb=function(){return v.length};h.pb="function"===typeof d.write;h.A=function(){u()};
a.R.call(h);a.a.extend(h,a.h.fn);d.deferEvaluation!==p&&e();a.B(h,"dispose",h.A);a.B(h,"getDependenciesCount",h.nb);return h};a.rb=function(b){return a.ia(b,a.h)};w=a.m.Db;a.h[w]=a.m;a.h.fn={};a.h.fn[w]=a.h;a.b("dependentObservable",a.h);a.b("computed",a.h);a.b("isComputed",a.rb);(function(){function b(a,g,e){e=e||new d;a=g(a);if(!("object"==typeof a&&a!==s&&a!==n&&!(a instanceof Date)))return a;var h=a instanceof Array?[]:{};e.save(a,h);c(a,function(c){var d=g(a[c]);switch(typeof d){case "boolean":case "number":case "string":case "function":h[c]=
d;break;case "object":case "undefined":var i=e.get(d);h[c]=i!==n?i:b(d,g,e)}});return h}function c(a,b){if(a instanceof Array){for(var c=0;c<a.length;c++)b(c);"function"==typeof a.toJSON&&b("toJSON")}else for(c in a)b(c)}function d(){var b=[],c=[];this.save=function(e,d){var j=a.a.j(b,e);0<=j?c[j]=d:(b.push(e),c.push(d))};this.get=function(e){e=a.a.j(b,e);return 0<=e?c[e]:n}}a.Ta=function(c){0==arguments.length&&m(Error("When calling ko.toJS, pass the object you want to convert."));return b(c,function(b){for(var c=
0;a.la(b)&&10>c;c++)b=b();return b})};a.toJSON=function(b,c,e){b=a.Ta(b);return a.a.sa(b,c,e)}})();a.b("toJS",a.Ta);a.b("toJSON",a.toJSON);(function(){a.k={r:function(b){switch(a.a.o(b)){case "option":return b.__ko__hasDomDataOptionValue__===p?a.a.f.get(b,a.c.options.oa):b.getAttribute("value");case "select":return 0<=b.selectedIndex?a.k.r(b.options[b.selectedIndex]):n;default:return b.value}},S:function(b,c){switch(a.a.o(b)){case "option":switch(typeof c){case "string":a.a.f.set(b,a.c.options.oa,
n);"__ko__hasDomDataOptionValue__"in b&&delete b.__ko__hasDomDataOptionValue__;b.value=c;break;default:a.a.f.set(b,a.c.options.oa,c),b.__ko__hasDomDataOptionValue__=p,b.value="number"===typeof c?c:""}break;case "select":for(var d=b.options.length-1;0<=d;d--)if(a.k.r(b.options[d])==c){b.selectedIndex=d;break}break;default:if(c===s||c===n)c="";b.value=c}}}})();a.b("selectExtensions",a.k);a.b("selectExtensions.readValue",a.k.r);a.b("selectExtensions.writeValue",a.k.S);a.g=function(){function b(a,b){for(var d=
s;a!=d;)d=a,a=a.replace(c,function(a,c){return b[c]});return a}var c=/\@ko_token_(\d+)\@/g,d=/^[\_$a-z][\_$a-z0-9]*(\[.*?\])*(\.[\_$a-z][\_$a-z0-9]*(\[.*?\])*)*$/i,f=["true","false"];return{D:[],W:function(c){var e=a.a.w(c);if(3>e.length)return[];"{"===e.charAt(0)&&(e=e.substring(1,e.length-1));for(var c=[],d=s,f,k=0;k<e.length;k++){var i=e.charAt(k);if(d===s)switch(i){case '"':case "'":case "/":d=k,f=i}else if(i==f&&"\\"!==e.charAt(k-1)){i=e.substring(d,k+1);c.push(i);var l="@ko_token_"+(c.length-
1)+"@",e=e.substring(0,d)+l+e.substring(k+1),k=k-(i.length-l.length),d=s}}f=d=s;for(var q=0,o=s,k=0;k<e.length;k++){i=e.charAt(k);if(d===s)switch(i){case "{":d=k;o=i;f="}";break;case "(":d=k;o=i;f=")";break;case "[":d=k,o=i,f="]"}i===o?q++:i===f&&(q--,0===q&&(i=e.substring(d,k+1),c.push(i),l="@ko_token_"+(c.length-1)+"@",e=e.substring(0,d)+l+e.substring(k+1),k-=i.length-l.length,d=s))}f=[];e=e.split(",");d=0;for(k=e.length;d<k;d++)q=e[d],o=q.indexOf(":"),0<o&&o<q.length-1?(i=q.substring(o+1),f.push({key:b(q.substring(0,
o),c),value:b(i,c)})):f.push({unknown:b(q,c)});return f},ka:function(b){for(var c="string"===typeof b?a.g.W(b):b,h=[],b=[],j,k=0;j=c[k];k++)if(0<h.length&&h.push(","),j.key){var i;a:{i=j.key;var l=a.a.w(i);switch(l.length&&l.charAt(0)){case "'":case '"':break a;default:i="'"+l+"'"}}j=j.value;h.push(i);h.push(":");h.push(j);l=a.a.w(j);if(0<=a.a.j(f,a.a.w(l).toLowerCase())?0:l.match(d)!==s)0<b.length&&b.push(", "),b.push(i+" : function(__ko_value) { "+j+" = __ko_value; }")}else j.unknown&&h.push(j.unknown);
c=h.join("");0<b.length&&(c=c+", '_ko_property_writers' : { "+b.join("")+" } ");return c},wb:function(b,c){for(var d=0;d<b.length;d++)if(a.a.w(b[d].key)==c)return p;return t},$:function(b,c,d,f,k){if(!b||!a.Ha(b)){if((b=c()._ko_property_writers)&&b[d])b[d](f)}else(!k||b()!==f)&&b(f)}}}();a.b("jsonExpressionRewriting",a.g);a.b("jsonExpressionRewriting.bindingRewriteValidators",a.g.D);a.b("jsonExpressionRewriting.parseObjectLiteral",a.g.W);a.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson",
a.g.ka);(function(){function b(a){return 8==a.nodeType&&(g?a.text:a.nodeValue).match(e)}function c(a){return 8==a.nodeType&&(g?a.text:a.nodeValue).match(h)}function d(a,e){for(var d=a,f=1,g=[];d=d.nextSibling;){if(c(d)&&(f--,0===f))return g;g.push(d);b(d)&&f++}e||m(Error("Cannot find closing comment tag to match: "+a.nodeValue));return s}function f(a,b){var c=d(a,b);return c?0<c.length?c[c.length-1].nextSibling:a.nextSibling:s}var g="<\!--test--\>"===document.createComment("test").text,e=g?/^<\!--\s*ko\s+(.*\:.*)\s*--\>$/:
/^\s*ko\s+(.*\:.*)\s*$/,h=g?/^<\!--\s*\/ko\s*--\>$/:/^\s*\/ko\s*$/,j={ul:p,ol:p};a.e={C:{},childNodes:function(a){return b(a)?d(a):a.childNodes},ha:function(c){if(b(c))for(var c=a.e.childNodes(c),e=0,d=c.length;e<d;e++)a.removeNode(c[e]);else a.a.ga(c)},X:function(c,e){if(b(c)){a.e.ha(c);for(var d=c.nextSibling,f=0,g=e.length;f<g;f++)d.parentNode.insertBefore(e[f],d)}else a.a.X(c,e)},Ka:function(a,c){b(a)?a.parentNode.insertBefore(c,a.nextSibling):a.firstChild?a.insertBefore(c,a.firstChild):a.appendChild(c)},
Fa:function(a,c,e){b(a)?a.parentNode.insertBefore(c,e.nextSibling):e.nextSibling?a.insertBefore(c,e.nextSibling):a.appendChild(c)},firstChild:function(a){return!b(a)?a.firstChild:!a.nextSibling||c(a.nextSibling)?s:a.nextSibling},nextSibling:function(a){b(a)&&(a=f(a));return a.nextSibling&&c(a.nextSibling)?s:a.nextSibling},Xa:function(a){return(a=b(a))?a[1]:s},Ia:function(e){if(j[a.a.o(e)]){var d=e.firstChild;if(d){do if(1===d.nodeType){var g;g=d.firstChild;var h=s;if(g){do if(h)h.push(g);else if(b(g)){var o=
f(g,p);o?g=o:h=[g]}else c(g)&&(h=[g]);while(g=g.nextSibling)}if(g=h){h=d.nextSibling;for(o=0;o<g.length;o++)h?e.insertBefore(g[o],h):e.appendChild(g[o])}}while(d=d.nextSibling)}}}}})();a.b("virtualElements",a.e);a.b("virtualElements.allowedBindings",a.e.C);a.b("virtualElements.emptyNode",a.e.ha);a.b("virtualElements.insertAfter",a.e.Fa);a.b("virtualElements.prepend",a.e.Ka);a.b("virtualElements.setDomNodeChildren",a.e.X);(function(){a.J=function(){this.cb={}};a.a.extend(a.J.prototype,{nodeHasBindings:function(b){switch(b.nodeType){case 1:return b.getAttribute("data-bind")!=
s;case 8:return a.e.Xa(b)!=s;default:return t}},getBindings:function(a,c){var d=this.getBindingsString(a,c);return d?this.parseBindingsString(d,c):s},getBindingsString:function(b){switch(b.nodeType){case 1:return b.getAttribute("data-bind");case 8:return a.e.Xa(b);default:return s}},parseBindingsString:function(b,c){try{var d=c.$data,d="object"==typeof d&&d!=s?[d,c]:[c],f=d.length,g=this.cb,e=f+"_"+b,h;if(!(h=g[e])){var j=" { "+a.g.ka(b)+" } ";h=g[e]=a.a.eb(j,f)}return h(d)}catch(k){m(Error("Unable to parse bindings.\nMessage: "+
k+";\nBindings value: "+b))}}});a.J.instance=new a.J})();a.b("bindingProvider",a.J);(function(){function b(b,d,e){for(var h=a.e.firstChild(d);d=h;)h=a.e.nextSibling(d),c(b,d,e)}function c(c,g,e){var h=p,j=1===g.nodeType;j&&a.e.Ia(g);if(j&&e||a.J.instance.nodeHasBindings(g))h=d(g,s,c,e).Gb;h&&b(c,g,!j)}function d(b,c,e,d){function j(a){return function(){return l[a]}}function k(){return l}var i=0,l,q;a.h(function(){var o=e&&e instanceof a.z?e:new a.z(a.a.d(e)),v=o.$data;d&&a.Ra(b,o);if(l=("function"==
typeof c?c():c)||a.J.instance.getBindings(b,o)){if(0===i){i=1;for(var u in l){var r=a.c[u];r&&8===b.nodeType&&!a.e.C[u]&&m(Error("The binding '"+u+"' cannot be used with virtual elements"));if(r&&"function"==typeof r.init&&(r=(0,r.init)(b,j(u),k,v,o))&&r.controlsDescendantBindings)q!==n&&m(Error("Multiple bindings ("+q+" and "+u+") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.")),q=u}i=2}if(2===i)for(u in l)(r=a.c[u])&&"function"==
typeof r.update&&(0,r.update)(b,j(u),k,v,o)}},s,{disposeWhenNodeIsRemoved:b});return{Gb:q===n}}a.c={};a.z=function(b,c){c?(a.a.extend(this,c),this.$parentContext=c,this.$parent=c.$data,this.$parents=(c.$parents||[]).slice(0),this.$parents.unshift(this.$parent)):(this.$parents=[],this.$root=b);this.$data=b};a.z.prototype.createChildContext=function(b){return new a.z(b,this)};a.z.prototype.extend=function(b){var c=a.a.extend(new a.z,this);return a.a.extend(c,b)};a.Ra=function(b,c){if(2==arguments.length)a.a.f.set(b,
"__ko_bindingContext__",c);else return a.a.f.get(b,"__ko_bindingContext__")};a.ya=function(b,c,e){1===b.nodeType&&a.e.Ia(b);return d(b,c,e,p)};a.Ya=function(a,c){(1===c.nodeType||8===c.nodeType)&&b(a,c,p)};a.xa=function(a,b){b&&(1!==b.nodeType&&8!==b.nodeType)&&m(Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node"));b=b||window.document.body;c(a,b,p)};a.ea=function(b){switch(b.nodeType){case 1:case 8:var c=a.Ra(b);if(c)return c;if(b.parentNode)return a.ea(b.parentNode)}};
a.hb=function(b){return(b=a.ea(b))?b.$data:n};a.b("bindingHandlers",a.c);a.b("applyBindings",a.xa);a.b("applyBindingsToDescendants",a.Ya);a.b("applyBindingsToNode",a.ya);a.b("contextFor",a.ea);a.b("dataFor",a.hb)})();a.a.v(["click"],function(b){a.c[b]={init:function(c,d,f,g){return a.c.event.init.call(this,c,function(){var a={};a[b]=d();return a},f,g)}}});a.c.event={init:function(b,c,d,f){var g=c()||{},e;for(e in g)(function(){var g=e;"string"==typeof g&&a.a.n(b,g,function(b){var e,i=c()[g];if(i){var l=
d();try{var q=a.a.L(arguments);q.unshift(f);e=i.apply(f,q)}finally{e!==p&&(b.preventDefault?b.preventDefault():b.returnValue=t)}l[g+"Bubble"]===t&&(b.cancelBubble=p,b.stopPropagation&&b.stopPropagation())}})})()}};a.c.submit={init:function(b,c,d,f){"function"!=typeof c()&&m(Error("The value for a submit binding must be a function"));a.a.n(b,"submit",function(a){var e,d=c();try{e=d.call(f,b)}finally{e!==p&&(a.preventDefault?a.preventDefault():a.returnValue=t)}})}};a.c.visible={update:function(b,c){var d=
a.a.d(c()),f="none"!=b.style.display;d&&!f?b.style.display="":!d&&f&&(b.style.display="none")}};a.c.enable={update:function(b,c){var d=a.a.d(c());d&&b.disabled?b.removeAttribute("disabled"):!d&&!b.disabled&&(b.disabled=p)}};a.c.disable={update:function(b,c){a.c.enable.update(b,function(){return!a.a.d(c())})}};a.c.value={init:function(b,c,d){function f(){var e=c(),f=a.k.r(b);a.g.$(e,d,"value",f,p)}var g=["change"],e=d().valueUpdate;e&&("string"==typeof e&&(e=[e]),a.a.N(g,e),g=a.a.za(g));if(a.a.ja&&
("input"==b.tagName.toLowerCase()&&"text"==b.type&&"off"!=b.autocomplete&&(!b.form||"off"!=b.form.autocomplete))&&-1==a.a.j(g,"propertychange")){var h=t;a.a.n(b,"propertychange",function(){h=p});a.a.n(b,"blur",function(){if(h){h=t;f()}})}a.a.v(g,function(c){var e=f;if(a.a.Hb(c,"after")){e=function(){setTimeout(f,0)};c=c.substring(5)}a.a.n(b,c,e)})},update:function(b,c){var d="select"===a.a.o(b),f=a.a.d(c()),g=a.k.r(b),e=f!=g;0===f&&(0!==g&&"0"!==g)&&(e=p);e&&(g=function(){a.k.S(b,f)},g(),d&&setTimeout(g,
0));d&&0<b.length&&B(b,f,t)}};a.c.options={update:function(b,c,d){"select"!==a.a.o(b)&&m(Error("options binding applies only to SELECT elements"));for(var f=0==b.length,g=a.a.T(a.a.aa(b.childNodes,function(b){return b.tagName&&"option"===a.a.o(b)&&b.selected}),function(b){return a.k.r(b)||b.innerText||b.textContent}),e=b.scrollTop,h=a.a.d(c());0<b.length;)a.F(b.options[0]),b.remove(0);if(h){d=d();"number"!=typeof h.length&&(h=[h]);if(d.optionsCaption){var j=document.createElement("option");a.a.Y(j,
d.optionsCaption);a.k.S(j,n);b.appendChild(j)}for(var c=0,k=h.length;c<k;c++){var j=document.createElement("option"),i="string"==typeof d.optionsValue?h[c][d.optionsValue]:h[c],i=a.a.d(i);a.k.S(j,i);var l=d.optionsText,i="function"==typeof l?l(h[c]):"string"==typeof l?h[c][l]:i;if(i===s||i===n)i="";a.a.Qa(j,i);b.appendChild(j)}h=b.getElementsByTagName("option");c=j=0;for(k=h.length;c<k;c++)0<=a.a.j(g,a.k.r(h[c]))&&(a.a.Pa(h[c],p),j++);b.scrollTop=e;f&&"value"in d&&B(b,a.a.d(d.value),p);a.a.lb(b)}}};
a.c.options.oa="__ko.optionValueDomData__";a.c.selectedOptions={Ea:function(b){for(var c=[],b=b.childNodes,d=0,f=b.length;d<f;d++){var g=b[d],e=a.a.o(g);"option"==e&&g.selected?c.push(a.k.r(g)):"optgroup"==e&&(g=a.c.selectedOptions.Ea(g),Array.prototype.splice.apply(c,[c.length,0].concat(g)))}return c},init:function(b,c,d){a.a.n(b,"change",function(){var b=c(),g=a.c.selectedOptions.Ea(this);a.g.$(b,d,"value",g)})},update:function(b,c){"select"!=a.a.o(b)&&m(Error("values binding applies only to SELECT elements"));
var d=a.a.d(c());if(d&&"number"==typeof d.length)for(var f=b.childNodes,g=0,e=f.length;g<e;g++){var h=f[g];"option"===a.a.o(h)&&a.a.Pa(h,0<=a.a.j(d,a.k.r(h)))}}};a.c.text={update:function(b,c){a.a.Qa(b,c())}};a.c.html={init:function(){return{controlsDescendantBindings:p}},update:function(b,c){var d=a.a.d(c());a.a.Y(b,d)}};a.c.css={update:function(b,c){var d=a.a.d(c()||{}),f;for(f in d)if("string"==typeof f){var g=a.a.d(d[f]);a.a.Ua(b,f,g)}}};a.c.style={update:function(b,c){var d=a.a.d(c()||{}),f;
for(f in d)if("string"==typeof f){var g=a.a.d(d[f]);b.style[f]=g||""}}};a.c.uniqueName={init:function(b,c){c()&&(b.name="ko_unique_"+ ++a.c.uniqueName.gb,(a.a.tb||a.a.ub)&&b.mergeAttributes(document.createElement("<input name='"+b.name+"'/>"),t))}};a.c.uniqueName.gb=0;a.c.checked={init:function(b,c,d){a.a.n(b,"click",function(){var f;if("checkbox"==b.type)f=b.checked;else if("radio"==b.type&&b.checked)f=b.value;else return;var g=c();"checkbox"==b.type&&a.a.d(g)instanceof Array?(f=a.a.j(a.a.d(g),b.value),
b.checked&&0>f?g.push(b.value):!b.checked&&0<=f&&g.splice(f,1)):a.g.$(g,d,"checked",f,p)});"radio"==b.type&&!b.name&&a.c.uniqueName.init(b,A(p))},update:function(b,c){var d=a.a.d(c());"checkbox"==b.type?b.checked=d instanceof Array?0<=a.a.j(d,b.value):d:"radio"==b.type&&(b.checked=b.value==d)}};var F={"class":"className","for":"htmlFor"};a.c.attr={update:function(b,c){var d=a.a.d(c())||{},f;for(f in d)if("string"==typeof f){var g=a.a.d(d[f]),e=g===t||g===s||g===n;e&&b.removeAttribute(f);8>=a.a.ja&&
f in F?(f=F[f],e?b.removeAttribute(f):b[f]=g):e||b.setAttribute(f,g.toString())}}};a.c.hasfocus={init:function(b,c,d){function f(b){var e=c();a.g.$(e,d,"hasfocus",b,p)}a.a.n(b,"focus",function(){f(p)});a.a.n(b,"focusin",function(){f(p)});a.a.n(b,"blur",function(){f(t)});a.a.n(b,"focusout",function(){f(t)})},update:function(b,c){var d=a.a.d(c());d?b.focus():b.blur();a.a.va(b,d?"focusin":"focusout")}};a.c["with"]={p:function(b){return function(){var c=b();return{"if":c,data:c,templateEngine:a.q.K}}},
init:function(b,c){return a.c.template.init(b,a.c["with"].p(c))},update:function(b,c,d,f,g){return a.c.template.update(b,a.c["with"].p(c),d,f,g)}};a.g.D["with"]=t;a.e.C["with"]=p;a.c["if"]={p:function(b){return function(){return{"if":b(),templateEngine:a.q.K}}},init:function(b,c){return a.c.template.init(b,a.c["if"].p(c))},update:function(b,c,d,f,g){return a.c.template.update(b,a.c["if"].p(c),d,f,g)}};a.g.D["if"]=t;a.e.C["if"]=p;a.c.ifnot={p:function(b){return function(){return{ifnot:b(),templateEngine:a.q.K}}},
init:function(b,c){return a.c.template.init(b,a.c.ifnot.p(c))},update:function(b,c,d,f,g){return a.c.template.update(b,a.c.ifnot.p(c),d,f,g)}};a.g.D.ifnot=t;a.e.C.ifnot=p;a.c.foreach={p:function(b){return function(){var c=a.a.d(b());return!c||"number"==typeof c.length?{foreach:c,templateEngine:a.q.K}:{foreach:c.data,includeDestroyed:c.includeDestroyed,afterAdd:c.afterAdd,beforeRemove:c.beforeRemove,afterRender:c.afterRender,templateEngine:a.q.K}}},init:function(b,c){return a.c.template.init(b,a.c.foreach.p(c))},
update:function(b,c,d,f,g){return a.c.template.update(b,a.c.foreach.p(c),d,f,g)}};a.g.D.foreach=t;a.e.C.foreach=p;a.t=function(){};a.t.prototype.renderTemplateSource=function(){m(Error("Override renderTemplateSource"))};a.t.prototype.createJavaScriptEvaluatorBlock=function(){m(Error("Override createJavaScriptEvaluatorBlock"))};a.t.prototype.makeTemplateSource=function(b,c){if("string"==typeof b){var c=c||document,d=c.getElementById(b);d||m(Error("Cannot find template with ID "+b));return new a.l.i(d)}if(1==
b.nodeType||8==b.nodeType)return new a.l.M(b);m(Error("Unknown template type: "+b))};a.t.prototype.renderTemplate=function(a,c,d,f){return this.renderTemplateSource(this.makeTemplateSource(a,f),c,d)};a.t.prototype.isTemplateRewritten=function(a,c){return this.allowTemplateRewriting===t||!(c&&c!=document)&&this.V&&this.V[a]?p:this.makeTemplateSource(a,c).data("isRewritten")};a.t.prototype.rewriteTemplate=function(a,c,d){var f=this.makeTemplateSource(a,d),c=c(f.text());f.text(c);f.data("isRewritten",
p);!(d&&d!=document)&&"string"==typeof a&&(this.V=this.V||{},this.V[a]=p)};a.b("templateEngine",a.t);a.Z=function(){function b(b,c,e){for(var b=a.g.W(b),d=a.g.D,j=0;j<b.length;j++){var k=b[j].key;if(d.hasOwnProperty(k)){var i=d[k];"function"===typeof i?(k=i(b[j].value))&&m(Error(k)):i||m(Error("This template engine does not support the '"+k+"' binding within its templates"))}}b="ko.templateRewriting.applyMemoizedBindingsToNextSibling(function() {             return (function() { return { "+a.g.ka(b)+
" } })()         })";return e.createJavaScriptEvaluatorBlock(b)+c}var c=/(<[a-z]+\d*(\s+(?!data-bind=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind=(["'])([\s\S]*?)\5/gi,d=/<\!--\s*ko\b\s*([\s\S]*?)\s*--\>/g;return{mb:function(b,c,e){c.isTemplateRewritten(b,e)||c.rewriteTemplate(b,function(b){return a.Z.zb(b,c)},e)},zb:function(a,g){return a.replace(c,function(a,c,d,f,i,l,q){return b(q,c,g)}).replace(d,function(a,c){return b(c,"<\!-- ko --\>",g)})},Za:function(b){return a.s.na(function(c,
e){c.nextSibling&&a.ya(c.nextSibling,b,e)})}}}();a.b("templateRewriting",a.Z);a.b("templateRewriting.applyMemoizedBindingsToNextSibling",a.Z.Za);(function(){a.l={};a.l.i=function(a){this.i=a};a.l.i.prototype.text=function(){var b=a.a.o(this.i),b="script"===b?"text":"textarea"===b?"value":"innerHTML";if(0==arguments.length)return this.i[b];var c=arguments[0];"innerHTML"===b?a.a.Y(this.i,c):this.i[b]=c};a.l.i.prototype.data=function(b){if(1===arguments.length)return a.a.f.get(this.i,"templateSourceData_"+
b);a.a.f.set(this.i,"templateSourceData_"+b,arguments[1])};a.l.M=function(a){this.i=a};a.l.M.prototype=new a.l.i;a.l.M.prototype.text=function(){if(0==arguments.length){var b=a.a.f.get(this.i,"__ko_anon_template__")||{};b.ua===n&&b.da&&(b.ua=b.da.innerHTML);return b.ua}a.a.f.set(this.i,"__ko_anon_template__",{ua:arguments[0]})};a.l.i.prototype.nodes=function(){if(0==arguments.length)return(a.a.f.get(this.i,"__ko_anon_template__")||{}).da;a.a.f.set(this.i,"__ko_anon_template__",{da:arguments[0]})};
a.b("templateSources",a.l);a.b("templateSources.domElement",a.l.i);a.b("templateSources.anonymousTemplate",a.l.M)})();(function(){function b(b,c,d){for(var f,c=a.e.nextSibling(c);b&&(f=b)!==c;)b=a.e.nextSibling(f),(1===f.nodeType||8===f.nodeType)&&d(f)}function c(c,d){if(c.length){var f=c[0],g=c[c.length-1];b(f,g,function(b){a.xa(d,b)});b(f,g,function(b){a.s.Wa(b,[d])})}}function d(a){return a.nodeType?a:0<a.length?a[0]:s}function f(b,f,j,k,i){var i=i||{},l=b&&d(b),l=l&&l.ownerDocument,q=i.templateEngine||
g;a.Z.mb(j,q,l);j=q.renderTemplate(j,k,i,l);("number"!=typeof j.length||0<j.length&&"number"!=typeof j[0].nodeType)&&m(Error("Template engine must return an array of DOM nodes"));l=t;switch(f){case "replaceChildren":a.e.X(b,j);l=p;break;case "replaceNode":a.a.Na(b,j);l=p;break;case "ignoreTargetNode":break;default:m(Error("Unknown renderMode: "+f))}l&&(c(j,k),i.afterRender&&i.afterRender(j,k.$data));return j}var g;a.ra=function(b){b!=n&&!(b instanceof a.t)&&m(Error("templateEngine must inherit from ko.templateEngine"));
g=b};a.qa=function(b,c,j,k,i){j=j||{};(j.templateEngine||g)==n&&m(Error("Set a template engine before calling renderTemplate"));i=i||"replaceChildren";if(k){var l=d(k);return a.h(function(){var g=c&&c instanceof a.z?c:new a.z(a.a.d(c)),o="function"==typeof b?b(g.$data):b,g=f(k,i,o,g,j);"replaceNode"==i&&(k=g,l=d(k))},s,{disposeWhen:function(){return!l||!a.a.fa(l)},disposeWhenNodeIsRemoved:l&&"replaceNode"==i?l.parentNode:l})}return a.s.na(function(d){a.qa(b,c,j,d,"replaceNode")})};a.Fb=function(b,
d,g,k,i){function l(a,b){c(b,o);g.afterRender&&g.afterRender(b,a)}function q(c,d){var h="function"==typeof b?b(c):b;o=i.createChildContext(a.a.d(c));o.$index=d;return f(s,"ignoreTargetNode",h,o,g)}var o;return a.h(function(){var b=a.a.d(d)||[];"undefined"==typeof b.length&&(b=[b]);b=a.a.aa(b,function(b){return g.includeDestroyed||b===n||b===s||!a.a.d(b._destroy)});a.a.Oa(k,b,q,g,l)},s,{disposeWhenNodeIsRemoved:k})};a.c.template={init:function(b,c){var d=a.a.d(c());if("string"!=typeof d&&!d.name&&
(1==b.nodeType||8==b.nodeType))d=1==b.nodeType?b.childNodes:a.e.childNodes(b),d=a.a.Ab(d),(new a.l.M(b)).nodes(d);return{controlsDescendantBindings:p}},update:function(b,c,d,f,g){c=a.a.d(c());f=p;"string"==typeof c?d=c:(d=c.name,"if"in c&&(f=f&&a.a.d(c["if"])),"ifnot"in c&&(f=f&&!a.a.d(c.ifnot)));var l=s;"object"===typeof c&&"foreach"in c?l=a.Fb(d||b,f&&c.foreach||[],c,b,g):f?(g="object"==typeof c&&"data"in c?g.createChildContext(a.a.d(c.data)):g,l=a.qa(d||b,g,c,b)):a.e.ha(b);g=l;(c=a.a.f.get(b,"__ko__templateSubscriptionDomDataKey__"))&&
"function"==typeof c.A&&c.A();a.a.f.set(b,"__ko__templateSubscriptionDomDataKey__",g)}};a.g.D.template=function(b){b=a.g.W(b);return 1==b.length&&b[0].unknown||a.g.wb(b,"name")?s:"This template engine does not support anonymous templates nested within its templates"};a.e.C.template=p})();a.b("setTemplateEngine",a.ra);a.b("renderTemplate",a.qa);(function(){a.a.O=function(b,c,d){if(d===n)return a.a.O(b,c,1)||a.a.O(b,c,10)||a.a.O(b,c,Number.MAX_VALUE);for(var b=b||[],c=c||[],f=b,g=c,e=[],h=0;h<=g.length;h++)e[h]=
[];for(var h=0,j=Math.min(f.length,d);h<=j;h++)e[0][h]=h;h=1;for(j=Math.min(g.length,d);h<=j;h++)e[h][0]=h;for(var j=f.length,k,i=g.length,h=1;h<=j;h++){k=Math.max(1,h-d);for(var l=Math.min(i,h+d);k<=l;k++)e[k][h]=f[h-1]===g[k-1]?e[k-1][h-1]:Math.min(e[k-1][h]===n?Number.MAX_VALUE:e[k-1][h]+1,e[k][h-1]===n?Number.MAX_VALUE:e[k][h-1]+1)}d=b.length;f=c.length;g=[];h=e[f][d];if(h===n)e=s;else{for(;0<d||0<f;){j=e[f][d];i=0<f?e[f-1][d]:h+1;l=0<d?e[f][d-1]:h+1;k=0<f&&0<d?e[f-1][d-1]:h+1;if(i===n||i<j-1)i=
h+1;if(l===n||l<j-1)l=h+1;k<j-1&&(k=h+1);i<=l&&i<k?(g.push({status:"added",value:c[f-1]}),f--):(l<i&&l<k?g.push({status:"deleted",value:b[d-1]}):(g.push({status:"retained",value:b[d-1]}),f--),d--)}e=g.reverse()}return e}})();a.b("utils.compareArrays",a.a.O);(function(){function b(a){if(2<a.length){for(var b=a[0],c=a[a.length-1],e=[b];b!==c;){b=b.nextSibling;if(!b)return;e.push(b)}Array.prototype.splice.apply(a,[0,a.length].concat(e))}}function c(c,f,g,e,h){var j=[],c=a.h(function(){var c=f(g,h)||
[];0<j.length&&(b(j),a.a.Na(j,c),e&&e(g,c));j.splice(0,j.length);a.a.N(j,c)},s,{disposeWhenNodeIsRemoved:c,disposeWhen:function(){return 0==j.length||!a.a.fa(j[0])}});return{xb:j,h:c}}a.a.Oa=function(d,f,g,e,h){for(var f=f||[],e=e||{},j=a.a.f.get(d,"setDomNodeChildrenFromArrayMapping_lastMappingResult")===n,k=a.a.f.get(d,"setDomNodeChildrenFromArrayMapping_lastMappingResult")||[],i=a.a.T(k,function(a){return a.$a}),l=a.a.O(i,f),f=[],q=0,o=[],v=0,i=[],u=s,r=0,w=l.length;r<w;r++)switch(l[r].status){case "retained":var y=
k[q];y.qb(v);v=f.push(y);0<y.P.length&&(u=y.P[y.P.length-1]);q++;break;case "deleted":k[q].h.A();b(k[q].P);a.a.v(k[q].P,function(a){o.push({element:a,index:r,value:l[r].value});u=a});q++;break;case "added":for(var y=l[r].value,x=a.m(v),v=c(d,g,y,h,x),C=v.xb,v=f.push({$a:l[r].value,P:C,h:v.h,qb:x}),z=0,B=C.length;z<B;z++){var D=C[z];i.push({element:D,index:r,value:l[r].value});u==s?a.e.Ka(d,D):a.e.Fa(d,D,u);u=D}h&&h(y,C,x)}a.a.v(o,function(b){a.F(b.element)});g=t;if(!j){if(e.afterAdd)for(r=0;r<i.length;r++)e.afterAdd(i[r].element,
i[r].index,i[r].value);if(e.beforeRemove){for(r=0;r<o.length;r++)e.beforeRemove(o[r].element,o[r].index,o[r].value);g=p}}if(!g&&o.length)for(r=0;r<o.length;r++)e=o[r].element,e.parentNode&&e.parentNode.removeChild(e);a.a.f.set(d,"setDomNodeChildrenFromArrayMapping_lastMappingResult",f)}})();a.b("utils.setDomNodeChildrenFromArrayMapping",a.a.Oa);a.q=function(){this.allowTemplateRewriting=t};a.q.prototype=new a.t;a.q.prototype.renderTemplateSource=function(b){var c=!(9>a.a.ja)&&b.nodes?b.nodes():s;
if(c)return a.a.L(c.cloneNode(p).childNodes);b=b.text();return a.a.pa(b)};a.q.K=new a.q;a.ra(a.q.K);a.b("nativeTemplateEngine",a.q);(function(){a.ma=function(){var a=this.vb=function(){if("undefined"==typeof jQuery||!jQuery.tmpl)return 0;try{if(0<=jQuery.tmpl.tag.tmpl.open.toString().indexOf("__"))return 2}catch(a){}return 1}();this.renderTemplateSource=function(b,f,g){g=g||{};2>a&&m(Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later."));var e=b.data("precompiled");
e||(e=b.text()||"",e=jQuery.template(s,"{{ko_with $item.koBindingContext}}"+e+"{{/ko_with}}"),b.data("precompiled",e));b=[f.$data];f=jQuery.extend({koBindingContext:f},g.templateOptions);f=jQuery.tmpl(e,b,f);f.appendTo(document.createElement("div"));jQuery.fragments={};return f};this.createJavaScriptEvaluatorBlock=function(a){return"{{ko_code ((function() { return "+a+" })()) }}"};this.addTemplate=function(a,b){document.write("<script type='text/html' id='"+a+"'>"+b+"<\/script>")};0<a&&(jQuery.tmpl.tag.ko_code=
{open:"__.push($1 || '');"},jQuery.tmpl.tag.ko_with={open:"with($1) {",close:"} "})};a.ma.prototype=new a.t;var b=new a.ma;0<b.vb&&a.ra(b);a.b("jqueryTmplTemplateEngine",a.ma)})()}"function"===typeof require&&"object"===typeof exports&&"object"===typeof module?E(module.exports||exports):"function"===typeof define&&define.amd?define(["exports"],E):E(window.ko={});p;
})(window,document,navigator);

; browserify_shim__define__module__export__(typeof ko != "undefined" ? ko : window.ko);

}).call(global, undefined, undefined, function defineExport(ex) { module.exports = ex; });

})(window)
},{"underscore":"GoDQOv","jquery":"1Pax6e"}],"backbone":[function(require,module,exports){
module.exports=require('/Z1EQg');
},{}],"/Z1EQg":[function(require,module,exports){
(function(global){(function browserifyShim(module, define) {

; global.$ = require("jquery");
//     Backbone.js 0.9.10

//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `exports`
  // on the server).
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to array methods.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both CommonJS and the browser.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '0.9.10';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$` variable.
  Backbone.$ = root.jQuery || root.Zepto || root.ender;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
    } else if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
    } else {
      return true;
    }
  };

  // Optimized internal dispatch function for triggering events. Tries to
  // keep the usual cases speedy (most Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length;
    switch (args.length) {
    case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx);
    return;
    case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0]);
    return;
    case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1]);
    return;
    case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1], args[2]);
    return;
    default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind one or more space separated events, or an events map,
    // to a `callback` function. Passing `"all"` will bind the callback to
    // all events fired.
    on: function(name, callback, context) {
      if (!(eventsApi(this, 'on', name, [callback, context]) && callback)) return this;
      this._events || (this._events = {});
      var list = this._events[name] || (this._events[name] = []);
      list.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind events to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!(eventsApi(this, 'once', name, [callback, context]) && callback)) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      this.on(name, once, context);
      return this;
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var list, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }

      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (list = this._events[name]) {
          events = [];
          if (callback || context) {
            for (j = 0, k = list.length; j < k; j++) {
              ev = list[j];
              if ((callback && callback !== ev.callback &&
                               callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                events.push(ev);
              }
            }
          }
          this._events[name] = events;
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // An inversion-of-control version of `on`. Tell *this* object to listen to
    // an event in another object ... keeping track of what it's listening to.
    listenTo: function(obj, name, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
      listeners[id] = obj;
      obj.on(name, typeof name === 'object' ? this : callback, this);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeners = this._listeners;
      if (!listeners) return;
      if (obj) {
        obj.off(name, typeof name === 'object' ? this : callback, this);
        if (!name && !callback) delete listeners[obj._listenerId];
      } else {
        if (typeof name === 'object') callback = this;
        for (var id in listeners) {
          listeners[id].off(name, callback, this);
        }
        this._listeners = {};
      }
      return this;
    }
  };

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Create a new model, with defined attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var defaults;
    var attrs = attributes || {};
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options && options.collection) this.collection = options.collection;
    if (options && options.parse) attrs = this.parse(attrs, options) || {};
    if (defaults = _.result(this, 'defaults')) {
      attrs = _.defaults({}, attrs, defaults);
    }
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // ----------------------------------------------------------------------

    // Set a hash of model attributes on the object, firing `"change"` unless
    // you choose to silence it.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = true;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"` unless you choose
    // to silence it. `unset` is a noop if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"` unless you choose
    // to silence it.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // ---------------------------------------------------------------------

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overriden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      options.success = function(model, resp, options) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
      };
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, success, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      // If we're not waiting and attributes exist, save acts as `set(attr).save(null, opts)`.
      if (attrs && (!options || !options.wait) && !this.set(attrs, options)) return false;

      options = _.extend({validate: true}, options);

      // Do not persist invalid models.
      if (!this._validate(attrs, options)) return false;

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      success = options.success;
      options.success = function(model, resp, options) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
      };

      // Finish configuring and sending the Ajax request.
      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(model, resp, options) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
      };

      if (this.isNew()) {
        options.success(this, null, options);
        return false;
      }

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return this.id == null;
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return !this.validate || !this.validate(this.attributes, options);
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire a general
    // `"error"` event and call the error callback, if specified.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, options || {});
      return false;
    }

  });

  // Backbone.Collection
  // -------------------

  // Provides a standard collection class for our sets of models, ordered
  // or unordered. If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this.models = [];
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      models = _.isArray(models) ? models.slice() : [models];
      options || (options = {});
      var i, l, model, attrs, existing, doSort, add, at, sort, sortAttr;
      add = [];
      at = options.at;
      sort = this.comparator && (at == null) && options.sort != false;
      sortAttr = _.isString(this.comparator) ? this.comparator : null;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        if (!(model = this._prepareModel(attrs = models[i], options))) {
          this.trigger('invalid', this, attrs, options);
          continue;
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(model)) {
          if (options.merge) {
            existing.set(attrs === model ? model.attributes : attrs, options);
            if (sort && !doSort && existing.hasChanged(sortAttr)) doSort = true;
          }
          continue;
        }

        // This is a new model, push it to the `add` list.
        add.push(model);

        // Listen to added models' events, and index models for lookup by
        // `id` and by `cid`.
        model.on('all', this._onModelEvent, this);
        this._byId[model.cid] = model;
        if (model.id != null) this._byId[model.id] = model;
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (add.length) {
        if (sort) doSort = true;
        this.length += add.length;
        if (at != null) {
          splice.apply(this.models, [at, 0].concat(add));
        } else {
          push.apply(this.models, add);
        }
      }

      // Silently sort the collection if appropriate.
      if (doSort) this.sort({silent: true});

      if (options.silent) return this;

      // Trigger `add` events.
      for (i = 0, l = add.length; i < l; i++) {
        (model = add[i]).trigger('add', model, this, options);
      }

      // Trigger `sort` if the collection was sorted.
      if (doSort) this.trigger('sort', this, options);

      return this;
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      models = _.isArray(models) ? models.slice() : [models];
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return this;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: this.length}, options));
      return model;
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: 0}, options));
      return model;
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function(begin, end) {
      return this.models.slice(begin, end);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      this._idAttr || (this._idAttr = this.model.prototype.idAttribute);
      return this._byId[obj.id || obj.cid || obj[this._idAttr] || obj];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of `filter`.
    where: function(attrs) {
      if (_.isEmpty(attrs)) return [];
      return this.filter(function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) {
        throw new Error('Cannot sort a set without a comparator');
      }
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Smartly update a collection with a change set of models, adding,
    // removing, and merging as necessary.
    update: function(models, options) {
      options = _.extend({add: true, merge: true, remove: true}, options);
      if (options.parse) models = this.parse(models, options);
      var model, i, l, existing;
      var add = [], remove = [], modelMap = {};

      // Allow a single model (or no argument) to be passed.
      if (!_.isArray(models)) models = models ? [models] : [];

      // Proxy to `add` for this case, no need to iterate...
      if (options.add && !options.remove) return this.add(models, options);

      // Determine which models to add and merge, and which to remove.
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i];
        existing = this.get(model);
        if (options.remove && existing) modelMap[existing.cid] = true;
        if ((options.add && !existing) || (options.merge && existing)) {
          add.push(model);
        }
      }
      if (options.remove) {
        for (i = 0, l = this.models.length; i < l; i++) {
          model = this.models[i];
          if (!modelMap[model.cid]) remove.push(model);
        }
      }

      // Remove models (if applicable) before we add and merge the rest.
      if (remove.length) this.remove(remove, options);
      if (add.length) this.add(add, options);
      return this;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any `add` or `remove` events. Fires `reset` when finished.
    reset: function(models, options) {
      options || (options = {});
      if (options.parse) models = this.parse(models, options);
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      options.previousModels = this.models.slice();
      this._reset();
      if (models) this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `update: true` is passed, the response
    // data will be passed through the `update` method instead of `reset`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      options.success = function(collection, resp, options) {
        var method = options.update ? 'update' : 'reset';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
      };
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp, options) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Reset all internal state. Called when the collection is reset.
    _reset: function() {
      this.length = 0;
      this.models.length = 0;
      this._byId  = {};
    },

    // Prepare a model or hash of attributes to be added to this collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options || (options = {});
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model._validate(attrs, options)) return false;
      return model;
    },

    // Internal method to remove a model's ties to a collection.
    _removeReference: function(model) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    },

    sortedIndex: function (model, value, context) {
      value || (value = this.comparator);
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _.sortedIndex(this.models, model, iterator, context);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'indexOf', 'shuffle', 'lastIndexOf',
    'isEmpty', 'chain'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (!callback) callback = this[name];
      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        callback && callback.apply(this, args);
        this.trigger.apply(this, ['route:' + name].concat(args));
        this.trigger('route', name, args);
        Backbone.history.trigger('route', this, name, args);
      }, this));
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional){
                     return optional ? match : '([^\/]+)';
                   })
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted parameters.
    _extractParameters: function(route, fragment) {
      return route.exec(fragment).slice(1);
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on URL fragments. If the
  // browser does not support `onhashchange`, falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = this.location.pathname;
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.substr(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({}, {root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;
      var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

      // If we've started off with a route from a `pushState`-enabled browser,
      // but we're currently in a browser that doesn't support it...
      if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        this.location.replace(this.root + this.location.search + '#' + this.fragment);
        // Return immediately as browser will do redirect to new url
        return true;

      // Or if we've started out with a hash-based route, but we're currently
      // in a browser where it could be `pushState`-based instead...
      } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = this.getHash().replace(routeStripper, '');
        this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(this.getHash());
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragmentOverride) {
      var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
      return matched;
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: options};
      fragment = this.getFragment(fragment || '');
      if (this.fragment === fragment) return;
      this.fragment = fragment;
      var url = this.root + fragment;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Backbone.View
  // -------------

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be prefered to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) throw new Error('Method "' + events[key] + '" does not exist');
        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(model, collection, id, className)*, are
    // attached directly to the view.
    _configure: function(options) {
      if (this.options) options = _.extend({}, _.result(this, 'options'), options);
      _.extend(this, _.pick(options, viewOptions));
      this.options = options;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    var success = options.success;
    options.success = function(resp) {
      if (success) success(model, resp, options);
      model.trigger('sync', model, resp, options);
    };

    var error = options.error;
    options.error = function(xhr) {
      if (error) error(model, xhr, options);
      model.trigger('error', model, xhr, options);
    };

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

}).call(this);
}).call(global, module, undefined);

})(window)
},{"jquery":"1Pax6e","underscore":"GoDQOv"}],"backbone.babysitter":[function(require,module,exports){
module.exports=require('3OrQgd');
},{}],"3OrQgd":[function(require,module,exports){
(function(global){(function browserifyShim(module, define) {
// Backbone.BabySitter, v0.0.4
// Copyright (c)2012 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
// http://github.com/marionettejs/backbone.babysitter
(function (root, factory) {
  if (typeof exports === 'object') {

    var underscore = require('underscore');
    var backbone = require('backbone');

    module.exports = factory(underscore, backbone);

  } else if (typeof define === 'function' && define.amd) {

    define(['underscore', 'backbone'], factory);

  } 
}(this, function (_, Backbone) {
  "option strict";

  // Backbone.ChildViewContainer
  // ---------------------------
  //
  // Provide a container to store, retrieve and
  // shut down child views.
  
  Backbone.ChildViewContainer = (function(Backbone, _){
    
    // Container Constructor
    // ---------------------
  
    var Container = function(initialViews){
      this._views = {};
      this._indexByModel = {};
      this._indexByCollection = {};
      this._indexByCustom = {};
      this._updateLength();
  
      this._addInitialViews(initialViews);
    };
  
    // Container Methods
    // -----------------
  
    _.extend(Container.prototype, {
  
      // Add a view to this container. Stores the view
      // by `cid` and makes it searchable by the model
      // and/or collection of the view. Optionally specify
      // a custom key to store an retrieve the view.
      add: function(view, customIndex){
        var viewCid = view.cid;
  
        // store the view
        this._views[viewCid] = view;
  
        // index it by model
        if (view.model){
          this._indexByModel[view.model.cid] = viewCid;
        }
  
        // index it by collection
        if (view.collection){
          this._indexByCollection[view.collection.cid] = viewCid;
        }
  
        // index by custom
        if (customIndex){
          this._indexByCustom[customIndex] = viewCid;
        }
  
        this._updateLength();
      },
  
      // Find a view by the model that was attached to
      // it. Uses the model's `cid` to find it, and
      // retrieves the view by it's `cid` from the result
      findByModel: function(model){
        var viewCid = this._indexByModel[model.cid];
        return this.findByCid(viewCid);
      },
  
      // Find a view by the collection that was attached to
      // it. Uses the collection's `cid` to find it, and
      // retrieves the view by it's `cid` from the result
      findByCollection: function(col){
        var viewCid = this._indexByCollection[col.cid];
        return this.findByCid(viewCid);
      },
  
      // Find a view by a custom indexer.
      findByCustom: function(index){
        var viewCid = this._indexByCustom[index];
        return this.findByCid(viewCid);
      },
  
      // Find by index. This is not guaranteed to be a
      // stable index.
      findByIndex: function(index){
        return _.values(this._views)[index];
      },
  
      // retrieve a view by it's `cid` directly
      findByCid: function(cid){
        return this._views[cid];
      },
  
      // Remove a view
      remove: function(view){
        var viewCid = view.cid;
  
        // delete model index
        if (view.model){
          delete this._indexByModel[view.model.cid];
        }
  
        // delete collection index
        if (view.collection){
          delete this._indexByCollection[view.collection.cid];
        }
  
        // delete custom index
        var cust;
  
        for (var key in this._indexByCustom){
          if (this._indexByCustom.hasOwnProperty(key)){
            if (this._indexByCustom[key] === viewCid){
              cust = key;
              break;
            }
          }
        }
  
        if (cust){
          delete this._indexByCustom[cust];
        }
  
        // remove the view from the container
        delete this._views[viewCid];
  
        // update the length
        this._updateLength();
      },
  
      // Call a method on every view in the container,
      // passing parameters to the call method one at a
      // time, like `function.call`.
      call: function(method, args){
        args = Array.prototype.slice.call(arguments, 1);
        this.apply(method, args);
      },
  
      // Apply a method on every view in the container,
      // passing parameters to the call method one at a
      // time, like `function.apply`.
      apply: function(method, args){
        var view;
  
        // fix for IE < 9
        args = args || [];
  
        _.each(this._views, function(view, key){
          if (_.isFunction(view[method])){
            view[method].apply(view, args);
          }
        });
  
      },
  
      // Update the `.length` attribute on this container
      _updateLength: function(){
        this.length = _.size(this._views);
      },
  
      // set up an initial list of views
      _addInitialViews: function(views){
        if (!views){ return; }
  
        var view, i,
            length = views.length;
  
        for (i=0; i<length; i++){
          view = views[i];
          this.add(view);
        }
      }
    });
  
    // Borrowing this code from Backbone.Collection:
    // http://backbonejs.org/docs/backbone.html#section-106
    //
    // Mix in methods from Underscore, for iteration, and other
    // collection related features.
    var methods = ['forEach', 'each', 'map', 'find', 'detect', 'filter', 
      'select', 'reject', 'every', 'all', 'some', 'any', 'include', 
      'contains', 'invoke', 'toArray', 'first', 'initial', 'rest', 
      'last', 'without', 'isEmpty', 'pluck'];
  
    _.each(methods, function(method) {
      Container.prototype[method] = function() {
        var views = _.values(this._views);
        var args = [views].concat(_.toArray(arguments));
        return _[method].apply(_, args);
      };
    });
  
    // return the public API
    return Container;
  })(Backbone, _);
  
  return Backbone.ChildViewContainer; 

}));

}).call(global, module, undefined);

})(window)
},{"underscore":"GoDQOv","backbone":"/Z1EQg"}],"backbone.eventbinder":[function(require,module,exports){
module.exports=require('bUMRi9');
},{}],"bUMRi9":[function(require,module,exports){
(function(global){(function browserifyShim(module, define) {
// Backbone.EventBinder, v1.0.2
// Copyright (c)2012 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
// http://github.com/marionettejs/backbone.eventbinder
(function (root, factory) {
  if (typeof exports === 'object') {

    var underscore = require('underscore');
    var backbone = require('backbone');

    module.exports = factory(underscore, backbone);

  } else if (typeof define === 'function' && define.amd) {

    define(['underscore', 'backbone'], factory);

  } 
}(this, function (_, Backbone) {
  "option strict";

  // EventBinder
  // -----------
  //
  // The event binder facilitates the binding and unbinding of events
  // from objects that extend `Backbone.Events`. It makes
  // unbinding events, even with anonymous callback functions,
  // easy. 
  //
  // Inspired by [Johnny Oshika](http://stackoverflow.com/questions/7567404/backbone-js-repopulate-or-recreate-the-view/7607853#7607853)
  
  Backbone.EventBinder = (function(Backbone, _){
    "use strict";
  
    // A map of objects that support binding/unbinding events.
    // This allows EventBinder to support events on arbitrary
    // objects with EB's consistent api.
    var handlerMap = {
      // 'default' type accounts for Backbone style objects extending
      // Backbone.Events
      "default" : {
        bindTo : function (obj, eventName, callback, context) {
          context = context || this;
          obj.on(eventName, callback, context);
  
          var binding = {
            type : 'default',
            obj: obj,
            eventName: eventName,
            callback: callback,
            context: context
          };
  
          return binding;
        },
        unbindFrom : function(binding){
          binding.obj.off(binding.eventName, binding.callback, binding.context);
        }
      },
  
      // 'jquery' style handlers allow us to bind to jQuery
      // (or compatible) objects
      jquery : {
        bindTo : function (obj, eventName, callback, context) {
          context = context || this;
          callback = _(callback).bind(context);
          obj.on(eventName, callback);
  
          var binding = {
            type : 'jquery',
            obj: obj,
            eventName: eventName,
            callback: callback,
            context: context
          };
  
          return binding;
        },
        unbindFrom : function(binding){
          binding.obj.off(binding.eventName, binding.callback);
        }
      }
    };
  
    // Use whatever best logic necessary to determine the type
    // of the supplied object
    function getHandlerForObject(obj) {
      if (_.isUndefined(obj) || _.isNull(obj)) {
        throw new Error("Can't bindTo undefined");
      }
  
      if (obj.jquery) { return handlerMap.jquery; }
  
      return handlerMap["default"];
    }
    
    // Constructor function
    var EventBinder = function(){
      this._eventBindings = [];
    };
  
    // Copy the `extend` function used by Backbone's classes
    EventBinder.extend = Backbone.View.extend;
  
    // Extend the EventBinder with additional methods
    _.extend(EventBinder.prototype, {
  
      // Delegate to the bindTo for the appropriate type and
      // store the event binding in array so it can be unbound
      // easily, at a later point in time.
      bindTo: function(/* args... */) {
        var obj = arguments[0];
        var handlers = getHandlerForObject(obj);
  
        var args = Array.prototype.slice.apply(arguments);
        var binding = handlers.bindTo.apply(this, args);
  
        this._eventBindings.push(binding);
  
        return binding;
      },
  
      // Unbind from a single binding object. Binding objects are
      // returned from the `bindTo` method call. 
      unbindFrom: function(binding) {
        var args = Array.prototype.slice.apply(arguments);
        handlerMap[binding.type].unbindFrom.apply(this, args);
  
        this._eventBindings = _.reject(this._eventBindings, function(bind){return bind === binding;});
      },
  
      // Unbind all of the events that we have stored.
      unbindAll: function() {
        // The `unbindFrom` call removes elements from the array
        // while it is being iterated, so clone it first.
        var bindings = _.map(this._eventBindings, _.identity);
        _.each(bindings, this.unbindFrom, this);
      }
    });
  
    return EventBinder;
  })(Backbone, _);
  
  return Backbone.EventBinder; 

}));

}).call(global, module, undefined);

})(window)
},{"underscore":"GoDQOv","backbone":"/Z1EQg"}],"backbone.wreqr":[function(require,module,exports){
module.exports=require('3AWBL+');
},{}],"3AWBL+":[function(require,module,exports){
(function(global){(function browserifyShim(module, define) {
// Backbone.Wreqr, v0.0.0
// Copyright (c)2012 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
// http://github.com/marionettejs/backbone.wreqr
(function (root, factory) {
  if (typeof exports === 'object') {

    var underscore = require('underscore');
    var backbone = require('backbone');

    module.exports = factory(underscore, backbone);

  } else if (typeof define === 'function' && define.amd) {

    define(['underscore', 'backbone'], factory);

  } 
}(this, function (_, Backbone) {
  "option strict";

  Backbone.Wreqr = (function(Backbone, Marionette, _){
    "option strict";
    var Wreqr = {};
  
    Wreqr.Handlers = (function(Backbone, _){
      "option strict";
      
      var Handlers = function(){
        "use strict";
        this._handlers = {};
      };
    
      Handlers.extend = Backbone.Model.extend;
    
      _.extend(Handlers.prototype, {
        addHandler: function(name, handler, context){
          var config = {
            callback: handler,
            context: context
          };
    
          this._handlers[name] = config;
        },
    
        getHandler: function(name){
          var config = this._handlers[name];
    
          if (!config){
            throw new Error("Handler not found for '" + name + "'");
          }
    
          return function(){
            return config.callback.apply(config.context, arguments);
          };
        },
    
        removeHandler: function(name){
          delete this._handlers[name];
        },
    
        removeAllHandlers: function(){
          this._handlers = {};
        }
      });
    
      return Handlers;
    })(Backbone, _);
    
    // Wreqr.Commands
    // --------------
    //
    // A simple command pattern implementation. Register a command
    // handler and execute it.
    Wreqr.Commands = (function(Wreqr){
      "option strict";
    
      return Wreqr.Handlers.extend({
        execute: function(name, args){
          this.getHandler(name)(args);
        }
      });
    
    })(Wreqr);
    
    // Wreqr.RequestResponse
    // ---------------------
    //
    // A simple request/response implementation. Register a
    // request handler, and return a response from it
    Wreqr.RequestResponse = (function(Wreqr){
      "option strict";
    
      return Wreqr.Handlers.extend({
        request: function(name, args){
          return this.getHandler(name)(args);
        }
      });
    
    })(Wreqr);
    
    // Event Aggregator
    // ----------------
    // A pub-sub object that can be used to decouple various parts
    // of an application through event-driven architecture.
    
    Wreqr.EventAggregator = (function(Backbone, _){
      "option strict";
      var EA = function(){};
    
      // Copy the `extend` function used by Backbone's classes
      EA.extend = Backbone.Model.extend;
    
      // Copy the basic Backbone.Events on to the event aggregator
      _.extend(EA.prototype, Backbone.Events);
    
      return EA;
    })(Backbone, _);
    
  
    return Wreqr;
  })(Backbone, Backbone.Marionette, _);
  
  return Backbone.Wreqr; 

}));

}).call(global, module, undefined);

})(window)
},{"underscore":"GoDQOv","backbone":"/Z1EQg"}],"backbone.marionette":[function(require,module,exports){
module.exports=require('WHZV4H');
},{}],"WHZV4H":[function(require,module,exports){
(function(global){(function browserifyShim(module, define) {

; global._ = require("underscore");
 // Backbone.Marionette, v1.0.0-rc2
 // Copyright (c)2012 Derick Bailey, Muted Solutions, LLC.
 // Distributed under MIT license
 // http://github.com/marionettejs/backbone.marionette

(function (root, factory) {
  if (typeof exports === 'object') {

    var jquery = require('jquery');
    var underscore = require('underscore');
    var backbone = require('backbone');
    var eventBinder = require('backbone.eventbinder');
    var wreqr = require('backbone.wreqr');
    var babysitter = require('backbone.babysitter');

    module.exports = factory(jquery, underscore, backbone, eventBinder, wreqr, babysitter);

  } else if (typeof define === 'function' && define.amd) {

    define(['jquery', 'underscore', 'backbone', 'backbone.wreqr', 'backbone.eventbinder', 'backbone.babysitter'], factory);

  } 
}(this, function ($, _, Backbone) {

  Backbone.Marionette = Marionette = (function(Backbone, _, $){
    var Marionette = {};
  
  // Helpers
  // -------
  
  // For slicing `arguments` in functions
  var slice = Array.prototype.slice;
  
  // Marionette.extend
  // -----------------
  
  // Borrow the Backbone `extend` method so we can use it as needed
  Marionette.extend = Backbone.Model.extend;
  
  // Marionette.getOption
  // --------------------
  
  // Retrieve an object, function or other value from a target
  // object or it's `options`, with `options` taking precedence.
  Marionette.getOption = function(target, optionName){
    if (!target || !optionName){ return; }
    var value;
  
    if (target.options && target.options[optionName]){
      value = target.options[optionName];
    } else {
      value = target[optionName];
    }
  
    return value;
  };
  
  // Mairionette.createObject
  // ------------------------
  
  // A wrapper / shim for `Object.create`. Uses native `Object.create`
  // if available, otherwise shims it in place for Marionette to use.
  Marionette.createObject = (function(){
    var createObject;
    
    // Define this once, and just replace the .prototype on it as needed,
    // to improve performance in older / less optimized JS engines
    function F() {}
  
  
    // Check for existing native / shimmed Object.create
    if (typeof Object.create === "function"){
  
      // found native/shim, so use it
      createObject = Object.create;
  
    } else {
  
      // An implementation of the Boodman/Crockford delegation 
      // w/ Cornford optimization, as suggested by @unscriptable
      // https://gist.github.com/3959151
  
      // native/shim not found, so shim it ourself
      createObject = function (o) {
  
        // set the prototype of the function
        // so we will get `o` as the prototype
        // of the new object instance
        F.prototype = o;
  
        // create a new object that inherits from
        // the `o` parameter
        var child = new F();
        
        // clean up just in case o is really large
        F.prototype = null; 
  
        // send it back
        return child;
      };
  
    }
  
    return createObject;
  })();
  
  // Trigger an event and a corresponding method name. Examples:
  //
  // `this.triggerMethod("foo")` will trigger the "foo" event and
  // call the "onFoo" method. 
  //
  // `this.triggerMethod("foo:bar") will trigger the "foo:bar" event and
  // call the "onFooBar" method.
  Marionette.triggerMethod = function(){
    var args = Array.prototype.slice.apply(arguments);
    var eventName = args[0];
    var segments = eventName.split(":");
    var segment, capLetter, methodName = "on";
  
    for (var i = 0; i < segments.length; i++){
      segment = segments[i];
      capLetter = segment.charAt(0).toUpperCase();
      methodName += capLetter + segment.slice(1);
    }
  
    this.trigger.apply(this, args);
  
    if (_.isFunction(this[methodName])){
      args.shift();
      return this[methodName].apply(this, args);
    }
  };
  
  // DOMRefresh
  // ----------
  //
  // Monitor a view's state, and after it has been rendered and shown
  // in the DOM, trigger a "dom:refresh" event every time it is
  // re-rendered.
  
  Marionette.MonitorDOMRefresh = (function(){
    // track when the view has been rendered
    function handleShow(view){
      view._isShown = true;
      triggerDOMRefresh(view);
    }
  
    // track when the view has been shown in the DOM,
    // using a Marionette.Region (or by other means of triggering "show")
    function handleRender(view){
      view._isRendered = true;
      triggerDOMRefresh(view);
    }
  
    // Trigger the "dom:refresh" event and corresponding "onDomRefresh" method
    function triggerDOMRefresh(view){
      if (view._isShown && view._isRendered){
        if (_.isFunction(view.triggerMethod)){
          view.triggerMethod("dom:refresh");
        }
      }
    }
  
    // Export public API
    return function(view){
      view.bindTo(view, "show", function(){
        handleShow(view);
      });
  
      view.bindTo(view, "render", function(){
        handleRender(view);
      });
    };
  })();
  
  
  // EventBinder
  // -----------
  // Import the event binder from it's new home
  // https://github.com/marionettejs/backbone.eventbinder
  Marionette.EventBinder = Backbone.EventBinder.extend();
  
  // Add the EventBinder methods to the view directly,
  // but keep them bound to the EventBinder instance so they work properly.
  // This allows the event binder's implementation to vary independently
  // of it being attached to the view... for example the internal structure
  // used to store the events can change without worry about it interfering
  // with Marionette's views.
  Marionette.addEventBinder = function(target){
    var eventBinder = new Marionette.EventBinder();
    target.eventBinder = eventBinder;
  
    target.bindTo = function(source, event, callback, context){
      // check the context of the bindTo and set it to the object
      // that is having the eventBinder attached to it, if no context
      // has been specified in the .bindTo call
      context = context || target;
      eventBinder.bindTo(source, event, callback, context);
    };
  
    target.unbindFrom = _.bind(eventBinder.unbindFrom, eventBinder);
    target.unbindAll = _.bind(eventBinder.unbindAll, eventBinder);
  };
  
  // Event Aggregator
  // ----------------
  // A pub-sub object that can be used to decouple various parts
  // of an application through event-driven architecture.
  //
  // Extends [Backbone.Wreqr.EventAggregator](https://github.com/marionettejs/backbone.wreqr)
  // and mixes in an EventBinder from [Backbone.EventBinder](https://github.com/marionettejs/backbone.eventbinder).
  Marionette.EventAggregator = Backbone.Wreqr.EventAggregator.extend({
  
    constructor: function(){
      Marionette.addEventBinder(this);
  
      var args = Array.prototype.slice.apply(arguments);
      Backbone.Wreqr.EventAggregator.prototype.constructor.apply(this, args);
    }
  
  });
  
  // Marionette.bindEntityEvents
  // ---------------------------
  //
  // This method is used to bind a backbone "entity" (collection/model) 
  // to methods on a target object. 
  //
  // The first paremter, `target`, must have a `bindTo` method from the
  // EventBinder object.
  //
  // The second parameter is the entity (Backbone.Model or Backbone.Collection)
  // to bind the events from.
  //
  // The third parameter is a hash of { "event:name": "eventHandler" }
  // configuration. Multiple handlers can be separated by a space. A
  // function can be supplied instead of a string handler name. 
  Marionette.bindEntityEvents = (function(){
  
    // Bind the event to handlers specified as a string of
    // handler names on the target object
    function bindFromStrings(target, entity, evt, methods){
      var methodNames = methods.split(/\s+/);
  
      _.each(methodNames,function(methodName) {
  
        var method = target[methodName];
        if(!method) {
          throw new Error("Method '"+ methodName +"' was configured as an event handler, but does not exist.");
        }
  
        target.bindTo(entity, evt, method, target);
      });
    }
  
    // Bind the event to a supplied callback function
    function bindToFunction(target, entity, evt, method){
        target.bindTo(entity, evt, method, target);
    }
  
    // Export the bindEntityEvents method
    return function(target, entity, bindings){
      if (!entity || !bindings) { return; }
  
      _.each(bindings, function(methods, evt){
  
        // allow for a function as the handler, 
        // or a list of event names as a string
        if (_.isFunction(methods)){
          bindToFunction(target, entity, evt, methods);
        } else {
          bindFromStrings(target, entity, evt, methods);
        }
  
      });
    };
  })();
  
    
  // Callbacks
  // ---------
  
  // A simple way of managing a collection of callbacks
  // and executing them at a later point in time, using jQuery's
  // `Deferred` object.
  Marionette.Callbacks = function(){
    this._deferred = $.Deferred();
    this._callbacks = [];
  };
  
  _.extend(Marionette.Callbacks.prototype, {
  
    // Add a callback to be executed. Callbacks added here are
    // guaranteed to execute, even if they are added after the 
    // `run` method is called.
    add: function(callback, contextOverride){
      this._callbacks.push({cb: callback, ctx: contextOverride});
  
      this._deferred.done(function(context, options){
        if (contextOverride){ context = contextOverride; }
        callback.call(context, options);
      });
    },
  
    // Run all registered callbacks with the context specified. 
    // Additional callbacks can be added after this has been run 
    // and they will still be executed.
    run: function(options, context){
      this._deferred.resolve(context, options);
    },
  
    // Resets the list of callbacks to be run, allowing the same list
    // to be run multiple times - whenever the `run` method is called.
    reset: function(){
      var that = this;
      var callbacks = this._callbacks;
      this._deferred = $.Deferred();
      this._callbacks = [];
      _.each(callbacks, function(cb){
        that.add(cb.cb, cb.ctx);
      });
    }
  });
  
  
  // Marionette Controller
  // ---------------------
  //
  // A multi-purpose object to use as a controller for
  // modules and routers, and as a mediator for workflow
  // and coordination of other objects, views, and more.
  Marionette.Controller = function(options){
    this.triggerMethod = Marionette.triggerMethod;
    this.options = options || {};
  
    Marionette.addEventBinder(this);
  
    if (_.isFunction(this.initialize)){
      this.initialize(this.options);
    }
  };
  
  Marionette.Controller.extend = Marionette.extend;
  
  // Controller Methods
  // --------------
  
  // Ensure it can trigger events with Backbone.Events
  _.extend(Marionette.Controller.prototype, Backbone.Events, {
    close: function(){
      this.unbindAll();
      this.triggerMethod("close");
      this.unbind();
    }
  });
  
  // Region 
  // ------
  //
  // Manage the visual regions of your composite application. See
  // http://lostechies.com/derickbailey/2011/12/12/composite-js-apps-regions-and-region-managers/
  
  Marionette.Region = function(options){
    this.options = options || {};
  
    Marionette.addEventBinder(this);
  
    this.el = Marionette.getOption(this, "el");
  
    if (!this.el){
      var err = new Error("An 'el' must be specified for a region.");
      err.name = "NoElError";
      throw err;
    }
  
    if (this.initialize){
      var args = Array.prototype.slice.apply(arguments);
      this.initialize.apply(this, args);
    }
  };
  
  
  // Region Type methods
  // -------------------
  
  _.extend(Marionette.Region, {
  
    // Build an instance of a region by passing in a configuration object
    // and a default region type to use if none is specified in the config.
    //
    // The config object should either be a string as a jQuery DOM selector,
    // a Region type directly, or an object literal that specifies both
    // a selector and regionType:
    //
    // ```js
    // {
    //   selector: "#foo",
    //   regionType: MyCustomRegion
    // }
    // ```
    //
    buildRegion: function(regionConfig, defaultRegionType){
      var regionIsString = (typeof regionConfig === "string");
      var regionSelectorIsString = (typeof regionConfig.selector === "string");
      var regionTypeIsUndefined = (typeof regionConfig.regionType === "undefined");
      var regionIsType = (typeof regionConfig === "function");
  
      if (!regionIsType && !regionIsString && !regionSelectorIsString) {
        throw new Error("Region must be specified as a Region type, a selector string or an object with selector property");
      }
  
      var selector, RegionType;
     
      // get the selector for the region
      
      if (regionIsString) {
        selector = regionConfig;
      } 
  
      if (regionConfig.selector) {
        selector = regionConfig.selector;
      }
  
      // get the type for the region
      
      if (regionIsType){
        RegionType = regionConfig;
      }
  
      if (!regionIsType && regionTypeIsUndefined) {
        RegionType = defaultRegionType;
      }
  
      if (regionConfig.regionType) {
        RegionType = regionConfig.regionType;
      }
      
      // build the region instance
  
      var regionManager = new RegionType({
        el: selector
      });
  
      return regionManager;
    }
  
  });
  
  // Region Instance Methods
  // -----------------------
  
  _.extend(Marionette.Region.prototype, Backbone.Events, {
  
    // Displays a backbone view instance inside of the region.
    // Handles calling the `render` method for you. Reads content
    // directly from the `el` attribute. Also calls an optional
    // `onShow` and `close` method on your view, just after showing
    // or just before closing the view, respectively.
    show: function(view){
  
      this.ensureEl();
      this.close();
  
      view.render();
      this.open(view);
  
      Marionette.triggerMethod.call(view, "show");
      Marionette.triggerMethod.call(this, "show", view);
  
      this.currentView = view;
    },
  
    ensureEl: function(){
      if (!this.$el || this.$el.length === 0){
        this.$el = this.getEl(this.el);
      }
    },
  
    // Override this method to change how the region finds the
    // DOM element that it manages. Return a jQuery selector object.
    getEl: function(selector){
      return $(selector);
    },
  
    // Override this method to change how the new view is
    // appended to the `$el` that the region is managing
    open: function(view){
      this.$el.empty().append(view.el);
    },
  
    // Close the current view, if there is one. If there is no
    // current view, it does nothing and returns immediately.
    close: function(){
      var view = this.currentView;
      if (!view || view.isClosed){ return; }
  
      if (view.close) { view.close(); }
      Marionette.triggerMethod.call(this, "close");
  
      delete this.currentView;
    },
  
    // Attach an existing view to the region. This 
    // will not call `render` or `onShow` for the new view, 
    // and will not replace the current HTML for the `el`
    // of the region.
    attachView: function(view){
      this.currentView = view;
    },
  
    // Reset the region by closing any existing view and
    // clearing out the cached `$el`. The next time a view
    // is shown via this region, the region will re-query the
    // DOM for the region's `el`.
    reset: function(){
      this.close();
      delete this.$el;
    }
  });
  
  // Copy the `extend` function used by Backbone's classes
  Marionette.Region.extend = Marionette.extend;
  
  
  // Template Cache
  // --------------
  
  // Manage templates stored in `<script>` blocks,
  // caching them for faster access.
  Marionette.TemplateCache = function(templateId){
    this.templateId = templateId;
  };
  
  // TemplateCache object-level methods. Manage the template
  // caches from these method calls instead of creating 
  // your own TemplateCache instances
  _.extend(Marionette.TemplateCache, {
    templateCaches: {},
  
    // Get the specified template by id. Either
    // retrieves the cached version, or loads it
    // from the DOM.
    get: function(templateId){
      var that = this;
      var cachedTemplate = this.templateCaches[templateId];
  
      if (!cachedTemplate){
        cachedTemplate = new Marionette.TemplateCache(templateId);
        this.templateCaches[templateId] = cachedTemplate;
      }
  
      return cachedTemplate.load();
    },
  
    // Clear templates from the cache. If no arguments
    // are specified, clears all templates:
    // `clear()`
    //
    // If arguments are specified, clears each of the 
    // specified templates from the cache:
    // `clear("#t1", "#t2", "...")`
    clear: function(){
      var i;
      var args = Array.prototype.slice.apply(arguments);
      var length = args.length;
  
      if (length > 0){
        for(i=0; i<length; i++){
          delete this.templateCaches[args[i]];
        }
      } else {
        this.templateCaches = {};
      }
    }
  });
  
  // TemplateCache instance methods, allowing each
  // template cache object to manage it's own state
  // and know whether or not it has been loaded
  _.extend(Marionette.TemplateCache.prototype, {
  
    // Internal method to load the template asynchronously.
    load: function(){
      var that = this;
  
      // Guard clause to prevent loading this template more than once
      if (this.compiledTemplate){
        return this.compiledTemplate;
      }
  
      // Load the template and compile it
      var template = this.loadTemplate(this.templateId);
      this.compiledTemplate = this.compileTemplate(template);
  
      return this.compiledTemplate;
    },
  
    // Load a template from the DOM, by default. Override
    // this method to provide your own template retrieval,
    // such as asynchronous loading from a server.
    loadTemplate: function(templateId){
      var template = $(templateId).html();
  
      if (!template || template.length === 0){
        var msg = "Could not find template: '" + templateId + "'";
        var err = new Error(msg);
        err.name = "NoTemplateError";
        throw err;
      }
  
      return template;
    },
  
    // Pre-compile the template before caching it. Override
    // this method if you do not need to pre-compile a template
    // (JST / RequireJS for example) or if you want to change
    // the template engine used (Handebars, etc).
    compileTemplate: function(rawTemplate){
      return _.template(rawTemplate);
    }
  });
  
  
  // Renderer
  // --------
  
  // Render a template with data by passing in the template
  // selector and the data to render.
  Marionette.Renderer = {
  
    // Render a template with data. The `template` parameter is
    // passed to the `TemplateCache` object to retrieve the
    // template function. Override this method to provide your own
    // custom rendering and template handling for all of Marionette.
    render: function(template, data){
      var templateFunc = typeof template === 'function' ? template : Marionette.TemplateCache.get(template);
      var html = templateFunc(data);
      return html;
    }
  };
  
  
  
  // Marionette.View
  // ---------------
  
  // The core view type that other Marionette views extend from.
  Marionette.View = Backbone.View.extend({
  
    constructor: function(){
      _.bindAll(this, "render");
      Marionette.addEventBinder(this);
  
      var args = Array.prototype.slice.apply(arguments);
      Backbone.View.prototype.constructor.apply(this, args);
  
      Marionette.bindEntityEvents(this, this.model, Marionette.getOption(this, "modelEvents"));
      Marionette.bindEntityEvents(this, this.collection, Marionette.getOption(this, "collectionEvents"));
  
      Marionette.MonitorDOMRefresh(this);
      this.bindTo(this, "show", this.onShowCalled, this);
    },
  
    // import the "triggerMethod" to trigger events with corresponding
    // methods if the method exists 
    triggerMethod: Marionette.triggerMethod,
  
    // Get the template for this view
    // instance. You can set a `template` attribute in the view
    // definition or pass a `template: "whatever"` parameter in
    // to the constructor options.
    getTemplate: function(){
      return Marionette.getOption(this, "template");
    },
  
    // Mix in template helper methods. Looks for a
    // `templateHelpers` attribute, which can either be an
    // object literal, or a function that returns an object
    // literal. All methods and attributes from this object
    // are copies to the object passed in.
    mixinTemplateHelpers: function(target){
      target = target || {};
      var templateHelpers = this.templateHelpers;
      if (_.isFunction(templateHelpers)){
        templateHelpers = templateHelpers.call(this);
      }
      return _.extend(target, templateHelpers);
    },
  
    // Configure `triggers` to forward DOM events to view
    // events. `triggers: {"click .foo": "do:foo"}`
    configureTriggers: function(){
      if (!this.triggers) { return; }
  
      var that = this;
      var triggerEvents = {};
  
      // Allow `triggers` to be configured as a function
      var triggers = _.result(this, "triggers");
  
      // Configure the triggers, prevent default
      // action and stop propagation of DOM events
      _.each(triggers, function(value, key){
  
        triggerEvents[key] = function(e){
          if (e && e.preventDefault){ e.preventDefault(); }
          if (e && e.stopPropagation){ e.stopPropagation(); }
          that.trigger(value);
        };
  
      });
  
      return triggerEvents;
    },
  
    // Overriding Backbone.View's delegateEvents specifically
    // to handle the `triggers` configuration
    delegateEvents: function(events){
      events = events || this.events;
      if (_.isFunction(events)){ events = events.call(this); }
  
      var combinedEvents = {};
      var triggers = this.configureTriggers();
      _.extend(combinedEvents, events, triggers);
  
      Backbone.View.prototype.delegateEvents.call(this, combinedEvents);
    },
  
    // Internal method, handles the `show` event.
    onShowCalled: function(){},
  
    // Default `close` implementation, for removing a view from the
    // DOM and unbinding it. Regions will call this method
    // for you. You can specify an `onClose` method in your view to
    // add custom code that is called after the view is closed.
    close: function(){
      if (this.isClosed) { return; }
  
      // allow the close to be stopped by returning `false`
      // from the `onBeforeClose` method
      var shouldClose = this.triggerMethod("before:close");
      if (shouldClose === false){
        return;
      }
  
      // mark as closed before doing the actual close, to
      // prevent infinite loops within "close" event handlers
      // that are trying to close other views
      this.isClosed = true;
  
      this.remove();
      this.triggerMethod("close");
      this.unbindAll();
    },
  
    // This method binds the elements specified in the "ui" hash inside the view's code with
    // the associated jQuery selectors.
    bindUIElements: function(){
      if (!this.ui) { return; }
  
      var that = this;
  
      if (!this.uiBindings) {
        // We want to store the ui hash in uiBindings, since afterwards the values in the ui hash
        // will be overridden with jQuery selectors.
        this.uiBindings = this.ui;
      }
  
      // refreshing the associated selectors since they should point to the newly rendered elements.
      this.ui = {};
      _.each(_.keys(this.uiBindings), function(key) {
        var selector = that.uiBindings[key];
        that.ui[key] = that.$(selector);
      });
    }
  });
  
  // Item View
  // ---------
  
  // A single item view implementation that contains code for rendering
  // with underscore.js templates, serializing the view's model or collection,
  // and calling several methods on extended views, such as `onRender`.
  Marionette.ItemView =  Marionette.View.extend({
    constructor: function(){
      var args = Array.prototype.slice.apply(arguments);
      Marionette.View.prototype.constructor.apply(this, args);
  
      if (this.initialEvents){
        this.initialEvents();
      }
    },
  
    // Serialize the model or collection for the view. If a model is
    // found, `.toJSON()` is called. If a collection is found, `.toJSON()`
    // is also called, but is used to populate an `items` array in the
    // resulting data. If both are found, defaults to the model.
    // You can override the `serializeData` method in your own view
    // definition, to provide custom serialization for your view's data.
    serializeData: function(){
      var data = {};
  
      if (this.model) {
        data = this.model.toJSON();
      }
      else if (this.collection) {
        data = { items: this.collection.toJSON() };
      }
  
      return data;
    },
  
    // Render the view, defaulting to underscore.js templates.
    // You can override this in your view definition to provide
    // a very specific rendering for your view. In general, though,
    // you should override the `Marionette.Renderer` object to
    // change how Marionette renders views.
    render: function(){
      this.isClosed = false;
  
      this.triggerMethod("before:render", this);
      this.triggerMethod("item:before:render", this);
  
      var data = this.serializeData();
      data = this.mixinTemplateHelpers(data);
  
      var template = this.getTemplate();
      var html = Marionette.Renderer.render(template, data);
      this.$el.html(html);
      this.bindUIElements();
  
      this.triggerMethod("render", this);
      this.triggerMethod("item:rendered", this);
  
      return this;
    },
  
    // Override the default close event to add a few
    // more events that are triggered.
    close: function(){
      if (this.isClosed){ return; }
  
      this.triggerMethod('item:before:close');
  
      var args = Array.prototype.slice.apply(arguments);
      Marionette.View.prototype.close.apply(this, args);
  
      this.triggerMethod('item:closed');
    }
  });
  
  // Collection View
  // ---------------
  
  // A view that iterates over a Backbone.Collection
  // and renders an individual ItemView for each model.
  Marionette.CollectionView = Marionette.View.extend({
    // used as the prefix for item view events
    // that are forwarded through the collectionview
    itemViewEventPrefix: "itemview",
  
    // constructor
    constructor: function(options){
      this.initChildViewStorage();
      this.onShowCallbacks = new Marionette.Callbacks();
  
      var args = Array.prototype.slice.apply(arguments);
      Marionette.View.prototype.constructor.apply(this, args);
  
      this.initialEvents();
    },
  
    // Configured the initial events that the collection view
    // binds to. Override this method to prevent the initial
    // events, or to add your own initial events.
    initialEvents: function(){
      if (this.collection){
        this.bindTo(this.collection, "add", this.addChildView, this);
        this.bindTo(this.collection, "remove", this.removeItemView, this);
        this.bindTo(this.collection, "reset", this.render, this);
      }
    },
  
    // Handle a child item added to the collection
    addChildView: function(item, collection, options){
      this.closeEmptyView();
      var ItemView = this.getItemView(item);
  
      var index;
      if(options && options.index){
        index = options.index;
      } else {
        index = 0;
      }
  
      return this.addItemView(item, ItemView, index);
    },
  
    // Override from `Marionette.View` to guarantee the `onShow` method
    // of child views is called.
    onShowCalled: function(){
      this.onShowCallbacks.run();
    },
  
    // Internal method to trigger the before render callbacks
    // and events
    triggerBeforeRender: function(){
      this.triggerMethod("before:render", this);
      this.triggerMethod("collection:before:render", this);
    },
  
    // Internal method to trigger the rendered callbacks and
    // events
    triggerRendered: function(){
      this.triggerMethod("render", this);
      this.triggerMethod("collection:rendered", this);
    },
  
    // Render the collection of items. Override this method to
    // provide your own implementation of a render function for
    // the collection view.
    render: function(){
      this.isClosed = false;
  
      this.triggerBeforeRender();
      this.closeEmptyView();
      this.closeChildren();
  
      if (this.collection && this.collection.length > 0) {
        this.showCollection();
      } else {
        this.showEmptyView();
      }
  
      this.triggerRendered();
      return this;
    },
  
    // Internal method to loop through each item in the
    // collection view and show it
    showCollection: function(){
      var that = this;
      var ItemView;
      this.collection.each(function(item, index){
        ItemView = that.getItemView(item);
        that.addItemView(item, ItemView, index);
      });
    },
  
    // Internal method to show an empty view in place of
    // a collection of item views, when the collection is
    // empty
    showEmptyView: function(){
      var EmptyView = Marionette.getOption(this, "emptyView");
  
      if (EmptyView && !this._showingEmptyView){
        this._showingEmptyView = true;
        var model = new Backbone.Model();
        this.addItemView(model, EmptyView, 0);
      }
    },
  
    // Internal method to close an existing emptyView instance
    // if one exists. Called when a collection view has been
    // rendered empty, and then an item is added to the collection.
    closeEmptyView: function(){
      if (this._showingEmptyView){
        this.closeChildren();
        delete this._showingEmptyView;
      }
    },
  
    // Retrieve the itemView type, either from `this.options.itemView`
    // or from the `itemView` in the object definition. The "options"
    // takes precedence.
    getItemView: function(item){
      var itemView = Marionette.getOption(this, "itemView");
  
      if (!itemView){
        var err = new Error("An `itemView` must be specified");
        err.name = "NoItemViewError";
        throw err;
      }
  
      return itemView;
    },
  
    // Render the child item's view and add it to the
    // HTML for the collection view.
    addItemView: function(item, ItemView, index){
      var that = this;
  
      // get the itemViewOptions if any were specified
      var itemViewOptions = Marionette.getOption(this, "itemViewOptions");
      if (_.isFunction(itemViewOptions)){
        itemViewOptions = itemViewOptions.call(this, item);
      }
  
      // build the view 
      var view = this.buildItemView(item, ItemView, itemViewOptions);
      
      // set up the child view event forwarding
      this.addChildViewEventForwarding(view);
  
      // this view is about to be added
      this.triggerMethod("before:item:added", view);
  
      // Store the child view itself so we can properly
      // remove and/or close it later
      this.children.add(view);
  
      // Render it and show it
      var renderResult = this.renderItemView(view, index);
  
      // this view was added
      this.triggerMethod("after:item:added", view);
  
      // call onShow for child item views
      if (view.onShow){
        this.onShowCallbacks.add(view.onShow, view);
      }
  
      return renderResult;
    },
  
    // Set up the child view event forwarding. Uses an "itemview:"
    // prefix in front of all forwarded events.
    addChildViewEventForwarding: function(view){
      var prefix = Marionette.getOption(this, "itemViewEventPrefix");
  
      // Forward all child item view events through the parent,
      // prepending "itemview:" to the event name
      var childBinding = this.bindTo(view, "all", function(){
        var args = slice.call(arguments);
        args[0] = prefix + ":" + args[0];
        args.splice(1, 0, view);
  
        this.triggerMethod.apply(this, args);
      }, this);
  
      // Store all child event bindings so we can unbind
      // them when removing / closing the child view
      this._childBindings = this._childBindings || {};
      this._childBindings[view.cid] = childBinding;
    },
  
    // render the item view
    renderItemView: function(view, index) {
      view.render();
      this.appendHtml(this, view, index);
    },
  
    // Build an `itemView` for every model in the collection.
    buildItemView: function(item, ItemViewType, itemViewOptions){
      var options = _.extend({model: item}, itemViewOptions);
      var view = new ItemViewType(options);
      return view;
    },
  
    // Remove the child view and close it
    removeItemView: function(item){
      var view = this.children.findByModel(item);
  
      if (view){
        var childBinding = this._childBindings[view.cid];
        if (childBinding) {
          this.unbindFrom(childBinding);
          delete this._childBindings[view.cid];
        }
  
        if (view.close){
          view.close();
        }
  
        this.children.remove(view);
      }
  
      if (!this.collection || this.collection.length === 0){
        this.showEmptyView();
      }
  
      this.triggerMethod("item:removed", view);
    },
  
    // Append the HTML to the collection's `el`.
    // Override this method to do something other
    // then `.append`.
    appendHtml: function(collectionView, itemView, index){
      collectionView.$el.append(itemView.el);
    },
  
    // Internal method to set up the `children` object for
    // storing all of the child views
    initChildViewStorage: function(){
      this.children = new Backbone.ChildViewContainer();
    },
  
    // Handle cleanup and other closing needs for
    // the collection of views.
    close: function(){
      if (this.isClosed){ return; }
  
      this.triggerMethod("collection:before:close");
      this.closeChildren();
      this.triggerMethod("collection:closed");
  
      var args = Array.prototype.slice.apply(arguments);
      Marionette.View.prototype.close.apply(this, args);
    },
  
    // Close the child views that this collection view
    // is holding on to, if any
    closeChildren: function(){
      var that = this;
      this.children.apply("close");
      // re-initialize to clean up after ourselves
      this.initChildViewStorage();
    }
  });
  
  
  // Composite View
  // --------------
  
  // Used for rendering a branch-leaf, hierarchical structure.
  // Extends directly from CollectionView and also renders an
  // an item view as `modelView`, for the top leaf
  Marionette.CompositeView = Marionette.CollectionView.extend({
    constructor: function(options){
      var args = Array.prototype.slice.apply(arguments);
      Marionette.CollectionView.apply(this, args);
  
      this.itemView = this.getItemView();
    },
  
    // Configured the initial events that the composite view
    // binds to. Override this method to prevent the initial
    // events, or to add your own initial events.
    initialEvents: function(){
      if (this.collection){
        this.bindTo(this.collection, "add", this.addChildView, this);
        this.bindTo(this.collection, "remove", this.removeItemView, this);
        this.bindTo(this.collection, "reset", this.renderCollection, this);
      }
    },
  
    // Retrieve the `itemView` to be used when rendering each of
    // the items in the collection. The default is to return
    // `this.itemView` or Marionette.CompositeView if no `itemView`
    // has been defined
    getItemView: function(item){
      var itemView = Marionette.getOption(this, "itemView") || this.constructor;
  
      if (!itemView){
        var err = new Error("An `itemView` must be specified");
        err.name = "NoItemViewError";
        throw err;
      }
  
      return itemView;
    },
  
    // Serialize the collection for the view. 
    // You can override the `serializeData` method in your own view
    // definition, to provide custom serialization for your view's data.
    serializeData: function(){
      var data = {};
  
      if (this.model){
        data = this.model.toJSON();
      }
  
      return data;
    },
  
    // Renders the model once, and the collection once. Calling
    // this again will tell the model's view to re-render itself
    // but the collection will not re-render.
    render: function(){
      this.isClosed = false;
  
      this.resetItemViewContainer();
  
      var html = this.renderModel();
      this.$el.html(html);
  
      // the ui bindings is done here and not at the end of render since they 
      // will not be available until after the model is rendered, but should be
      // available before the collection is rendered.
      this.bindUIElements();
  
      this.triggerMethod("composite:model:rendered");
  
      this.renderCollection();
      this.triggerMethod("composite:rendered");
      return this;
    },
  
    // Render the collection for the composite view
    renderCollection: function(){
      var args = Array.prototype.slice.apply(arguments);
      Marionette.CollectionView.prototype.render.apply(this, args);
  
      this.triggerMethod("composite:collection:rendered");
    },
  
    // Render an individual model, if we have one, as
    // part of a composite view (branch / leaf). For example:
    // a treeview.
    renderModel: function(){
      var data = {};
      data = this.serializeData();
      data = this.mixinTemplateHelpers(data);
  
      var template = this.getTemplate();
      return Marionette.Renderer.render(template, data);
    },
  
    // Appends the `el` of itemView instances to the specified
    // `itemViewContainer` (a jQuery selector). Override this method to
    // provide custom logic of how the child item view instances have their
    // HTML appended to the composite view instance.
    appendHtml: function(cv, iv){
      var $container = this.getItemViewContainer(cv);
      $container.append(iv.el);
    },
  
    // Internal method to ensure an `$itemViewContainer` exists, for the
    // `appendHtml` method to use.
    getItemViewContainer: function(containerView){
      if ("$itemViewContainer" in containerView){
        return containerView.$itemViewContainer;
      }
  
      var container;
      if (containerView.itemViewContainer){
  
        var selector = _.result(containerView, "itemViewContainer");
        container = containerView.$(selector);
        if (container.length <= 0) {
          var err = new Error("The specified `itemViewContainer` was not found: " + containerView.itemViewContainer);
          err.name = "ItemViewContainerMissingError";
          throw err;
        }
  
      } else {
        container = containerView.$el;
      }
  
      containerView.$itemViewContainer = container;
      return container;
    },
  
    // Internal method to reset the `$itemViewContainer` on render
    resetItemViewContainer: function(){
      if (this.$itemViewContainer){
        delete this.$itemViewContainer;
      }
    }
  });
  
  
  // Layout
  // ------
  
  // Used for managing application layouts, nested layouts and
  // multiple regions within an application or sub-application.
  //
  // A specialized view type that renders an area of HTML and then
  // attaches `Region` instances to the specified `regions`.
  // Used for composite view management and sub-application areas.
  Marionette.Layout = Marionette.ItemView.extend({
    regionType: Marionette.Region,
    
    // Ensure the regions are avialable when the `initialize` method
    // is called.
    constructor: function () {
      this._firstRender = true;
      this.initializeRegions();
  
      var args = Array.prototype.slice.apply(arguments);
      Backbone.Marionette.ItemView.apply(this, args);
    },
  
    // Layout's render will use the existing region objects the
    // first time it is called. Subsequent calls will close the
    // views that the regions are showing and then reset the `el`
    // for the regions to the newly rendered DOM elements.
    render: function(){
  
      if (this._firstRender){
        // if this is the first render, don't do anything to
        // reset the regions
        this._firstRender = false;
      } else {
        // If this is not the first render call, then we need to 
        // re-initializing the `el` for each region
        this.closeRegions();
        this.reInitializeRegions();
      }
  
      var args = Array.prototype.slice.apply(arguments);
      var result = Marionette.ItemView.prototype.render.apply(this, args);
  
      return result;
    },
  
    // Handle closing regions, and then close the view itself.
    close: function () {
      if (this.isClosed){ return; }
  
      this.closeRegions();
      this.destroyRegions();
  
      var args = Array.prototype.slice.apply(arguments);
      Backbone.Marionette.ItemView.prototype.close.apply(this, args);
    },
  
    // Initialize the regions that have been defined in a
    // `regions` attribute on this layout. The key of the
    // hash becomes an attribute on the layout object directly.
    // For example: `regions: { menu: ".menu-container" }`
    // will product a `layout.menu` object which is a region
    // that controls the `.menu-container` DOM element.
    initializeRegions: function () {
      if (!this.regionManagers){
        this.regionManagers = {};
      }
  
      var that = this;
      var regions = this.regions || {};
      _.each(regions, function (region, name) {
  
        var regionManager = Marionette.Region.buildRegion(region, that.regionType);
        regionManager.getEl = function(selector){
          return that.$(selector);
        };
  
        that.regionManagers[name] = regionManager;
        that[name] = regionManager;
      });
  
    },
  
    // Re-initialize all of the regions by updating the `el` that
    // they point to
    reInitializeRegions: function(){
      if (this.regionManagers && _.size(this.regionManagers)===0){
        this.initializeRegions();
      } else {
        _.each(this.regionManagers, function(region){
          region.reset();
        });
      }
    },
  
    // Close all of the regions that have been opened by
    // this layout. This method is called when the layout
    // itself is closed.
    closeRegions: function () {
      var that = this;
      _.each(this.regionManagers, function (manager, name) {
        manager.close();
      });
    },
  
    // Destroys all of the regions by removing references
    // from the Layout
    destroyRegions: function(){
      var that = this;
      _.each(this.regionManagers, function (manager, name) {
        delete that[name];
      });
      this.regionManagers = {};
    }
  });
  
  
  
  // AppRouter
  // ---------
  
  // Reduce the boilerplate code of handling route events
  // and then calling a single method on another object.
  // Have your routers configured to call the method on
  // your object, directly.
  //
  // Configure an AppRouter with `appRoutes`.
  //
  // App routers can only take one `controller` object. 
  // It is recommended that you divide your controller
  // objects in to smaller peices of related functionality
  // and have multiple routers / controllers, instead of
  // just one giant router and controller.
  //
  // You can also add standard routes to an AppRouter.
  
  Marionette.AppRouter = Backbone.Router.extend({
  
    constructor: function(options){
      var args = Array.prototype.slice.apply(arguments);
      Backbone.Router.prototype.constructor.apply(this, args);
  
      this.options = options;
  
      if (this.appRoutes){
        var controller = Marionette.getOption(this, "controller");
        this.processAppRoutes(controller, this.appRoutes);
      }
    },
  
    // Internal method to process the `appRoutes` for the
    // router, and turn them in to routes that trigger the
    // specified method on the specified `controller`.
    processAppRoutes: function(controller, appRoutes){
      var method, methodName;
      var route, routesLength, i;
      var routes = [];
      var router = this;
  
      for(route in appRoutes){
        if (appRoutes.hasOwnProperty(route)){
          routes.unshift([route, appRoutes[route]]);
        }
      }
  
      routesLength = routes.length;
      for (i = 0; i < routesLength; i++){
        route = routes[i][0];
        methodName = routes[i][1];
        method = controller[methodName];
  
        if (!method){
          var msg = "Method '" + methodName + "' was not found on the controller";
          var err = new Error(msg);
          err.name = "NoMethodError";
          throw err;
        }
  
        method = _.bind(method, controller);
        router.route(route, methodName, method);
      }
    }
  });
  
  
  // Application
  // -----------
  
  // Contain and manage the composite application as a whole.
  // Stores and starts up `Region` objects, includes an
  // event aggregator as `app.vent`
  Marionette.Application = function(options){
    this.initCallbacks = new Marionette.Callbacks();
    this.vent = new Marionette.EventAggregator();
    this.commands = new Backbone.Wreqr.Commands();
    this.reqres = new Backbone.Wreqr.RequestResponse();
    this.submodules = {};
  
    _.extend(this, options);
  
    Marionette.addEventBinder(this);
    this.triggerMethod = Marionette.triggerMethod;
  };
  
  _.extend(Marionette.Application.prototype, Backbone.Events, {
    // Command execution, facilitated by Backbone.Wreqr.Commands
    execute: function(){
      var args = Array.prototype.slice.apply(arguments);
      this.commands.execute.apply(this.commands, args);
    },
  
    // Request/response, facilitated by Backbone.Wreqr.RequestResponse
    request: function(){
      var args = Array.prototype.slice.apply(arguments);
      return this.reqres.request.apply(this.reqres, args);
    },
  
    // Add an initializer that is either run at when the `start`
    // method is called, or run immediately if added after `start`
    // has already been called.
    addInitializer: function(initializer){
      this.initCallbacks.add(initializer);
    },
  
    // kick off all of the application's processes.
    // initializes all of the regions that have been added
    // to the app, and runs all of the initializer functions
    start: function(options){
      this.triggerMethod("initialize:before", options);
      this.initCallbacks.run(options, this);
      this.triggerMethod("initialize:after", options);
  
      this.triggerMethod("start", options);
    },
  
    // Add regions to your app. 
    // Accepts a hash of named strings or Region objects
    // addRegions({something: "#someRegion"})
    // addRegions{{something: Region.extend({el: "#someRegion"}) });
    addRegions: function(regions){
      var that = this;
      _.each(regions, function (region, name) {
        var regionManager = Marionette.Region.buildRegion(region, Marionette.Region);
        that[name] = regionManager;
      });
    },
  
    // Removes a region from your app.
    // Accepts the regions name
    // removeRegion('myRegion')
    removeRegion: function(region) {
      this[region].close();
      delete this[region];
    },
  
    // Create a module, attached to the application
    module: function(moduleNames, moduleDefinition){
      // slice the args, and add this application object as the
      // first argument of the array
      var args = slice.call(arguments);
      args.unshift(this);
  
      // see the Marionette.Module object for more information
      return Marionette.Module.create.apply(Marionette.Module, args);
    }
  });
  
  // Copy the `extend` function used by Backbone's classes
  Marionette.Application.extend = Marionette.extend;
  
  // Module
  // ------
  
  // A simple module system, used to create privacy and encapsulation in
  // Marionette applications
  Marionette.Module = function(moduleName, app){
    this.moduleName = moduleName;
  
    // store sub-modules
    this.submodules = {};
  
    this._setupInitializersAndFinalizers();
  
    // store the configuration for this module
    this.config = {};
    this.config.app = app;
  
    // extend this module with an event binder
    Marionette.addEventBinder(this);
    this.triggerMethod = Marionette.triggerMethod;
  };
  
  // Extend the Module prototype with events / bindTo, so that the module
  // can be used as an event aggregator or pub/sub.
  _.extend(Marionette.Module.prototype, Backbone.Events, {
  
    // Initializer for a specific module. Initializers are run when the
    // module's `start` method is called.
    addInitializer: function(callback){
      this._initializerCallbacks.add(callback);
    },
  
    // Finalizers are run when a module is stopped. They are used to teardown
    // and finalize any variables, references, events and other code that the
    // module had set up.
    addFinalizer: function(callback){
      this._finalizerCallbacks.add(callback);
    },
  
    // Start the module, and run all of it's initializers
    start: function(options){
      // Prevent re-starting a module that is already started
      if (this._isInitialized){ return; }
  
      // start the sub-modules (depth-first hierarchy)
      _.each(this.submodules, function(mod){
        // check to see if we should start the sub-module with this parent
        var startWithParent = true;
        if (mod.config && mod.config.options){
          startWithParent = mod.config.options.startWithParent;
        }
  
        // start the sub-module
        if (startWithParent){
          mod.start(options);
        }
      });
  
      // run the callbacks to "start" the current module
      this.triggerMethod("before:start", options);
  
      this._initializerCallbacks.run(options, this);
      this._isInitialized = true;
  
      this.triggerMethod("start", options);
    },
  
    // Stop this module by running its finalizers and then stop all of
    // the sub-modules for this module
    stop: function(){
      // if we are not initialized, don't bother finalizing
      if (!this._isInitialized){ return; }
      this._isInitialized = false;
  
      Marionette.triggerMethod.call(this, "before:stop");
  
      // stop the sub-modules; depth-first, to make sure the
      // sub-modules are stopped / finalized before parents
      _.each(this.submodules, function(mod){ mod.stop(); });
  
      // run the finalizers
      this._finalizerCallbacks.run();
  
      // reset the initializers and finalizers
      this._initializerCallbacks.reset();
      this._finalizerCallbacks.reset();
  
      Marionette.triggerMethod.call(this, "stop");
    },
  
    // Configure the module with a definition function and any custom args
    // that are to be passed in to the definition function
    addDefinition: function(moduleDefinition, customArgs){
      this._runModuleDefinition(moduleDefinition, customArgs);
    },
  
    // Internal method: run the module definition function with the correct
    // arguments
    _runModuleDefinition: function(definition, customArgs){
      if (!definition){ return; }
  
      // build the correct list of arguments for the module definition
      var args = _.flatten([
        this,
        this.config.app,
        Backbone,
        Marionette,
        $, _,
        customArgs
      ]);
  
      definition.apply(this, args);
    },
  
    // Internal method: set up new copies of initializers and finalizers.
    // Calling this method will wipe out all existing initializers and
    // finalizers.
    _setupInitializersAndFinalizers: function(){
      this._initializerCallbacks = new Marionette.Callbacks();
      this._finalizerCallbacks = new Marionette.Callbacks();
    }
  });
  
  // Function level methods to create modules
  _.extend(Marionette.Module, {
  
    // Create a module, hanging off the app parameter as the parent object.
    create: function(app, moduleNames, moduleDefinition){
      var that = this;
      var parentModule = app;
      moduleNames = moduleNames.split(".");
  
      // get the custom args passed in after the module definition and
      // get rid of the module name and definition function
      var customArgs = slice.apply(arguments);
      customArgs.splice(0, 3);
  
      // Loop through all the parts of the module definition
      var length = moduleNames.length;
      _.each(moduleNames, function(moduleName, i){
        var isLastModuleInChain = (i === length-1);
        var isFirstModuleInChain = (i === 0);
        var module = that._getModuleDefinition(parentModule, moduleName, app);
  
        // if this is the last module in the chain, then set up
        // all of the module options from the configuration
        if (isLastModuleInChain){
          module.config.options = that._getModuleOptions(module, parentModule, moduleDefinition);
  
          // Only add a module definition and initializer when this is the last
          // module in a "parent.child.grandchild" hierarchy of module names and
          // when the module call has a definition function supplied
          if (module.config.options.hasDefinition){
            module.addDefinition(module.config.options.definition, customArgs);
          }
        }
  
        // if it's a top level module, and this is the only
        // module in the chain, then this one gets configured
        // to start with the parent app.
        if (isFirstModuleInChain && isLastModuleInChain ){
          that._configureStartWithApp(app, module);
        }
  
        // Reset the parent module so that the next child
        // in the list will be added to the correct parent
        parentModule = module;
      });
  
      // Return the last module in the definition chain
      return parentModule;
    },
  
    // Only add the initializer if it is set to start with parent (the app),
    // and if it has not yet been added
    _configureStartWithApp: function(app, module){
      // skip this if we have already configured the module to start w/ the app
      if (module.config.startWithAppIsConfigured){
        return;
      }
  
      // start the module when the app starts
      app.addInitializer(function(options){
        // but only if the module is configured to start w/ parent
        if (module.config.options.startWithParent){
          module.start(options);
        }
      });
  
      // prevent this module from being configured for
      // auto start again. the first time the module
      // is defined, determines it's auto-start
      module.config.startWithAppIsConfigured = true;
    },
  
    _getModuleDefinition: function(parentModule, moduleName, app){
      // Get an existing module of this name if we have one
      var module = parentModule[moduleName];
  
      if (!module){
        // Create a new module if we don't have one
        module = new Marionette.Module(moduleName, app);
        parentModule[moduleName] = module;
        // store the module on the parent
        parentModule.submodules[moduleName] = module;
      }
  
      return module;
    },
  
    _getModuleOptions: function(module, parentModule, moduleDefinition){
      // default to starting the module with it's parent to whatever the
      var startWithParent = true;
      if (module.config.options && !module.config.options.startWithParent){
        startWithParent = false;
      }
  
      // set up initial options for the module
      var options = {
        startWithParent: startWithParent,
        hasDefinition: !!moduleDefinition
      };
  
      // short circuit if we don't have a module definition
      if (!options.hasDefinition){ return options; }
  
      if (_.isFunction(moduleDefinition)){
        // if the definition is a function, assign it directly
        // and use the defaults
        options.definition = moduleDefinition;
  
      } else {
  
        // the definition is an object.
  
        // grab the "define" attribute
        options.hasDefinition = !!moduleDefinition.define;
        options.definition = moduleDefinition.define;
  
        // grab the "startWithParent" attribute if one exists
        if (moduleDefinition.hasOwnProperty("startWithParent")){
          options.startWithParent = moduleDefinition.startWithParent;
        }
      }
  
      return options;
    }
  });
  
  
    return Marionette;
  })(Backbone, _, $ || window.jQuery || window.Zepto || window.ender);
  
  return Backbone.Marionette; 

}));
}).call(global, module, undefined);

})(window)
},{"underscore":"GoDQOv","jquery":"1Pax6e","backbone":"/Z1EQg","backbone.eventbinder":"bUMRi9","backbone.wreqr":"3AWBL+","backbone.babysitter":"3OrQgd"}],"backbone.modelbinder":[function(require,module,exports){
module.exports=require('ahDvth');
},{}],"ahDvth":[function(require,module,exports){
(function(global){(function browserifyShim(module, define) {
// Backbone.ModelBinder v0.1.6
// (c) 2012 Bart Wood
// Distributed Under MIT License

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore', 'jquery', 'backbone'], factory);
    } else {
        // Browser globals
        factory(_, $, Backbone);
    }
}(function(_, $, Backbone){

    if(!Backbone){
        throw 'Please include Backbone.js before Backbone.ModelBinder.js';
    }

    Backbone.ModelBinder = function(modelSetOptions){
        _.bindAll(this);
	this._modelSetOptions = modelSetOptions || {};
    };

    // Current version of the library.
    Backbone.ModelBinder.VERSION = '0.1.6';
    Backbone.ModelBinder.Constants = {};
    Backbone.ModelBinder.Constants.ModelToView = 'ModelToView';
    Backbone.ModelBinder.Constants.ViewToModel = 'ViewToModel';

    _.extend(Backbone.ModelBinder.prototype, {

        bind:function (model, rootEl, attributeBindings, modelSetOptions) {
            this.unbind();

            this._model = model;
            this._rootEl = rootEl;
	        this._modelSetOptions = _.extend({}, this._modelSetOptions, modelSetOptions);

            if (!this._model) throw 'model must be specified';
            if (!this._rootEl) throw 'rootEl must be specified';

            if(attributeBindings){
                // Create a deep clone of the attribute bindings
                this._attributeBindings = $.extend(true, {}, attributeBindings);

                this._initializeAttributeBindings();
                this._initializeElBindings();
            }
            else {
                this._initializeDefaultBindings();
            }

            this._bindModelToView();
            this._bindViewToModel();
        },

	    bindCustomTriggers: function (model, rootEl, triggers, attributeBindings, modelSetOptions) {
           this._triggers = triggers;
           this.bind(model, rootEl, attributeBindings, modelSetOptions)
    	},

        unbind:function () {
            this._unbindModelToView();
            this._unbindViewToModel();

            if(this._attributeBindings){
                delete this._attributeBindings;
                this._attributeBindings = undefined;
            }
        },

        // Converts the input bindings, which might just be empty or strings, to binding objects
        _initializeAttributeBindings:function () {
            var attributeBindingKey, inputBinding, attributeBinding, elementBindingCount, elementBinding;

            for (attributeBindingKey in this._attributeBindings) {
                inputBinding = this._attributeBindings[attributeBindingKey];

                if (_.isString(inputBinding)) {
                    attributeBinding = {elementBindings: [{selector: inputBinding}]};
                }
                else if (_.isArray(inputBinding)) {
                    attributeBinding = {elementBindings: inputBinding};
                }
                else if(_.isObject(inputBinding)){
                    attributeBinding = {elementBindings: [inputBinding]};
                }
                else {
                    throw 'Unsupported type passed to Model Binder ' + attributeBinding;
                }

                // Add a linkage from the element binding back to the attribute binding
                for(elementBindingCount = 0; elementBindingCount < attributeBinding.elementBindings.length; elementBindingCount++){
                    elementBinding = attributeBinding.elementBindings[elementBindingCount];
                    elementBinding.attributeBinding = attributeBinding;
                }

                attributeBinding.attributeName = attributeBindingKey;
                this._attributeBindings[attributeBindingKey] = attributeBinding;
            }
        },

        // If the bindings are not specified, the default binding is performed on the name attribute
        _initializeDefaultBindings: function(){
            var elCount, namedEls, namedEl, name, attributeBinding;
            this._attributeBindings = {};
            namedEls = $('[name]', this._rootEl);

            for(elCount = 0; elCount < namedEls.length; elCount++){
                namedEl = namedEls[elCount];
                name = $(namedEl).attr('name');

                // For elements like radio buttons we only want a single attribute binding with possibly multiple element bindings
                if(!this._attributeBindings[name]){
                    attributeBinding =  {attributeName: name};
                    attributeBinding.elementBindings = [{attributeBinding: attributeBinding, boundEls: [namedEl]}];
                    this._attributeBindings[name] = attributeBinding;
                }
                else{
                    this._attributeBindings[name].elementBindings.push({attributeBinding: this._attributeBindings[name], boundEls: [namedEl]});
                }
            }
        },

        _initializeElBindings:function () {
            var bindingKey, attributeBinding, bindingCount, elementBinding, foundEls, elCount, el;
            for (bindingKey in this._attributeBindings) {
                attributeBinding = this._attributeBindings[bindingKey];

                for (bindingCount = 0; bindingCount < attributeBinding.elementBindings.length; bindingCount++) {
                    elementBinding = attributeBinding.elementBindings[bindingCount];
                    if (elementBinding.selector === '') {
                        foundEls = $(this._rootEl);
                    }
                    else {
                        foundEls = $(elementBinding.selector, this._rootEl);
                    }

                    if (foundEls.length === 0) {
                        throw 'Bad binding found. No elements returned for binding selector ' + elementBinding.selector;
                    }
                    else {
                        elementBinding.boundEls = [];
                        for (elCount = 0; elCount < foundEls.length; elCount++) {
                            el = foundEls[elCount];
                            elementBinding.boundEls.push(el);
                        }
                    }
                }
            }
        },

        _bindModelToView: function () {
            this._model.on('change', this._onModelChange, this);

            this.copyModelAttributesToView();
        },

        // attributesToCopy is an optional parameter - if empty, all attributes
        // that are bound will be copied.  Otherwise, only attributeBindings specified
        // in the attributesToCopy are copied.
        copyModelAttributesToView: function(attributesToCopy){
            var attributeName, attributeBinding;

            for (attributeName in this._attributeBindings) {
                if(attributesToCopy === undefined || _.indexOf(attributesToCopy, attributeName) !== -1){
                    attributeBinding = this._attributeBindings[attributeName];
                    this._copyModelToView(attributeBinding);
                }
            }
        },

        _unbindModelToView: function(){
            if(this._model){
                this._model.off('change', this._onModelChange);
                this._model = undefined;
            }
        },

        _bindViewToModel: function () {
            if (this._triggers) {
                _.each(this._triggers, function (event, selector) {
                    $(this._rootEl).delegate(selector, event, this._onElChanged);
                }, this);
            }
            else {
                $(this._rootEl).delegate('', 'change', this._onElChanged);
                // The change event doesn't work properly for contenteditable elements - but blur does
                $(this._rootEl).delegate('[contenteditable]', 'blur', this._onElChanged);
            }
        },

        _unbindViewToModel: function () {
            if (this._rootEl) {
                if (this._triggers) {
                    _.each(this._triggers, function (event, selector) {
                        $(this._rootEl).undelegate(selector, event, this._onElChanged);
                    }, this);
                }
                else {
                    $(this._rootEl).undelegate('', 'change', this._onElChanged);
                    $(this._rootEl).undelegate('[contenteditable]', 'blur', this._onElChanged);
                }
            }
        },

        _onElChanged:function (event) {
            var el, elBindings, elBindingCount, elBinding;

            el = $(event.target)[0];
            elBindings = this._getElBindings(el);

            for(elBindingCount = 0; elBindingCount < elBindings.length; elBindingCount++){
                elBinding = elBindings[elBindingCount];
                if (this._isBindingUserEditable(elBinding)) {
                    this._copyViewToModel(elBinding, el);
                }
            }
        },

        _isBindingUserEditable: function(elBinding){
            return elBinding.elAttribute === undefined ||
                elBinding.elAttribute === 'text' ||
                elBinding.elAttribute === 'html';
        },

        _getElBindings:function (findEl) {
            var attributeName, attributeBinding, elementBindingCount, elementBinding, boundElCount, boundEl;
            var elBindings = [];

            for (attributeName in this._attributeBindings) {
                attributeBinding = this._attributeBindings[attributeName];

                for (elementBindingCount = 0; elementBindingCount < attributeBinding.elementBindings.length; elementBindingCount++) {
                    elementBinding = attributeBinding.elementBindings[elementBindingCount];

                    for (boundElCount = 0; boundElCount < elementBinding.boundEls.length; boundElCount++) {
                        boundEl = elementBinding.boundEls[boundElCount];

                        if (boundEl === findEl) {
                            elBindings.push(elementBinding);
                        }
                    }
                }
            }

            return elBindings;
        },

        _onModelChange:function () {
            var changedAttribute, attributeBinding;

            for (changedAttribute in this._model.changedAttributes()) {
                attributeBinding = this._attributeBindings[changedAttribute];

                if (attributeBinding) {
                    this._copyModelToView(attributeBinding);
                }
            }
        },

        _copyModelToView:function (attributeBinding) {
            var elementBindingCount, elementBinding, boundElCount, boundEl, value, convertedValue;

            value = this._model.get(attributeBinding.attributeName);

            for (elementBindingCount = 0; elementBindingCount < attributeBinding.elementBindings.length; elementBindingCount++) {
                elementBinding = attributeBinding.elementBindings[elementBindingCount];

                for (boundElCount = 0; boundElCount < elementBinding.boundEls.length; boundElCount++) {
                    boundEl = elementBinding.boundEls[boundElCount];

                    if(!boundEl._isSetting){
                        convertedValue = this._getConvertedValue(Backbone.ModelBinder.Constants.ModelToView, elementBinding, value);
                        this._setEl($(boundEl), elementBinding, convertedValue);
                    }
                }
            }
        },

        _setEl: function (el, elementBinding, convertedValue) {
            if (elementBinding.elAttribute) {
                this._setElAttribute(el, elementBinding, convertedValue);
            }
            else {
                this._setElValue(el, convertedValue);
            }
        },

        _setElAttribute:function (el, elementBinding, convertedValue) {
            switch (elementBinding.elAttribute) {
                case 'html':
                    el.html(convertedValue);
                    break;
                case 'text':
                    el.text(convertedValue);
                    break;
                case 'enabled':
                    el.attr('disabled', !convertedValue);
                    break;
                case 'displayed':
                    el[convertedValue ? 'show' : 'hide']();
                    break;
                case 'hidden':
                    el[convertedValue ? 'hide' : 'show']();
                    break;
                case 'css':
                    el.css(elementBinding.cssAttribute, convertedValue);
                    break;
                case 'class':
                    var previousValue = this._model.previous(elementBinding.attributeBinding.attributeName);
                    if(!_.isUndefined(previousValue)){
                        previousValue = this._getConvertedValue(Backbone.ModelBinder.Constants.ModelToView, elementBinding, previousValue);
                        el.removeClass(previousValue);
                    }

                    if(convertedValue){
                        el.addClass(convertedValue);
                    }
                    break;
                default:
                    el.attr(elementBinding.elAttribute, convertedValue);
            }
        },

        _setElValue:function (el, convertedValue) {
            if(el.attr('type')){
                switch (el.attr('type')) {
                    case 'radio':
                        if (el.val() === convertedValue) {
                            el.attr('checked', 'checked');
                        }
                        break;
                    case 'checkbox':
                        if (convertedValue) {
                            el.attr('checked', 'checked');
                        }
                        else {
                            el.removeAttr('checked');
                        }
                        break;
                    default:
                        el.val(convertedValue);
                }
            }
            else if(el.is('input') || el.is('select') || el.is('textarea')){
                el.val(convertedValue);
            }
            else {
                el.text(convertedValue);
            }
        },

        _copyViewToModel: function (elementBinding, el) {
            var value, convertedValue;

            if (!el._isSetting) {

                el._isSetting = true;
                this._setModel(elementBinding, $(el));
                el._isSetting = false;

                if(elementBinding.converter){
                    value = this._model.get(elementBinding.attributeBinding.attributeName);
                    convertedValue = this._getConvertedValue(Backbone.ModelBinder.Constants.ModelToView, elementBinding, value);
                    this._setEl($(el), elementBinding, convertedValue);
                }
            }
        },

        _getElValue: function(elementBinding, el){
            switch (el.attr('type')) {
                case 'checkbox':
                    return el.prop('checked') ? true : false;
                default:
                    if(el.attr('contenteditable') !== undefined){
                        return el.html();
                    }
                    else {
                        return el.val();
                    }
            }
        },

        _setModel: function (elementBinding, el) {
            var data = {};
            var elVal = this._getElValue(elementBinding, el);
            elVal = this._getConvertedValue(Backbone.ModelBinder.Constants.ViewToModel, elementBinding, elVal);
            data[elementBinding.attributeBinding.attributeName] = elVal;
	        var opts = _.extend({}, this._modelSetOptions, {changeSource: 'ModelBinder'});
            this._model.set(data, opts);
        },

        _getConvertedValue: function (direction, elementBinding, value) {
            if (elementBinding.converter) {
                value = elementBinding.converter(direction, value, elementBinding.attributeBinding.attributeName, this._model);
            }

            return value;
        }
    });

    Backbone.ModelBinder.CollectionConverter = function(collection){
        this._collection = collection;

        if(!this._collection){
            throw 'Collection must be defined';
        }
        _.bindAll(this, 'convert');
    };

    _.extend(Backbone.ModelBinder.CollectionConverter.prototype, {
        convert: function(direction, value){
            if (direction === Backbone.ModelBinder.Constants.ModelToView) {
                return value ? value.id : undefined;
            }
            else {
                return this._collection.get(value);
            }
        }
    });

    // A static helper function to create a default set of bindings that you can customize before calling the bind() function
    // rootEl - where to find all of the bound elements
    // attributeType - probably 'name' or 'id' in most cases
    // converter(optional) - the default converter you want applied to all your bindings
    // elAttribute(optional) - the default elAttribute you want applied to all your bindings
    Backbone.ModelBinder.createDefaultBindings = function(rootEl, attributeType, converter, elAttribute){
        var foundEls, elCount, foundEl, attributeName;
        var bindings = {};

        foundEls = $('[' + attributeType + ']', rootEl);

        for(elCount = 0; elCount < foundEls.length; elCount++){
            foundEl = foundEls[elCount];
            attributeName = $(foundEl).attr(attributeType);

            if(!bindings[attributeName]){
                var attributeBinding =  {selector: '[' + attributeType + '="' + attributeName + '"]'};
                bindings[attributeName] = attributeBinding;

                if(converter){
                    bindings[attributeName].converter = converter;
                }

                if(elAttribute){
                    bindings[attributeName].elAttribute = elAttribute;
                }
            }
        }

        return bindings;
    };

    // Helps you to combine 2 sets of bindings
    Backbone.ModelBinder.combineBindings = function(destination, source){
        _.each(source, function(value, key){
            var elementBinding = {selector: value.selector};

            if(value.converter){
                elementBinding.converter = value.converter;
            }

            if(value.elAttribute){
                elementBinding.elAttribute = value.elAttribute;
            }

            if(!destination[key]){
                destination[key] = elementBinding;
            }
            else {
                destination[key] = [destination[key], elementBinding];
            }
        });

        return destination;
    };


    return Backbone.ModelBinder;

}));

}).call(global, module, undefined);

})(window)
},{}],"backbone.stickit":[function(require,module,exports){
module.exports=require('EWWZiB');
},{}],"EWWZiB":[function(require,module,exports){
(function(global){(function browserifyShim(module, define) {

; global.Backbone = require("backbone");
global._ = require("underscore");
//
// backbone.stickit - v0.6.3
// The MIT License
// Copyright (c) 2012 The New York Times, CMS Group, Matthew DeLambo <delambo@gmail.com> 
//
(function($) {

  // Backbone.Stickit Namespace
  // --------------------------

  Backbone.Stickit = {

    _handlers: [],

    addHandler: function(handlers) {
      // Fill-in default values.
      handlers = _.map(_.flatten([handlers]), function(handler) {
        return _.extend({
          updateModel: true,
          updateView: true,
          updateMethod: 'text'
        }, handler);
      });
      this._handlers = this._handlers.concat(handlers);
    }
  };

  // Backbone.View Mixins
  // --------------------

  _.extend(Backbone.View.prototype, {

    // Collection of model event bindings.
    //   [{model,event,fn}, ...]
    _modelBindings: null,

    // Unbind the model and event bindings from `this._modelBindings` and
    // `this.$el`. If the optional `model` parameter is defined, then only
    // delete bindings for the given `model` and its corresponding view events.
    unstickit: function(model) {
      _.each(this._modelBindings, _.bind(function(binding, i) {
        if (model && binding.model !== model) return false;
        binding.model.off(binding.event, binding.fn);
        delete this._modelBindings[i];
      }, this));
      this._modelBindings = _.compact(this._modelBindings);

      this.$el.off('.stickit' + (model ? '.' + model.cid : ''));
    },

    // Using `this.bindings` configuration or the `optionalBindingsConfig`, binds `this.model`
    // or the `optionalModel` to elements in the view.
    stickit: function(optionalModel, optionalBindingsConfig) {
      var self = this,
        model = optionalModel || this.model,
        namespace = '.stickit.' + model.cid,
        bindings = optionalBindingsConfig || this.bindings || {};

      this._modelBindings || (this._modelBindings = []);
      this.unstickit(model);

      // Iterate through the selectors in the bindings configuration and configure
      // the various options for each field.
      _.each(_.keys(bindings), function(selector) {
        var $el, options, modelAttr, config,
          binding = bindings[selector] || {},
          bindKey = _.uniqueId();

        // Support ':el' selector - special case selector for the view managed delegate.
        if (selector != ':el') $el = self.$(selector);
        else {
          $el = self.$el;
          selector = '';
        }

        // Fail fast if the selector didn't match an element.
        if (!$el.length) return;

        // Allow shorthand setting of model attributes - `'selector':'observe'`.
        if (_.isString(binding)) binding = {observe:binding};

        config = getConfiguration($el, binding);

        modelAttr = config.observe;

        // Create the model set options with a unique `bindKey` so that we
        // can avoid double-binding in the `change:attribute` event handler.
        options = _.extend({bindKey:bindKey}, config.setOptions || {});

        initializeAttributes(self, $el, config, model, modelAttr);

        initializeVisible(self, $el, config, model, modelAttr);

        if (modelAttr) {
          // Setup one-way, form element to model, bindings.
          _.each(config.events || [], function(type) {
            var event = type + namespace;
            var method = function(event) {
              var val = config.getVal.call(self, $el, event, config);
              // Don't update the model if false is returned from the `updateModel` configuration.
              if (evaluateBoolean(self, config.updateModel, val, config))
                setAttr(model, modelAttr, val, options, self, config);
            };
            if (selector === '') self.$el.on(event, method);
            else self.$el.on(event, selector, method);
          });

          // Setup a `change:modelAttr` observer to keep the view element in sync.
          // `modelAttr` may be an array of attributes or a single string value.
          _.each(_.flatten([modelAttr]), function(attr) {
            observeModelEvent(model, self, 'change:'+attr, function(model, val, options) {
              if (options == null || options.bindKey != bindKey)
                updateViewBindEl(self, $el, config, getAttr(model, modelAttr, config, self), model);
            });
          });

          updateViewBindEl(self, $el, config, getAttr(model, modelAttr, config, self), model, true);
        }

        // After each binding is setup, call the `initialize` callback.
        applyViewFn(self, config.initialize, $el, model, config);
      });

      // Wrap `view.remove` to unbind stickit model and dom events.
      this.remove = _.wrap(this.remove, function(oldRemove) {
        self.unstickit();
        if (oldRemove) oldRemove.call(self);
      });
    }
  });

  // Helpers
  // -------

  // Evaluates the given `path` (in object/dot-notation) relative to the given
  // `obj`. If the path is null/undefined, then the given `obj` is returned.
  var evaluatePath = function(obj, path) {
    var parts = (path || '').split('.');
    var result = _.reduce(parts, function(memo, i) { return memo[i]; }, obj);
    return result == null ? obj : result;
  };

  // If the given `fn` is a string, then view[fn] is called, otherwise it is
  // a function that should be executed.
  var applyViewFn = function(view, fn) {
    if (fn) return (_.isString(fn) ? view[fn] : fn).apply(view, _.toArray(arguments).slice(2));
  };

  var getSelectedOption = function($select) { return $select.find('option').not(function(){ return !this.selected; }); };

  // Given a function, string (view function reference), or a boolean
  // value, returns the truthy result. Any other types evaluate as false.
  var evaluateBoolean = function(view, reference) {
    if (_.isBoolean(reference)) return reference;
    else if (_.isFunction(reference) || _.isString(reference))
      return applyViewFn.apply(this, _.toArray(arguments));
    return false;
  };

  // Setup a model event binding with the given function, and track the event
  // in the view's _modelBindings.
  var observeModelEvent = function(model, view, event, fn) {
    model.on(event, fn, view);
    view._modelBindings.push({model:model, event:event, fn:fn});
  };

  // Prepares the given `val`ue and sets it into the `model`.
  var setAttr = function(model, attr, val, options, context, config) {
    if (config.onSet) val = applyViewFn(context, config.onSet, val, config);
    model.set(attr, val, options);
  };

  // Returns the given `attr`'s value from the `model`, escaping and
  // formatting if necessary. If `attr` is an array, then an array of
  // respective values will be returned.
  var getAttr = function(model, attr, config, context) {
    var val, retrieveVal = function(field) {
      var retrieved = config.escape ? model.escape(field) : model.get(field);
      return _.isUndefined(retrieved) ? '' : retrieved;
    };
    val = _.isArray(attr) ? _.map(attr, retrieveVal) : retrieveVal(attr);
    return config.onGet ? applyViewFn(context, config.onGet, val, config) : val;
  };

  // Find handlers in `Backbone.Stickit._handlers` with selectors that match
  // `$el` and generate a configuration by mixing them in the order that they
  // were found with the with the givne `binding`.
  var getConfiguration = function($el, binding) {
    var handlers = [{
      updateModel: false,
      updateView: true,
      updateMethod: 'text',
      update: function($el, val, m, opts) { $el[opts.updateMethod](val); },
      getVal: function($el, e, opts) { return $el[opts.updateMethod](); }
    }];
    _.each(Backbone.Stickit._handlers, function(handler) {
      if ($el.is(handler.selector)) handlers.push(handler);
    });
    handlers.push(binding);
    var config = _.extend.apply(_, handlers);
    delete config.selector;
    return config;
  };

  // Setup the attributes configuration - a list that maps an attribute or
  // property `name`, to an `observe`d model attribute, using an optional
  // `onGet` formatter.
  //
  //     attributes: [{
  //       name: 'attributeOrPropertyName',
  //       observe: 'modelAttrName'
  //       onGet: function(modelAttrVal, modelAttrName) { ... }
  //     }, ...]
  //
  var initializeAttributes = function(view, $el, config, model, modelAttr) {
    var props = ['autofocus', 'autoplay', 'async', 'checked', 'controls', 'defer', 'disabled', 'hidden', 'loop', 'multiple', 'open', 'readonly', 'required', 'scoped', 'selected'];

    _.each(config.attributes || [], function(attrConfig) {
      var lastClass = '',
        observed = attrConfig.observe || (attrConfig.observe = modelAttr),
        updateAttr = function() {
          var updateType = _.indexOf(props, attrConfig.name, true) > -1 ? 'prop' : 'attr',
            val = getAttr(model, observed, attrConfig, view);
          // If it is a class then we need to remove the last value and add the new.
          if (attrConfig.name == 'class') {
            $el.removeClass(lastClass).addClass(val);
            lastClass = val;
          }
          else $el[updateType](attrConfig.name, val);
        };
      _.each(_.flatten([observed]), function(attr) {
        observeModelEvent(model, view, 'change:' + attr, updateAttr);
      });
      updateAttr();
    });
  };

  // If `visible` is configured, then the view element will be shown/hidden
  // based on the truthiness of the modelattr's value or the result of the
  // given callback. If a `visibleFn` is also supplied, then that callback
  // will be executed to manually handle showing/hiding the view element.
  //
  //     observe: 'isRight',
  //     visible: true, // or function(val, options) {}
  //     visibleFn: function($el, isVisible, options) {} // optional handler
  //
  var initializeVisible = function(view, $el, config, model, modelAttr) {
    if (config.visible == null) return;
    var visibleCb = function() {
      var visible = config.visible,
          visibleFn = config.visibleFn,
          val = getAttr(model, modelAttr, config, view),
          isVisible = !!val;
      // If `visible` is a function then it should return a boolean result to show/hide.
      if (_.isFunction(visible) || _.isString(visible)) isVisible = applyViewFn(view, visible, val, config);
      // Either use the custom `visibleFn`, if provided, or execute the standard show/hide.
      if (visibleFn) applyViewFn(view, visibleFn, $el, isVisible, config);
      else {
        if (isVisible) $el.show();
        else $el.hide();
      }
    };
    _.each(_.flatten([modelAttr]), function(attr) {
      observeModelEvent(model, view, 'change:' + attr, visibleCb);
    });
    visibleCb();
  };

  // Update the value of `$el` using the given configuration and trigger the
  // `afterUpdate` callback. This action may be blocked by `config.updateView`.
  //
  //     update: function($el, val, model, options) {},  // handler for updating
  //     updateView: true, // defaults to true
  //     afterUpdate: function($el, val, options) {} // optional callback
  //
  var updateViewBindEl = function(view, $el, config, val, model, isInitializing) {
    if (!evaluateBoolean(view, config.updateView, val, config)) return;
    config.update.call(view, $el, val, model, config);
    if (!isInitializing) applyViewFn(view, config.afterUpdate, $el, val, config);
  };

  // Default Handlers
  // ----------------

  Backbone.Stickit.addHandler([{
    selector: '[contenteditable="true"]',
    updateMethod: 'html',
    events: ['keyup', 'change', 'paste', 'cut']
  }, {
    selector: 'input',
    events: ['keyup', 'change', 'paste', 'cut'],
    update: function($el, val) { $el.val(val); },
    getVal: function($el) {
      var val = $el.val();
      if ($el.is('[type="number"]')) return val == null ? val : Number(val);
      else return val;
    }
  }, {
    selector: 'textarea',
    events: ['keyup', 'change', 'paste', 'cut'],
    update: function($el, val) { $el.val(val); },
    getVal: function($el) { return $el.val(); }
  }, {
    selector: 'input[type="radio"]',
    events: ['change'],
    update: function($el, val) {
      $el.filter('[value="'+val+'"]').prop('checked', true);
    },
    getVal: function($el) {
      return $el.filter(':checked').val();
    }
  }, {
    selector: 'input[type="checkbox"]',
    events: ['change'],
    update: function($el, val, model, options) {
      if ($el.length > 1) {
        // There are multiple checkboxes so we need to go through them and check
        // any that have value attributes that match what's in the array of `val`s.
        val || (val = []);
        _.each($el, function(el) {
          if (_.indexOf(val, $(el).val()) > -1) $(el).prop('checked', true);
          else $(el).prop('checked', false);
        });
      } else {
        if (_.isBoolean(val)) $el.prop('checked', val);
        else $el.prop('checked', val == $el.val());
      }
    },
    getVal: function($el) {
      var val;
      if ($el.length > 1) {
        val = _.reduce($el, function(memo, el) {
          if ($(el).prop('checked')) memo.push($(el).val());
          return memo;
        }, []);
      } else {
        val = $el.prop('checked');
        // If the checkbox has a value attribute defined, then
        // use that value. Most browsers use "on" as a default.
        var boxval = $el.val();
        if (boxval != 'on' && boxval != null) {
          if (val) val = $el.val();
          else val = null;
        }
      }
      return val;
    }
  }, {
    selector: 'select',
    events: ['change'],
    update: function($el, val, model, options) {
      var optList,
        selectConfig = options.selectOptions,
        list = selectConfig && selectConfig.collection || undefined,
        isMultiple = $el.prop('multiple');

      // If there are no `selectOptions` then we assume that the `<select>`
      // is pre-rendered and that we need to generate the collection.
      if (!selectConfig) {
        selectConfig = {};
        var getList = function($el) {
          return $el.find('option').map(function() {
            return {value:this.value, label:this.text};
          }).get();
        };
        if ($el.find('optgroup').length) {
          list = {opt_labels:[]};
          _.each($el.find('optgroup'), function(el) {
            var label = $(el).attr('label');
            list.opt_labels.push(label);
            list[label] = getList($(el));
          });
        } else {
          list = getList($el);
        }
      }

      // Fill in default label and path values.
      selectConfig.valuePath = selectConfig.valuePath || 'value';
      selectConfig.labelPath = selectConfig.labelPath || 'label';

      var addSelectOptions = function(optList, $el, fieldVal) {
        // Add a flag for default option at the beginning of the list.
        if (selectConfig.defaultOption) {
          optList = _.clone(optList);
          optList.unshift('__default__');
        }
        _.each(optList, function(obj) {
          var option = $('<option/>'), optionVal = obj;

          var fillOption = function(text, val) {
            option.text(text);
            optionVal = val;
            // Save the option value as data so that we can reference it later.
            option.data('stickit_bind_val', optionVal);
            if (!_.isArray(optionVal) && !_.isObject(optionVal)) option.val(optionVal);
          };

          if (obj === '__default__')
            fillOption(selectConfig.defaultOption.label, selectConfig.defaultOption.value);
          else
            fillOption(evaluatePath(obj, selectConfig.labelPath), evaluatePath(obj, selectConfig.valuePath));

          // Determine if this option is selected.
          if (!isMultiple && optionVal != null && fieldVal != null && optionVal == fieldVal || (_.isObject(fieldVal) && _.isEqual(optionVal, fieldVal)))
            option.prop('selected', true);
          else if (isMultiple && _.isArray(fieldVal)) {
            _.each(fieldVal, function(val) {
              if (_.isObject(val)) val = evaluatePath(val, selectConfig.valuePath);
              if (val == optionVal || (_.isObject(val) && _.isEqual(optionVal, val)))
                option.prop('selected', true);
            });
          }

          $el.append(option);
        });
      };

      $el.html('');

      // The `list` configuration is a function that returns the options list or a string
      // which represents the path to the list relative to `window` or the view/`this`.
      var evaluate = function(view, list) {
        var context = window;
        if (list.indexOf('this.') === 0) context = view;
        list = list.replace(/^[a-z]*\.(.+)$/, '$1');
        return evaluatePath(context, list);
      };
      if (_.isString(list)) optList = evaluate(this, list);
      else if (_.isFunction(list)) optList = applyViewFn(this, list, $el, options);
      else optList = list;

      // Support Backbone.Collection and deserialize.
      if (optList instanceof Backbone.Collection) optList = optList.toJSON();

      if (_.isArray(optList)) {
        addSelectOptions(optList, $el, val);
      } else {
        // If the optList is an object, then it should be used to define an optgroup. An
        // optgroup object configuration looks like the following:
        //
        //     {
        //       'opt_labels': ['Looney Tunes', 'Three Stooges'],
        //       'Looney Tunes': [{id: 1, name: 'Bugs Bunny'}, {id: 2, name: 'Donald Duck'}],
        //       'Three Stooges': [{id: 3, name : 'moe'}, {id: 4, name : 'larry'}, {id: 5, name : 'curly'}]
        //     }
        //
        _.each(optList.opt_labels, function(label) {
          var $group = $('<optgroup/>').attr('label', label);
          addSelectOptions(optList[label], $group, val);
          $el.append($group);
        });
      }
    },
    getVal: function($el) {
      var val;
      if ($el.prop('multiple')) {
        val = $(getSelectedOption($el).map(function() {
          return $(this).data('stickit_bind_val');
        })).get();
      } else {
        val = getSelectedOption($el).data('stickit_bind_val');
      }
      return val;
    }
  }]);

})(window.jQuery || window.Zepto);

}).call(global, module, undefined);

})(window)
},{"backbone":"/Z1EQg","underscore":"GoDQOv"}],"moment":[function(require,module,exports){
module.exports=require('t5BXmg');
},{}],"t5BXmg":[function(require,module,exports){
// moment.js
// version : 1.7.2
// author : Tim Wood
// license : MIT
// momentjs.com
(function(a){function E(a,b,c,d){var e=c.lang();return e[a].call?e[a](c,d):e[a][b]}function F(a,b){return function(c){return K(a.call(this,c),b)}}function G(a){return function(b){var c=a.call(this,b);return c+this.lang().ordinal(c)}}function H(a,b,c){this._d=a,this._isUTC=!!b,this._a=a._a||null,this._lang=c||!1}function I(a){var b=this._data={},c=a.years||a.y||0,d=a.months||a.M||0,e=a.weeks||a.w||0,f=a.days||a.d||0,g=a.hours||a.h||0,h=a.minutes||a.m||0,i=a.seconds||a.s||0,j=a.milliseconds||a.ms||0;this._milliseconds=j+i*1e3+h*6e4+g*36e5,this._days=f+e*7,this._months=d+c*12,b.milliseconds=j%1e3,i+=J(j/1e3),b.seconds=i%60,h+=J(i/60),b.minutes=h%60,g+=J(h/60),b.hours=g%24,f+=J(g/24),f+=e*7,b.days=f%30,d+=J(f/30),b.months=d%12,c+=J(d/12),b.years=c,this._lang=!1}function J(a){return a<0?Math.ceil(a):Math.floor(a)}function K(a,b){var c=a+"";while(c.length<b)c="0"+c;return c}function L(a,b,c){var d=b._milliseconds,e=b._days,f=b._months,g;d&&a._d.setTime(+a+d*c),e&&a.date(a.date()+e*c),f&&(g=a.date(),a.date(1).month(a.month()+f*c).date(Math.min(g,a.daysInMonth())))}function M(a){return Object.prototype.toString.call(a)==="[object Array]"}function N(a,b){var c=Math.min(a.length,b.length),d=Math.abs(a.length-b.length),e=0,f;for(f=0;f<c;f++)~~a[f]!==~~b[f]&&e++;return e+d}function O(a,b,c,d){var e,f,g=[];for(e=0;e<7;e++)g[e]=a[e]=a[e]==null?e===2?1:0:a[e];return a[7]=g[7]=b,a[8]!=null&&(g[8]=a[8]),a[3]+=c||0,a[4]+=d||0,f=new Date(0),b?(f.setUTCFullYear(a[0],a[1],a[2]),f.setUTCHours(a[3],a[4],a[5],a[6])):(f.setFullYear(a[0],a[1],a[2]),f.setHours(a[3],a[4],a[5],a[6])),f._a=g,f}function P(a,c){var d,e,g=[];!c&&h&&(c=require("./lang/"+a));for(d=0;d<i.length;d++)c[i[d]]=c[i[d]]||f.en[i[d]];for(d=0;d<12;d++)e=b([2e3,d]),g[d]=new RegExp("^"+(c.months[d]||c.months(e,""))+"|^"+(c.monthsShort[d]||c.monthsShort(e,"")).replace(".",""),"i");return c.monthsParse=c.monthsParse||g,f[a]=c,c}function Q(a){var c=typeof a=="string"&&a||a&&a._lang||null;return c?f[c]||P(c):b}function R(a){return a.match(/\[.*\]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function S(a){var b=a.match(k),c,d;for(c=0,d=b.length;c<d;c++)D[b[c]]?b[c]=D[b[c]]:b[c]=R(b[c]);return function(e){var f="";for(c=0;c<d;c++)f+=typeof b[c].call=="function"?b[c].call(e,a):b[c];return f}}function T(a,b){function d(b){return a.lang().longDateFormat[b]||b}var c=5;while(c--&&l.test(b))b=b.replace(l,d);return A[b]||(A[b]=S(b)),A[b](a)}function U(a){switch(a){case"DDDD":return p;case"YYYY":return q;case"S":case"SS":case"SSS":case"DDD":return o;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":case"a":case"A":return r;case"Z":case"ZZ":return s;case"T":return t;case"MM":case"DD":case"YY":case"HH":case"hh":case"mm":case"ss":case"M":case"D":case"d":case"H":case"h":case"m":case"s":return n;default:return new RegExp(a.replace("\\",""))}}function V(a,b,c,d){var e,f;switch(a){case"M":case"MM":c[1]=b==null?0:~~b-1;break;case"MMM":case"MMMM":for(e=0;e<12;e++)if(Q().monthsParse[e].test(b)){c[1]=e,f=!0;break}f||(c[8]=!1);break;case"D":case"DD":case"DDD":case"DDDD":b!=null&&(c[2]=~~b);break;case"YY":c[0]=~~b+(~~b>70?1900:2e3);break;case"YYYY":c[0]=~~Math.abs(b);break;case"a":case"A":d.isPm=(b+"").toLowerCase()==="pm";break;case"H":case"HH":case"h":case"hh":c[3]=~~b;break;case"m":case"mm":c[4]=~~b;break;case"s":case"ss":c[5]=~~b;break;case"S":case"SS":case"SSS":c[6]=~~(("0."+b)*1e3);break;case"Z":case"ZZ":d.isUTC=!0,e=(b+"").match(x),e&&e[1]&&(d.tzh=~~e[1]),e&&e[2]&&(d.tzm=~~e[2]),e&&e[0]==="+"&&(d.tzh=-d.tzh,d.tzm=-d.tzm)}b==null&&(c[8]=!1)}function W(a,b){var c=[0,0,1,0,0,0,0],d={tzh:0,tzm:0},e=b.match(k),f,g;for(f=0;f<e.length;f++)g=(U(e[f]).exec(a)||[])[0],g&&(a=a.slice(a.indexOf(g)+g.length)),D[e[f]]&&V(e[f],g,c,d);return d.isPm&&c[3]<12&&(c[3]+=12),d.isPm===!1&&c[3]===12&&(c[3]=0),O(c,d.isUTC,d.tzh,d.tzm)}function X(a,b){var c,d=a.match(m)||[],e,f=99,g,h,i;for(g=0;g<b.length;g++)h=W(a,b[g]),e=T(new H(h),b[g]).match(m)||[],i=N(d,e),i<f&&(f=i,c=h);return c}function Y(a){var b="YYYY-MM-DDT",c;if(u.exec(a)){for(c=0;c<4;c++)if(w[c][1].exec(a)){b+=w[c][0];break}return s.exec(a)?W(a,b+" Z"):W(a,b)}return new Date(a)}function Z(a,b,c,d,e){var f=e.relativeTime[a];return typeof f=="function"?f(b||1,!!c,a,d):f.replace(/%d/i,b||1)}function $(a,b,c){var e=d(Math.abs(a)/1e3),f=d(e/60),g=d(f/60),h=d(g/24),i=d(h/365),j=e<45&&["s",e]||f===1&&["m"]||f<45&&["mm",f]||g===1&&["h"]||g<22&&["hh",g]||h===1&&["d"]||h<=25&&["dd",h]||h<=45&&["M"]||h<345&&["MM",d(h/30)]||i===1&&["y"]||["yy",i];return j[2]=b,j[3]=a>0,j[4]=c,Z.apply({},j)}function _(a,c){b.fn[a]=function(a){var b=this._isUTC?"UTC":"";return a!=null?(this._d["set"+b+c](a),this):this._d["get"+b+c]()}}function ab(a){b.duration.fn[a]=function(){return this._data[a]}}function bb(a,c){b.duration.fn["as"+a]=function(){return+this/c}}var b,c="1.7.2",d=Math.round,e,f={},g="en",h=typeof module!="undefined"&&module.exports,i="months|monthsShort|weekdays|weekdaysShort|weekdaysMin|longDateFormat|calendar|relativeTime|ordinal|meridiem".split("|"),j=/^\/?Date\((\-?\d+)/i,k=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?|.)/g,l=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?)/g,m=/([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi,n=/\d\d?/,o=/\d{1,3}/,p=/\d{3}/,q=/\d{1,4}/,r=/[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/i,s=/Z|[\+\-]\d\d:?\d\d/i,t=/T/i,u=/^\s*\d{4}-\d\d-\d\d(T(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,v="YYYY-MM-DDTHH:mm:ssZ",w=[["HH:mm:ss.S",/T\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/T\d\d:\d\d:\d\d/],["HH:mm",/T\d\d:\d\d/],["HH",/T\d\d/]],x=/([\+\-]|\d\d)/gi,y="Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"),z={Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6},A={},B="DDD w M D d".split(" "),C="M D H h m s w".split(" "),D={M:function(){return this.month()+1},MMM:function(a){return E("monthsShort",this.month(),this,a)},MMMM:function(a){return E("months",this.month(),this,a)},D:function(){return this.date()},DDD:function(){var a=new Date(this.year(),this.month(),this.date()),b=new Date(this.year(),0,1);return~~((a-b)/864e5+1.5)},d:function(){return this.day()},dd:function(a){return E("weekdaysMin",this.day(),this,a)},ddd:function(a){return E("weekdaysShort",this.day(),this,a)},dddd:function(a){return E("weekdays",this.day(),this,a)},w:function(){var a=new Date(this.year(),this.month(),this.date()-this.day()+5),b=new Date(a.getFullYear(),0,4);return~~((a-b)/864e5/7+1.5)},YY:function(){return K(this.year()%100,2)},YYYY:function(){return K(this.year(),4)},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return~~(this.milliseconds()/100)},SS:function(){return K(~~(this.milliseconds()/10),2)},SSS:function(){return K(this.milliseconds(),3)},Z:function(){var a=-this.zone(),b="+";return a<0&&(a=-a,b="-"),b+K(~~(a/60),2)+":"+K(~~a%60,2)},ZZ:function(){var a=-this.zone(),b="+";return a<0&&(a=-a,b="-"),b+K(~~(10*a/6),4)}};while(B.length)e=B.pop(),D[e+"o"]=G(D[e]);while(C.length)e=C.pop(),D[e+e]=F(D[e],2);D.DDDD=F(D.DDD,3),b=function(c,d){if(c===null||c==="")return null;var e,f;return b.isMoment(c)?new H(new Date(+c._d),c._isUTC,c._lang):(d?M(d)?e=X(c,d):e=W(c,d):(f=j.exec(c),e=c===a?new Date:f?new Date(+f[1]):c instanceof Date?c:M(c)?O(c):typeof c=="string"?Y(c):new Date(c)),new H(e))},b.utc=function(a,c){return M(a)?new H(O(a,!0),!0):(typeof a=="string"&&!s.exec(a)&&(a+=" +0000",c&&(c+=" Z")),b(a,c).utc())},b.unix=function(a){return b(a*1e3)},b.duration=function(a,c){var d=b.isDuration(a),e=typeof a=="number",f=d?a._data:e?{}:a,g;return e&&(c?f[c]=a:f.milliseconds=a),g=new I(f),d&&(g._lang=a._lang),g},b.humanizeDuration=function(a,c,d){return b.duration(a,c===!0?null:c).humanize(c===!0?!0:d)},b.version=c,b.defaultFormat=v,b.lang=function(a,c){var d;if(!a)return g;(c||!f[a])&&P(a,c);if(f[a]){for(d=0;d<i.length;d++)b[i[d]]=f[a][i[d]];b.monthsParse=f[a].monthsParse,g=a}},b.langData=Q,b.isMoment=function(a){return a instanceof H},b.isDuration=function(a){return a instanceof I},b.lang("en",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinal:function(a){var b=a%10;return~~(a%100/10)===1?"th":b===1?"st":b===2?"nd":b===3?"rd":"th"}}),b.fn=H.prototype={clone:function(){return b(this)},valueOf:function(){return+this._d},unix:function(){return Math.floor(+this._d/1e3)},toString:function(){return this._d.toString()},toDate:function(){return this._d},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds(),!!this._isUTC]},isValid:function(){return this._a?this._a[8]!=null?!!this._a[8]:!N(this._a,(this._a[7]?b.utc(this._a):b(this._a)).toArray()):!isNaN(this._d.getTime())},utc:function(){return this._isUTC=!0,this},local:function(){return this._isUTC=!1,this},format:function(a){return T(this,a?a:b.defaultFormat)},add:function(a,c){var d=c?b.duration(+c,a):b.duration(a);return L(this,d,1),this},subtract:function(a,c){var d=c?b.duration(+c,a):b.duration(a);return L(this,d,-1),this},diff:function(a,c,e){var f=this._isUTC?b(a).utc():b(a).local(),g=(this.zone()-f.zone())*6e4,h=this._d-f._d-g,i=this.year()-f.year(),j=this.month()-f.month(),k=this.date()-f.date(),l;return c==="months"?l=i*12+j+k/30:c==="years"?l=i+(j+k/30)/12:l=c==="seconds"?h/1e3:c==="minutes"?h/6e4:c==="hours"?h/36e5:c==="days"?h/864e5:c==="weeks"?h/6048e5:h,e?l:d(l)},from:function(a,c){return b.duration(this.diff(a)).lang(this._lang).humanize(!c)},fromNow:function(a){return this.from(b(),a)},calendar:function(){var a=this.diff(b().sod(),"days",!0),c=this.lang().calendar,d=c.sameElse,e=a<-6?d:a<-1?c.lastWeek:a<0?c.lastDay:a<1?c.sameDay:a<2?c.nextDay:a<7?c.nextWeek:d;return this.format(typeof e=="function"?e.apply(this):e)},isLeapYear:function(){var a=this.year();return a%4===0&&a%100!==0||a%400===0},isDST:function(){return this.zone()<b([this.year()]).zone()||this.zone()<b([this.year(),5]).zone()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return a==null?b:this.add({d:a-b})},startOf:function(a){switch(a.replace(/s$/,"")){case"year":this.month(0);case"month":this.date(1);case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return this},endOf:function(a){return this.startOf(a).add(a.replace(/s?$/,"s"),1).subtract("ms",1)},sod:function(){return this.clone().startOf("day")},eod:function(){return this.clone().endOf("day")},zone:function(){return this._isUTC?0:this._d.getTimezoneOffset()},daysInMonth:function(){return b.utc([this.year(),this.month()+1,0]).date()},lang:function(b){return b===a?Q(this):(this._lang=b,this)}};for(e=0;e<y.length;e++)_(y[e].toLowerCase(),y[e]);_("year","FullYear"),b.duration.fn=I.prototype={weeks:function(){return J(this.days()/7)},valueOf:function(){return this._milliseconds+this._days*864e5+this._months*2592e6},humanize:function(a){var b=+this,c=this.lang().relativeTime,d=$(b,!a,this.lang()),e=b<=0?c.past:c.future;return a&&(typeof e=="function"?d=e(d):d=e.replace(/%s/i,d)),d},lang:b.fn.lang};for(e in z)z.hasOwnProperty(e)&&(bb(e,z[e]),ab(e.toLowerCase()));bb("Weeks",6048e5),h&&(module.exports=b),typeof ender=="undefined"&&(this.moment=b),typeof define=="function"&&define.amd&&define("moment",[],function(){return b})}).call(this);
},{}],"underscore":[function(require,module,exports){
module.exports=require('GoDQOv');
},{}],"GoDQOv":[function(require,module,exports){
(function(){//     Underscore.js 1.4.4
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      concat           = ArrayProto.concat,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.4.4';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? null : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value || _.identity);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    each(input, function(value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(concat.apply(ArrayProto, arguments));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(args, "" + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(context, args.concat(slice.call(arguments)));
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] == null) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but `Object`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                               _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(n);
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

})()
},{}],"underscore.string":[function(require,module,exports){
module.exports=require('HlCq4P');
},{}],"HlCq4P":[function(require,module,exports){
//  Underscore.string
//  (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
//  Underscore.string is freely distributable under the terms of the MIT license.
//  Documentation: https://github.com/epeli/underscore.string
//  Some code is borrowed from MooTools and Alexandru Marasteanu.
//  Version '2.3.1'

!function(root, String){
  'use strict';

  // Defining helper functions.

  var nativeTrim = String.prototype.trim;
  var nativeTrimRight = String.prototype.trimRight;
  var nativeTrimLeft = String.prototype.trimLeft;

  var parseNumber = function(source) { return source * 1 || 0; };

  var strRepeat = function(str, qty){
    if (qty < 1) return '';
    var result = '';
    while (qty > 0) {
      if (qty & 1) result += str;
      qty >>= 1, str += str;
    }
    return result;
  };

  var slice = [].slice;

  var defaultToWhiteSpace = function(characters) {
    if (characters == null)
      return '\\s';
    else if (characters.source)
      return characters.source;
    else
      return '[' + _s.escapeRegExp(characters) + ']';
  };

  var escapeChars = {
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: "'"
  };

  var reversedEscapeChars = {};
  for(var key in escapeChars) reversedEscapeChars[escapeChars[key]] = key;
  reversedEscapeChars["'"] = '#39';

  // sprintf() for JavaScript 0.7-beta1
  // http://www.diveintojavascript.com/projects/javascript-sprintf
  //
  // Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
  // All rights reserved.

  var sprintf = (function() {
    function get_type(variable) {
      return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }

    var str_repeat = strRepeat;

    var str_format = function() {
      if (!str_format.cache.hasOwnProperty(arguments[0])) {
        str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
      }
      return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
    };

    str_format.format = function(parse_tree, argv) {
      var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
      for (i = 0; i < tree_length; i++) {
        node_type = get_type(parse_tree[i]);
        if (node_type === 'string') {
          output.push(parse_tree[i]);
        }
        else if (node_type === 'array') {
          match = parse_tree[i]; // convenience purposes only
          if (match[2]) { // keyword argument
            arg = argv[cursor];
            for (k = 0; k < match[2].length; k++) {
              if (!arg.hasOwnProperty(match[2][k])) {
                throw new Error(sprintf('[_.sprintf] property "%s" does not exist', match[2][k]));
              }
              arg = arg[match[2][k]];
            }
          } else if (match[1]) { // positional argument (explicit)
            arg = argv[match[1]];
          }
          else { // positional argument (implicit)
            arg = argv[cursor++];
          }

          if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
            throw new Error(sprintf('[_.sprintf] expecting number but found %s', get_type(arg)));
          }
          switch (match[8]) {
            case 'b': arg = arg.toString(2); break;
            case 'c': arg = String.fromCharCode(arg); break;
            case 'd': arg = parseInt(arg, 10); break;
            case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
            case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
            case 'o': arg = arg.toString(8); break;
            case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
            case 'u': arg = Math.abs(arg); break;
            case 'x': arg = arg.toString(16); break;
            case 'X': arg = arg.toString(16).toUpperCase(); break;
          }
          arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
          pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
          pad_length = match[6] - String(arg).length;
          pad = match[6] ? str_repeat(pad_character, pad_length) : '';
          output.push(match[5] ? arg + pad : pad + arg);
        }
      }
      return output.join('');
    };

    str_format.cache = {};

    str_format.parse = function(fmt) {
      var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
      while (_fmt) {
        if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
          parse_tree.push(match[0]);
        }
        else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
          parse_tree.push('%');
        }
        else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
          if (match[2]) {
            arg_names |= 1;
            var field_list = [], replacement_field = match[2], field_match = [];
            if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
              field_list.push(field_match[1]);
              while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else {
                  throw new Error('[_.sprintf] huh?');
                }
              }
            }
            else {
              throw new Error('[_.sprintf] huh?');
            }
            match[2] = field_list;
          }
          else {
            arg_names |= 2;
          }
          if (arg_names === 3) {
            throw new Error('[_.sprintf] mixing positional and named placeholders is not (yet) supported');
          }
          parse_tree.push(match);
        }
        else {
          throw new Error('[_.sprintf] huh?');
        }
        _fmt = _fmt.substring(match[0].length);
      }
      return parse_tree;
    };

    return str_format;
  })();



  // Defining underscore.string

  var _s = {

    VERSION: '2.3.1',

    isBlank: function(str){
      if (str == null) str = '';
      return (/^\s*$/).test(str);
    },

    stripTags: function(str){
      if (str == null) return '';
      return String(str).replace(/<\/?[^>]+>/g, '');
    },

    capitalize : function(str){
      str = str == null ? '' : String(str);
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    chop: function(str, step){
      if (str == null) return [];
      str = String(str);
      step = ~~step;
      return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
    },

    clean: function(str){
      return _s.strip(str).replace(/\s+/g, ' ');
    },

    count: function(str, substr){
      if (str == null || substr == null) return 0;

      str = String(str);
      substr = String(substr);

      var count = 0,
        pos = 0,
        length = substr.length;

      while (true) {
        pos = str.indexOf(substr, pos);
        if (pos === -1) break;
        count++;
        pos += length;
      }

      return count;
    },

    chars: function(str) {
      if (str == null) return [];
      return String(str).split('');
    },

    swapCase: function(str) {
      if (str == null) return '';
      return String(str).replace(/\S/g, function(c){
        return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
      });
    },

    escapeHTML: function(str) {
      if (str == null) return '';
      return String(str).replace(/[&<>"']/g, function(m){ return '&' + reversedEscapeChars[m] + ';'; });
    },

    unescapeHTML: function(str) {
      if (str == null) return '';
      return String(str).replace(/\&([^;]+);/g, function(entity, entityCode){
        var match;

        if (entityCode in escapeChars) {
          return escapeChars[entityCode];
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
          return String.fromCharCode(parseInt(match[1], 16));
        } else if (match = entityCode.match(/^#(\d+)$/)) {
          return String.fromCharCode(~~match[1]);
        } else {
          return entity;
        }
      });
    },

    escapeRegExp: function(str){
      if (str == null) return '';
      return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    },

    splice: function(str, i, howmany, substr){
      var arr = _s.chars(str);
      arr.splice(~~i, ~~howmany, substr);
      return arr.join('');
    },

    insert: function(str, i, substr){
      return _s.splice(str, i, 0, substr);
    },

    include: function(str, needle){
      if (needle === '') return true;
      if (str == null) return false;
      return String(str).indexOf(needle) !== -1;
    },

    join: function() {
      var args = slice.call(arguments),
        separator = args.shift();

      if (separator == null) separator = '';

      return args.join(separator);
    },

    lines: function(str) {
      if (str == null) return [];
      return String(str).split("\n");
    },

    reverse: function(str){
      return _s.chars(str).reverse().join('');
    },

    startsWith: function(str, starts){
      if (starts === '') return true;
      if (str == null || starts == null) return false;
      str = String(str); starts = String(starts);
      return str.length >= starts.length && str.slice(0, starts.length) === starts;
    },

    endsWith: function(str, ends){
      if (ends === '') return true;
      if (str == null || ends == null) return false;
      str = String(str); ends = String(ends);
      return str.length >= ends.length && str.slice(str.length - ends.length) === ends;
    },

    succ: function(str){
      if (str == null) return '';
      str = String(str);
      return str.slice(0, -1) + String.fromCharCode(str.charCodeAt(str.length-1) + 1);
    },

    titleize: function(str){
      if (str == null) return '';
      return String(str).replace(/(?:^|\s)\S/g, function(c){ return c.toUpperCase(); });
    },

    camelize: function(str){
      return _s.trim(str).replace(/[-_\s]+(.)?/g, function(match, c){ return c.toUpperCase(); });
    },

    underscored: function(str){
      return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
    },

    dasherize: function(str){
      return _s.trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
    },

    classify: function(str){
      return _s.titleize(String(str).replace(/[\W_]/g, ' ')).replace(/\s/g, '');
    },

    humanize: function(str){
      return _s.capitalize(_s.underscored(str).replace(/_id$/,'').replace(/_/g, ' '));
    },

    trim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrim) return nativeTrim.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '');
    },

    ltrim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp('^' + characters + '+'), '');
    },

    rtrim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrimRight) return nativeTrimRight.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp(characters + '+$'), '');
    },

    truncate: function(str, length, truncateStr){
      if (str == null) return '';
      str = String(str); truncateStr = truncateStr || '...';
      length = ~~length;
      return str.length > length ? str.slice(0, length) + truncateStr : str;
    },

    /**
     * _s.prune: a more elegant version of truncate
     * prune extra chars, never leaving a half-chopped word.
     * @author github.com/rwz
     */
    prune: function(str, length, pruneStr){
      if (str == null) return '';

      str = String(str); length = ~~length;
      pruneStr = pruneStr != null ? String(pruneStr) : '...';

      if (str.length <= length) return str;

      var tmpl = function(c){ return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' '; },
        template = str.slice(0, length+1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

      if (template.slice(template.length-2).match(/\w\w/))
        template = template.replace(/\s*\S+$/, '');
      else
        template = _s.rtrim(template.slice(0, template.length-1));

      return (template+pruneStr).length > str.length ? str : str.slice(0, template.length)+pruneStr;
    },

    words: function(str, delimiter) {
      if (_s.isBlank(str)) return [];
      return _s.trim(str, delimiter).split(delimiter || /\s+/);
    },

    pad: function(str, length, padStr, type) {
      str = str == null ? '' : String(str);
      length = ~~length;

      var padlen  = 0;

      if (!padStr)
        padStr = ' ';
      else if (padStr.length > 1)
        padStr = padStr.charAt(0);

      switch(type) {
        case 'right':
          padlen = length - str.length;
          return str + strRepeat(padStr, padlen);
        case 'both':
          padlen = length - str.length;
          return strRepeat(padStr, Math.ceil(padlen/2)) + str
                  + strRepeat(padStr, Math.floor(padlen/2));
        default: // 'left'
          padlen = length - str.length;
          return strRepeat(padStr, padlen) + str;
        }
    },

    lpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr);
    },

    rpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'right');
    },

    lrpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'both');
    },

    sprintf: sprintf,

    vsprintf: function(fmt, argv){
      argv.unshift(fmt);
      return sprintf.apply(null, argv);
    },

    toNumber: function(str, decimals) {
      if (!str) return 0;
      str = _s.trim(str);
      if (!str.match(/^-?\d+(?:\.\d+)?$/)) return NaN;
      return parseNumber(parseNumber(str).toFixed(~~decimals));
    },

    numberFormat : function(number, dec, dsep, tsep) {
      if (isNaN(number) || number == null) return '';

      number = number.toFixed(~~dec);
      tsep = typeof tsep == 'string' ? tsep : ',';

      var parts = number.split('.'), fnums = parts[0],
        decimals = parts[1] ? (dsep || '.') + parts[1] : '';

      return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
    },

    strRight: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strRightBack: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.lastIndexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strLeft: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    strLeftBack: function(str, sep){
      if (str == null) return '';
      str += ''; sep = sep != null ? ''+sep : sep;
      var pos = str.lastIndexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    toSentence: function(array, separator, lastSeparator, serial) {
      separator = separator || ', '
      lastSeparator = lastSeparator || ' and '
      var a = array.slice(), lastMember = a.pop();

      if (array.length > 2 && serial) lastSeparator = _s.rtrim(separator) + lastSeparator;

      return a.length ? a.join(separator) + lastSeparator + lastMember : lastMember;
    },

    toSentenceSerial: function() {
      var args = slice.call(arguments);
      args[3] = true;
      return _s.toSentence.apply(_s, args);
    },

    slugify: function(str) {
      if (str == null) return '';

      var from  = "ąàáäâãåæćęèéëêìíïîłńòóöôõøùúüûñçżź",
          to    = "aaaaaaaaceeeeeiiiilnoooooouuuunczz",
          regex = new RegExp(defaultToWhiteSpace(from), 'g');

      str = String(str).toLowerCase().replace(regex, function(c){
        var index = from.indexOf(c);
        return to.charAt(index) || '-';
      });

      return _s.dasherize(str.replace(/[^\w\s-]/g, ''));
    },

    surround: function(str, wrapper) {
      return [wrapper, str, wrapper].join('');
    },

    quote: function(str) {
      return _s.surround(str, '"');
    },

    exports: function() {
      var result = {};

      for (var prop in this) {
        if (!this.hasOwnProperty(prop) || prop.match(/^(?:include|contains|reverse)$/)) continue;
        result[prop] = this[prop];
      }

      return result;
    },

    repeat: function(str, qty, separator){
      if (str == null) return '';

      qty = ~~qty;

      // using faster implementation if separator is not needed;
      if (separator == null) return strRepeat(String(str), qty);

      // this one is about 300x slower in Google Chrome
      for (var repeat = []; qty > 0; repeat[--qty] = str) {}
      return repeat.join(separator);
    },

    levenshtein: function(str1, str2) {
      if (str1 == null && str2 == null) return 0;
      if (str1 == null) return String(str2).length;
      if (str2 == null) return String(str1).length;

      str1 = String(str1); str2 = String(str2);

      var current = [], prev, value;

      for (var i = 0; i <= str2.length; i++)
        for (var j = 0; j <= str1.length; j++) {
          if (i && j)
            if (str1.charAt(j - 1) === str2.charAt(i - 1))
              value = prev;
            else
              value = Math.min(current[j], current[j - 1], prev) + 1;
          else
            value = i + j;

          prev = current[j];
          current[j] = value;
        }

      return current.pop();
    }
  };

  // Aliases

  _s.strip    = _s.trim;
  _s.lstrip   = _s.ltrim;
  _s.rstrip   = _s.rtrim;
  _s.center   = _s.lrpad;
  _s.rjust    = _s.lpad;
  _s.ljust    = _s.rpad;
  _s.contains = _s.include;
  _s.q        = _s.quote;

  // Exporting

  // CommonJS module is defined
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
      module.exports = _s;

    exports._s = _s;
  }

  // Register as a named module with AMD.
  if (typeof define === 'function' && define.amd)
    define('underscore.string', [], function(){ return _s; });


  // Integrate with Underscore.js if defined
  // or create our own underscore object.
  root._ = root._ || {};
  root._.string = root._.str = _s;
}(this, String);

},{}],1:[function(require,module,exports){
var Router = require('./router');
var adminui = window.$a = require('./adminui');

var router = new Router({app: adminui});
adminui.start({router: router});
},{"./adminui":2,"./router":3}],2:[function(require,module,exports){
var _ = require('underscore');
_.str = require('underscore.string');

var Backbone = require('backbone');
require('backbone.stickit');
require('backbone.marionette');

var $ = require('jquery');
require('jquery.serializeObject');
require('bootstrap');
require('kevinykchan-bootstrap-typeahead');

var Pinger = require('./ping');

/* Extend jQuery with functions for PUT and DELETE requests. */
function _ajax_request(url, data, callback, type, method) {
    if (jQuery.isFunction(data)) {
      callback = data;
      data = {};
    }
    return jQuery.ajax({
        type: method,
        url: url,
        data: data,
        success: callback,
        dataType: type
    });
}

$.extend({
    put: function(url, data, callback, type) {
        return _ajax_request(url, data, callback, type, 'PUT');
    },
    delete_: function(url, data, callback, type) {
        return _ajax_request(url, data, callback, type, 'DELETE');
    }
});


var AdminUI = new Backbone.Marionette.Application();

AdminUI.addInitializer(function(options) {
    AdminUI.addRegions({chrome:"#chrome"});
});

AdminUI.on("initialize:after", function(options) {
    this.router = options.router;
    this.router.go();
    Backbone.history.start({pushState: true});

    this.pinger = new Pinger();
    this.pinger.start();
});

module.exports = AdminUI;
},{"underscore":"GoDQOv","underscore.string":"HlCq4P","backbone":"/Z1EQg","backbone.stickit":"EWWZiB","backbone.marionette":"WHZV4H","jquery":"1Pax6e","jquery.serializeObject":"QwqQr0","bootstrap":"zq0vg5","kevinykchan-bootstrap-typeahead":"aA5yKD","./ping":4}],3:[function(require,module,exports){
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var User = require('./models/user');
var SigninView = require('./views/signin');
var AppView = require('./views/app');

var Views = {
    'vms': require('./views/vms'),
    'vm': require('./views/vm'),
    'provision-vm': require('./views/provision-vm'),
    'servers': require('./views/servers'),
    'server': require('./views/server'),
    'dashboard': require('./views/dashboard'),
    'users': require('./views/users'),
    'user': require('./views/user'),
    'packages': require('./views/packages'),
    'images': require('./views/images'),
    'image': require('./views/image'),
    'image-import': require('./views/image-import'),
    'jobs': require('./views/jobs'),
    'networks': require('./views/networks')
};

module.exports = Backbone.Marionette.AppRouter.extend({
    routes: {
        'signin': 'showSignin',
        'vms': 'showVms',
        'vms/:uuid': 'showVm',
        'users/:uuid': 'showUser',
        'image-import': 'showImageImport',
        'images/:uuid': 'showImage',
        'networks/:uuid': 'showNetwork',
        'packages/:uuid': 'showPackage',
        'monitoring': 'showMonitoring',
        'servers/:uuid': 'showServer',
        '*default': 'defaultAction'
    },

    initialize: function(options) {
        _.bindAll(this);
        this.app = options.app;
    },

    go: function() {
        this.app.vent.on('showview', this.presentView, this);
        this.app.vent.on('signout', this.signout, this);

        // holds the state of the currently logged in user
        this.app.user = this.user = new User();

        this.user.on('change:uuid', function(user) {
            window.sessionStorage.setItem('user-uuid', user.get('uuid'));
        });

        this.user.on('change:adminUuid', function(user) {
            window.sessionStorage.setItem('admin-uuid', user.get('adminUuid'));
        });

        this.user.on('change:login', function(user) {
            window.sessionStorage.setItem('user-login', user.get('login'));
        });

        this.user.on('change:token', function(user) {
            var token = user.get('token');

            if (token === null) {
                window.sessionStorage.clear();
                $.ajaxSetup({ headers:{} });
            } else {
                window.sessionStorage.setItem('api-token', token);
                $.ajaxSetup({ headers:{'x-adminui-token': token} });

                if (typeof(Backbone.history.fragment) !== 'undefined') {
                    Backbone.history.loadUrl(Backbone.history.fragment);
                }
            }
        }, this);

        this.user.set('token', window.sessionStorage.getItem('api-token'));
        this.user.set('uuid', window.sessionStorage.getItem('user-uuid'));
        this.user.set('login', window.sessionStorage.getItem('user-login'));
        this.user.set('adminUuid', window.sessionStorage.getItem('admin-uuid'));

        var self = this;

        $(document).ajaxError(function(e, xhr, settings, exception) {
            if (xhr.status == 403) {
                window.sessionStorage.removeItem('api-token');
                self.showSignin.call(self);
                return;
            }
        });
     },

     defaultAction: function(page) {
        console.log(_.str.sprintf('[route] defaultAction: %s', page));

        if (this.authenticated()) {
            page = page || 'dashboard';
            this.presentView(page);
        }
     },

     authenticated: function() {
        if (! this.user.authenticated()) {
            console.log('[app] not authenticated, showing sign in');
            this.showSignin();
            return false;
        } else {
            return true;
        }
     },

    presentView: function(viewName, args) {
        if (false === this.app.chrome.currentView instanceof AppView) {
            var appView = new AppView({user: this.user});
            this.app.chrome.show(appView);
        }
        console.log('presentView: ' + viewName);

        var View = Views[viewName];

        if (typeof(View) === 'undefined') {
            throw "View not found: " + viewName;
        }

        var view = new View(args);

        this.applySidebar(view);
        this.applyUrl(view);
        this.app.chrome.currentView.content.show(view, args);
    },

    applySidebar: function(view) {
        if (typeof(view.sidebar) === 'string') {
            this.app.vent.trigger('mainnav:highlight', view.sidebar);
        } else {
            this.app.vent.trigger('mainnav:highlight', view.name);
        }
    },

    applyUrl: function(view) {
        if (typeof(view.url) === 'function') {
            Backbone.history.navigate(view.url());
        } else if (typeof(view.url) === 'string') {
            Backbone.history.navigate(view.url);
        }
    },

    showVms: function() {
        if (this.authenticated())
            this.presentView('vms');
    },

    showNetwork: function(uuid) {
        if (this.authenticated())
            this.presentView('networks', { uuid: uuid });
    },

    showPackage: function(uuid) {
        if (this.authenticated())
            this.presentView('packages', { uuid: uuid });
    },

    showMonitoring: function() {
        if (this.authenticated())
            this.presentView('monitoring');
    },

    showImage: function(uuid) {
        if (this.authenticated())
            this.presentView('image', { uuid: uuid });
    },

    showImageImport: function() {
        if (this.authenticated())
            this.presentView('image-import');
    },

    showVm: function(uuid) {
        if (this.authenticated())
            this.presentView('vm', { uuid: uuid });
    },

    showUser: function(uuid) {
        if (this.authenticated()) {
            this.presentView('user', {uuid: uuid});
        }
    },

    showServer: function(uuid) {
        console.log(_.str.sprintf('[route] showServer: %s', uuid));
        if (this.authenticated()) {
            this.presentView('server', { uuid: uuid });
        }
    },

    showAnalytics: function() {
        if (this.authenticated()) {
            this.presentView('analytics');
        }
    },

    showSignin: function() {
        console.log('[route] showSignin');
        var signinView = new SigninView({model: this.user});
        this.app.chrome.show(signinView);
    },

    signout: function() {
        this.user.set('token', null);
        this.showSignin();
    }
});


},{"backbone":"/Z1EQg","backbone.marionette":"WHZV4H","./models/user":5,"./views/signin":6,"./views/app":7,"./views/vms":8,"./views/vm":9,"./views/provision-vm":10,"./views/servers":11,"./views/server":12,"./views/dashboard":13,"./views/users":14,"./views/user":15,"./views/packages":16,"./views/images":17,"./views/image":18,"./views/image-import":19,"./views/jobs":20,"./views/networks":21}],4:[function(require,module,exports){
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var Pinger = function(options) {
    this.options = options || {};
    this.options.interval = this.options.interval || (60 * 1000);
};

_.extend(Pinger, Backbone.Events);

Pinger.prototype.start = function() {
    this.timer = setInterval(this.ping, this.options.interval);
    this.ping();
};

Pinger.prototype.ping = function() {
    $.get('/_/ping', function() { console.log('.'); });
};

Pinger.prototype.stop = function() {
    clearInterval(this.timer);
};

module.exports = Pinger;

},{"jquery":"1Pax6e","underscore":"GoDQOv","backbone":"/Z1EQg"}],6:[function(require,module,exports){
var Backbone = require('backbone');


/**
 * ./signin !!
 */

var Marionette = require('backbone.marionette');
var tplSignin = require('../tpl/signin.hbs');

var View = Marionette.ItemView.extend({
    attributes: {
        id: "signin"
    },

    template: tplSignin,

    events: {
      'submit form': 'authenticate'
    },

    modelEvents: {
        'change:authenticated': 'didAuthenticate',
        'error': 'didError'
    },

    ui: {
        'alert': '.alert',
        'alertmsg': '.alert .msg',
        'usernameField' : 'input[name=username]',
        'passwordField' : 'input[name=password]'
    },

    didAuthenticate: function(user, value) {
        if (value === true) {
            this.close();
        }
    },

    didError: function(message) {
        this.showMessage(message);
        this.ui.passwordField.val('');
    },

    initialize: function(options) {
        this.model = options.model;
    },

    showMessage: function(msg) {
        this.ui.alertmsg.html(msg);
        this.ui.alert.show();
    },

    hideMessage: function(e) {
        this.ui.alert.hide();
    },

    focus: function() {
        if (this.ui.usernameField.val().length === 0) {
            this.ui.usernameField.focus();
        } else {
            this.ui.passwordField.focus();
        }
    },

    authenticate: function(e) {
        e.preventDefault();
        this.hideMessage();
        this.model.authenticate(
            this.ui.usernameField.val(),
            this.ui.passwordField.val()
        );
    },

    onRender: function() {
        this.hideMessage();
    },

    onShow: function() {
        this.focus();
    }

});

module.exports = View;


},{"backbone":"/Z1EQg","backbone.marionette":"WHZV4H","../tpl/signin.hbs":22}],5:[function(require,module,exports){
var Backbone = require('backbone');
/**
 * models/user
 */

var Model = require('./model');

module.exports = Model.extend({

    defaults: {
        token: null
    },
    idAttribute: 'uuid',
    urlRoot: "/_/users",

    authenticated: function() {
        return this.get('token') !== null;
    },

    authenticate: function(user, pass) {
        var self = this;

        if (user.length === 0 || pass.length === 0) {
            this.trigger('error', 'Username and Password Required');
            return false;
        }

        var authData = {
            username: user,
            password: pass
        };

        $.post("/_/auth", authData, function(data) {
            data.user.token = data.token;
            self.set(data.user);
            self.set('adminUuid', data.adminUuid);
        }).error(function(xhr) {
            var err = JSON.parse(xhr.responseText);
            self.trigger('error', err.message);
        });
    },

    signout: function() {
        $.ajax({
            url: "/_/auth",

            success: function() {
                this.set({
                    authenticated: false
                });
            },

            type: "DELETE",
            context: this
        });
    }
});
},{"backbone":"/Z1EQg","./model":23}],7:[function(require,module,exports){


/**
 * ./app
 *
 * This module manages the Layout & Pane for
 * the application
 */


var Backbone = require('backbone');

var adminui = require('../adminui');
var Topbar = require('./topbar');
var Mainnav = require('./mainnav');
var JobProgressView = require('./job-progress');

var tplChrome = require('../tpl/chrome.hbs');

var AppView = Backbone.Marionette.Layout.extend({
    template: tplChrome,
    attributes: {id:"app"},

    regions: {
        'topbar': "#topbar",
        'mainnav': "#mainnav",
        'content': "#content"
    },

    initialize: function(options) {
        this.options = options || {};
        this.user = options.user;

        this.topbarView = new Topbar({ user: this.user });
        this.mainnavView = new Mainnav();

        this.bindTo(adminui.vent, 'error', this.onError, this);
        this.bindTo(adminui.vent, 'showjob', this.onShowjob, this);
    },

    onError: function(err) {
        err = err || {};
        if (err.xhr && err.xhr.status >= 500) {
            if (err.xhr.responseText.length) {
                var json = JSON.parse(err.xhr.responseText);
                err.responseBody = JSON.stringify(json, null, 2);
            }
            var tpl = require('../tpl/error.hbs');
            $(tpl(err)).modal();
        }
    },

    onShowjob: function(job) {
        var jobView = new JobProgressView({model: job});
        jobView.show();
    },

    onRender: function() {
        this.mainnav.attachView(this.mainnavView);
        this.mainnavView.setElement(this.$("#mainnav"));

        this.topbar.attachView(this.topbarView);
        this.topbarView.setElement(this.$("#topbar"));
        this.topbarView.renderLoginName();

        return this;
    }
});
module.exports = AppView;


},{"backbone":"/Z1EQg","../tpl/chrome.hbs":24,"../tpl/error.hbs":25,"../adminui":2,"./topbar":26,"./mainnav":27,"./job-progress":28}],8:[function(require,module,exports){


/**
 * ./vms.js
 */
var app = require('../adminui');
var Backbone = require('backbone');

var Vms = require('../models/vms');
var VmsList = require('./vms-list');
var VmsTemplate = require('../tpl/vms.hbs');

var FilterForm = Backbone.View.extend({
    events: {
        'submit form': 'onSubmit',
        'change input': 'onSubmit',
        'change select': 'onSubmit'
    },
    onSubmit: function(e) {
        e.preventDefault();

        var params = this.$('form').serializeObject();
        this.trigger('query', params);
    }
});

module.exports = Backbone.Marionette.ItemView.extend({
    name: 'vms',
    template: VmsTemplate,

    url: function() {
        return 'vms';
    },

    events: {
        'click .provision-button':'provision',
        'click .toggle-filter':'toggleFiltersPanel'
    },

    initialize: function(options) {
        this.collection = new Vms();
        this.listView = new VmsList({ collection: this.collection });
        this.filterView = new FilterForm();
        this.filterViewVisible = false;
        this.collection.fetch();
    },

    provision: function() {
        app.vent.trigger('showview', 'provision-vm', {});
    },


    toggleFiltersPanel: function(e) {
        var filterPanel = this.$('.vms-filter');
        var vmsList = this.$('.vms-list');
        if (this.filterViewVisible) {
            filterPanel.hide();
            vmsList.removeClass('span9').addClass('span12');
            this.filterViewVisible = false;
        } else {
            filterPanel.show();
            vmsList.addClass('span9').removeClass('span12');
            this.filterViewVisible = true;
        }
    },

    query: function(params) {
        this.$('.alert').hide();
        this.collection.fetch({ data: params });
    },

    onError: function(model, res) {
        if (res.status == 409) {
            var obj = JSON.parse(res.responseText);
            var errors = _.map(obj.errors, function(e) {
                return e.message;
            });
            this.$(".alert").html(errors.join('<br>')).show();
        } else {
            app.vent.trigger('error', {
                xhr: res,
                context: 'vms / vmapi'
            });
        }
    },

    onShow: function() {
        this.$('.alert').hide();
        this.$('.vms-filter').hide();
    },

    updateCount: function() {
        this.$('.record-count').html(this.collection.length);
    },

    onRender: function() {
        this.bindTo(this.collection, 'error', this.onError, this);
        this.listView.setElement(this.$('tbody')).render();
        this.filterView.setElement(this.$('.vms-filter'));

        this.bindTo(this.filterView, 'query', this.query, this);
        this.bindTo(this.collection, 'reset', this.updateCount, this);
        return this;
    }
});

},{"backbone":"/Z1EQg","../tpl/vms.hbs":29,"../adminui":2,"../models/vms":30,"./vms-list":31}],9:[function(require,module,exports){
var Backbone = require('backbone');

var Vm = require('../models/vm');
var Img = require('../models/image');
var Server = require('../models/server');
var User = require('../models/user');
var Probes = require('../models/probes');

var VMDeleteModal = require('./vm-delete-modal');
var TagsList = require('./tags-list');
var NicsList = require('./nics');
var MetadataList = require('./metadata');
var SnapshotsList = require('./snapshots');

var ResizeVmView = require('./resize-vm');

var JobProgressView = require('./job-progress');
var VmChangeOwner = require('./vm-change-owner');
var NotesView = require('./notes');
var CreateProbeController = require('../controllers/create-probe');

var adminui = require('../adminui');

var tplVm = require('../tpl/vm.hbs');


/**
 * VmView
 *
 * options.uuid uuid of VM
 * options.vm vm attrs
 */
var VmView = Backbone.Marionette.ItemView.extend({
    template: tplVm,
    id: 'page-vm',
    sidebar: 'vms',
    events: {
        'click .server-hostname': 'clickedServerHostname',
        'click .start': 'clickedStartVm',
        'click .stop': 'clickedStopVm',
        'click .reboot': 'clickedRebootVm',
        'click .delete': 'clickedDeleteVm',
        'click .create-probe': 'clickedCreateProbe',
        'click .rename': 'clickedRename',
        'click .owner-name': 'clickedOwnerName',
        'click .package': 'clickedPackage',
        'click .image-name-version': 'clickedImage',
        'click .resize': 'clickedResize',
        'click .change-owner': 'clickChangeOwner'
    },

    url: function() {
        return _.str.sprintf('vms/%s', this.vm.get('uuid'));
    },

    initialize: function(options) {
        _.bindAll(this);

        this.vent = adminui.vent;

        if (options.uuid) this.vm = new Vm({
            uuid: options.uuid
        });
        if (options.vm) this.vm = options.vm;

        this.owner = new User();
        this.image = new Img();
        this.server = new Server();

        this.image.set({
            uuid: this.vm.get('image_uuid')
        });

        if (!this.image.get('updated_at')) this.image.fetch();

        this.server.set({
            uuid: this.vm.get('server_uuid')
        });
        if (!this.server.get('last_modified')) {
            this.server.fetch();
        }

        this.owner.set({
            uuid: this.vm.get('owner_uuid')
        });
        if (!this.owner.get('cn')) {
            this.owner.fetch();
        }


        this.vm.on('change:image_uuid', function(m) {
            this.image.set({
                uuid: m.get('image_uuid')
            });
            this.image.fetch();
        }, this);


        this.vm.on('change:owner_uuid', function(m) {
            this.owner.set({
                uuid: m.get('owner_uuid')
            });
            this.owner.fetch();
        }, this);

        this.vm.on('change:server_uuid', function(m) {
            this.server.set({
                uuid: m.get('server_uuid')
            });
            this.server.fetch();
        }, this);

        this.vm.on('change:customer_metadata', function(m) {
            this.renderMetadata();
        }, this);

        this.vm.on('change:tags', function() {
            this.renderTags();
        }, this);

        this.vm.on('change:nics', function() {
            this.renderNics();
        }, this);

        this.metadataListView = new MetadataList({
            vm: this.vm
        });
        this.tagsListView = new TagsList({
            vm: this.vm
        });

        this.vm.fetch();
    },

    clickedStartVm: function(e) {
        var self = this;
        this.vm.start(function(job) {
            var jobView = new JobProgressView({
                model: job
            });
            jobView.show();
        });
    },

    clickedResize: function() {
        var view = new ResizeVmView({
            vm: this.vm
        });
        view.show();
    },

    clickedOwnerName: function(e) {
        e.preventDefault();
        this.vent.trigger('showview', 'user', {
            user: this.owner
        });
    },

    clickedPackage: function(e) {
        e.preventDefault();
        this.vent.trigger('showview', 'packages', {
            uuid: this.vm.get('billing_id')
        });
    },

    clickedImage: function(e) {
        e.preventDefault();
        this.vent.trigger('showview', 'image', {
            uuid: this.vm.get('image_uuid')
        });
    },

    clickedCreateProbe: function() {
        var createProbeController = new CreateProbeController({
            vm: this.vm
        });
    },

    clickedStopVm: function(e) {
        var self = this;
        this.vm.stop(function(job) {
            var jobView = new JobProgressView({
                model: job
            });
            jobView.show();
        });
    },

    clickedRebootVm: function(e) {
        var self = this;
        this.vm.reboot(function(job) {
            var jobView = new JobProgressView({
                model: job
            });
            jobView.show();
        });
    },

    clickedDeleteVm: function(e) {
        var vmDeleteView = new VMDeleteModal({
            vm: this.vm,
            owner: this.owner
        });
        vmDeleteView.show();
    },

    clickChangeOwner: function() {
        var vmChangeOwner = new VmChangeOwner({
            vm: this.vm
        });
        vmChangeOwner.show();
    },

    clickedServerHostname: function() {
        this.vent.trigger('showview', 'server', {
            server: this.server
        });
    },

    clickedRename: function() {
        var self = this;
        var renameBtn = this.$('.alias .rename');
        var value = this.$('.alias .value');

        renameBtn.hide();
        value.hide();

        var input = $('<input type="text">').val(this.vm.get('alias'));
        var save = $('<button class="btn btn-primary btn-mini">').html('Save');
        var cancel = $('<button class="btn btn-cancel btn-mini">').html('Cancel');
        this.$('.alias').append(input);
        this.$('.alias').append(save);
        this.$('.alias').append(cancel);
        cancel.click(cancelAction);
        save.click(saveAction);
        input.focus();

        function saveAction() {
            value.html(input.val());
            self.vm.set({
                alias: input.val()
            });
            self.vm.saveAlias();
            cancelAction();
        }

        function cancelAction() {
            renameBtn.show();
            input.remove();
            save.remove();
            cancel.remove();
            value.show();
        }
    },

    renderTags: function() {
        this.tagsListView.setElement(this.$('.tags')).render();
    },

    renderNics: function() {
        this.nicsList.render();
    },

    renderMetadata: function() {
        this.metadataListView.setElement(this.$('.metadata')).render();
    },

    renderSnapshots: function() {
        this.snapshotsListView.render();
    },

    onRender: function() {
        this.nicsList = new NicsList({
            vm: this.vm,
            el: this.$('.nics')
        });
        this.snapshotsListView = new SnapshotsList({
            vm: this.vm,
            el: this.$('.snapshots')
        });

        this.notesView = new NotesView({
            itemUuid: this.vm.get('uuid'),
            el: this.$('.notes')
        });
        this.notesView.render();

        this.renderTags();
        this.renderMetadata();
        this.renderSnapshots();
        this.renderNics();

        this.stickit(this.image, {
            '.image-uuid': 'uuid',
            '.image-name-version': {
                observe: ['name', 'version'],
                onGet: function(val, attr) {
                    return val[0] + val[1];
                }
            }
        });

        this.stickit(this.owner, {
            '.owner-name': 'cn',
            '.owner-uuid': 'uuid'
        });

        this.stickit(this.vm, {
            '.vm-alias': 'alias',
            '.vm-memory': 'ram',
            '.vm-swap': 'max_swap',
            '.vm-uuid': 'uuid',
            '.vm-state': {
                observe: 'state',
                attributes: [{
                    'name': 'class',
                    onGet: function(state) {
                        return state;
                    }
                }]
            },
            '.vm-ips': {
                observe: 'nics',
                onGet: function(val) {
                    if (val.length) {
                        var ips = _.map(val, function(nic) {
                            return nic.ip;
                        });
                        return ips.join(',');
                    }
                }
            },
            '.package': {
                attributes: [{
                    name: 'href',
                    observe: 'billing_id',
                    onGet: function(val) {
                        return '/packages/' + val;
                    }
                }]
            },
            '.package-name': 'package_name',
            '.package-version': 'package_version',
            '.billing-id': 'billing_id'
        });

        this.stickit(this.server, {
            '.server-hostname': 'hostname',
            '.server-uuid': 'uuid'
        });


        return this;
    }

});

module.exports = VmView;
},{"backbone":"/Z1EQg","../tpl/vm.hbs":32,"../models/vm":33,"../models/image":34,"../models/server":35,"../models/user":5,"../models/probes":36,"./vm-delete-modal":37,"./tags-list":38,"./nics":39,"./metadata":40,"./snapshots":41,"./job-progress":28,"./vm-change-owner":42,"./notes":43,"../controllers/create-probe":44,"../adminui":2,"./resize-vm":45}],11:[function(require,module,exports){
var Backbone = require('backbone');


/**
* ./servers.js
*/


var adminui = require('../adminui');
var Servers = require('../models/servers');
var tplServers = require('../tpl/servers.hbs');

var ServersListItem = Backbone.Marionette.ItemView.extend({
    template: require('../tpl/servers-list-item.hbs'),
    tagName: 'tr',

    events: {
        'click td':'navigateToServerDetails',
        'click button.setup':'setupServer'
    },

    url: function() {
        return 'servers';
    },
    templateHelpers: {
        running: function() {
            return this.status == 'running';
        },
        not_setup: function() {
            return this.setup == 'false';
        },
        memory_percent: function() {
            var free = (this.memory_total_bytes-this.memory_available_bytes);
            return _.str.sprintf("%0.1f", free / this.memory_total_bytes * 100);
        },
        'memory_available_mb': function() {
            return _.str.sprintf("%0.1f", this.memory_available_bytes/1024/1024);
        },
        'memory_total_mb': function() {
            return _.str.sprintf("%0.1f", this.memory_total_bytes/1024/1024);
        }
    },
    setupServer: function(e) {
        e.stopPropagation();

        console.log('Setup server');

        this.model.setup(function(res) {
            console.log('Setup Server returned');
            console.log(res);
        });
    },

    navigateToServerDetails: function() {
        adminui.vent.trigger('showview', 'server', { server:this.model });
    }
});

var FilterForm = Backbone.View.extend({
    events: {
        'submit form': 'onSubmit',
        'change input': 'onSubmit',
        'change select': 'onSubmit'
    },
    onSubmit: function(e) {
        e.preventDefault();

        var params = this.$('form').serializeObject();
        this.trigger('query', params);
    }
});

var ServersView = Backbone.Marionette.CompositeView.extend({
    name: 'servers',
    id: 'page-servers',
    template: tplServers,
    itemView: ServersListItem,
    itemViewContainer: 'tbody',
    events: {
        'click .toggle-filter':'toggleFiltersPanel'
    },
    ui: {
        'filterPanel': '.filter-panel',
        'serversList': '.servers-list'
    },

    url: function() {
        return 'servers';
    },

    initialize: function(options) {
        this.filterForm = new FilterForm();
        this.collection = new Servers();
        this.collection.fetch();
    },
    filter: function(params) {
        this.collection.fetch({data: params});
    },
    toggleFiltersPanel: function(e) {
        if (this.filterViewVisible) {
            this.ui.filterPanel.hide();
            this.ui.serversList.removeClass('span9').addClass('span12');
            this.filterViewVisible = false;
        } else {
            this.ui.filterPanel.show();
            this.ui.serversList.addClass('span9').removeClass('span12');
            this.filterViewVisible = true;
        }
    },
    onError: function(model, xhr) {
        adminui.vent.trigger('error', {
            context: 'servers / cnapi',
            xhr: xhr
        });
    },
    onRender: function() {
        this.filterForm.setElement(this.$('.servers-filter'));
        this.bindTo(this.filterForm, 'query', this.filter, this);
        this.bindTo(this.collection, 'error', this.onError, this);
        this.ui.filterPanel.hide();
    }
});

module.exports = ServersView;


},{"backbone":"/Z1EQg","../tpl/servers.hbs":46,"../tpl/servers-list-item.hbs":47,"../adminui":2,"../models/servers":48}],10:[function(require,module,exports){
var Backbone = require('backbone');


/**
 * ./provision-vm.js
 *
 * Provision a VM
 */

var Base = require('./base');
var Images = require('../models/images');
var Users = require('../models/users');
var Package = require('../models/package');
var Packages = require('../models/packages');
var Servers = require('../models/servers');
var Networks = require('../models/networks');
var Vm = require('../models/vm');

var Job = require('../models/job');
var JobProgressView = require('./job-progress');
var PackagePreview = require('./package-preview');

var adminui = require('../adminui');

var PackageSelectOption = Backbone.Marionette.ItemView.extend({
    attributes: function() {
        return {
            name: this.model.get('name'),
            value: this.model.get('uuid')
        };
    },
    tagName: 'option',
    template: function(data) {
        return data.name + ' ' + data.version;
    }
});

var PackageSelect = Backbone.Marionette.CollectionView.extend({
    itemView: PackageSelectOption,
    tagName: 'select',
    events: {
        'change': 'onChange'
    },
    onChange: function(e) {
        var uuid = $(e.target).val();
        this.trigger('select', this.collection.get(uuid));
    }
});

var ProvisionVmTemplate = require('../tpl/provision-vm.hbs');

var View = Backbone.Marionette.ItemView.extend({
    name: 'provision-vm',

    sidebar: 'vms',

    template: ProvisionVmTemplate,

    events: {
        'submit form': 'provision',
        'change input': 'checkFields'
    },

    modelEvents: {
        'error': 'onError'
    },

    ui: {
        'form': 'form',
        'alert': '.alert'
    },

    initialize: function(options) {
        this.vent = adminui.vent;
        this.model = new Vm();
        this.packages = new Packages();
        this.packageSelect = new PackageSelect({
            collection: this.packages
        });
        this.selectedPackage = new Package();
        this.packagePreview = new PackagePreview({model: this.selectedPackage});

        this.packages.on('reset', function(collection) {
            this.selectedPackage.set(collection.models[0].attributes);
        }, this);

        this.packageSelect.on('select', function(pkg) {
            this.selectedPackage.set(pkg.attributes);
        }, this);

        this.imagesSource = [];
        this.usersSource = [];
        this.serversSource = [];

        this.usersCollection = new Users();
        this.imagesCollection = new Images();
        this.serversCollection = new Servers();
        this.networks = new Networks();

        this.usersCollection.on('reset', function(users) {
            this.userSource = [];
            users.each(function(u) {
                this.usersSource.push(u);
            }, this);
        }, this);

        this.imagesCollection.on('reset', function(images) {
            images.each(function(u) {
                this.imagesSource.push(u);
            }, this);
        }, this);

        this.serversCollection.on('reset', function(servers) {
            servers.each(function(u) {
                this.serversSource.push(u);
            }, this);
        }, this);

        this.networks.on('reset', function(networks) {
            this.populateNetworks(networks);
        }, this);

        this.imagesCollection.fetch();
        this.usersCollection.searchByLogin('');
        this.networks.fetch();
        this.serversCollection.fetch();
        this.packages.fetchActive();
    },

    onRender: function() {

        this.packageSelect.setElement(this.$('select[name=package]')).render();
        this.$('.package-preview-container').append(this.packagePreview.render().el);

        this.hideError();

        this.$("input[name=image]").typeahead({
            source: this.imagesSource,
            labeler: function(obj) {
                return [obj.get('name'), obj.get('version')].join(" ");
            },
            valuer: function(obj) {
                return obj.get('uuid');
            }
        });

        this.$("input[name=server]").typeahead({
            source: this.serversSource,
            labeler: function(obj) {
                return obj.get('hostname');
            },
            valuer: function(obj) {
                return obj.get('uuid');
            }
        });


        this.$("input[name=owner]").typeahead({
            source: this.usersSource,
            labeler: function(obj) {
                return [obj.get('login'), obj.get('cn')].join(" - ");
            },
            valuer: function(obj) {
                return obj.get('uuid');
            }
        });

        this.checkFields();

        return this;
    },

    populateNetworks: function(networks) {
        var container = this.$('.network-checkboxes');
        var elm = container.find('label:first').clone();
        container.find('label').remove();
        networks.each(function(n) {
            elm.find('.name').html(
            [n.get('name'), n.get('subnet')].join(' - '));
            elm.find('input').val(n.get('uuid'));
            elm.clone().prependTo(container);
        }, this);
    },


    checkFields: function() {
        this.hideError();
        var values = this.extractFormValues();
        var valid;
        var image_uuid;

        if (!values.owner_uuid.length || !values.networks.length) {
            valid = false;
        } else {
            valid = true;
        }

        if (!values.image_uuid && (!values.disks || !values.disks[0] || !values.disks[0].image_uuid)) {
            valid = valid && false;
        } else {
            image_uuid = values['image_uuid'] || values['disks'][0]['image_uuid'];
            valid = valid && true;
        }

        if (valid) {
            this.enableProvisionButton();
        } else {
            this.disableProvisionButton();
        }


        if (image_uuid) {
            var image = this.imagesCollection.get(image_uuid);
            if (image && image.requirements && image.requirements['brand']) {
                this.$('.control-group-brand').hide();
            } else {
                this.$('.control-group-brand').show();
            }

            if (image.get('type') === 'zvol') {
                this.$('.control-group-brand').find('[name=brand]').val('kvm');
                this.$('.control-group-brand').hide();
            } else {
                this.$('.control-group-brand').show();
            }

            if (image.get('os') === 'smartos') {
                this.$('.control-group-brand option[value=kvm]').attr('disabled', true);
            } else {
                this.$('.control-group-brand option[value=kvm]').removeAttr('disabled');
            }
        } else {
            this.$('.control-group-brand').hide();
        }
    },

    disableProvisionButton: function() {
        this.$('button[type=submit]').attr('disabled', 'disabled');
    },

    enableProvisionButton: function() {
        this.$('button[type=submit]').removeAttr('disabled');
    },

    extractFormValues: function() {
        var formData = this.ui.form.serializeObject();
        var values = {
            image_uuid: formData.image,
            ram: formData.memory,
            owner_uuid: formData.owner,
            brand: formData.brand,
            alias: formData.alias
        };

        if (formData.server) {
            values['server_uuid'] = formData.server;
        }

        if (formData.image) {
            var image = this.imagesCollection.get(formData.image);
            var imageReqs = image.get('requirements') || {};

            if (imageReqs['brand'] === 'kvm') {
                values['brand'] = 'kvm';
            }
            if (image.get('type') === 'zvol') {
                values['brand'] = 'kvm';
            }
        }


        var pkg = this.packages.get(formData['package']);

        if (pkg) {
            values['billing_id'] = pkg.get('uuid');
            values['package_name'] = pkg.get('name');
            values['package_version'] = pkg.get('version');
            values['cpu_cap'] = pkg.get('cpu_cap');
            values['max_lwps'] = pkg.get('max_lwps');
            values['max_swap'] = pkg.get('max_swap');
            values['quota'] = pkg.get('quota');
            values['vcpus'] = pkg.get('vcpus');
            values['zfs_io_priority'] = pkg.get('zfs_io_priority');
            values['ram'] = pkg.get('max_physical_memory');
        }

        if (values['brand'] === 'kvm') {
            values['disks'] = [
                {'image_uuid': values['image_uuid'] },
                {'size': values['quota'] }
            ];
            delete values['image_uuid'];
        }


        var networksChecked = this.ui.form.find('.network-checkboxes input[type=checkbox]:checked');
        values.networks = _.map(networksChecked, function(obj) {
            return $(obj).val();
        });

        return values;
    },

    hideError: function() {
        this.ui.alert.hide();
    },

    onError: function(model, xhr, options) {
        var fieldMap = {
            'image_uuid': '[name=image]',
            'alias': '[name=alias]',
            'owner_uuid': '[name=owner]',
            'server_uuid': '[name=server]'
        };
        var err = xhr.responseData;
        this.ui.alert.find('.message').html(err.message);
        this.$('.control-group').removeClass('error');
        _.each(err.errors, function(errObj) {
            var field = $(fieldMap[errObj.field]);
            field.parents('.control-group').addClass('error');
        }, this);
        this.ui.alert.show();
    },

    provision: function(e) {
        var self = this;
        e.preventDefault();

        this.model.save(this.extractFormValues(), {
            success: function(m, obj) {
                var job = new Job({uuid: obj.job_uuid});
                var jobView = new JobProgressView({model: job});
                self.bindTo(jobView, 'execution', function(status) {
                    if (status == 'succeeded') {
                        adminui.vent.trigger('showview', 'vm', {uuid: obj.vm_uuid});
                    }
                });
                jobView.show();
            }
        });
    }

});
module.exports = View;

},{"backbone":"/Z1EQg","../tpl/provision-vm.hbs":49,"./base":50,"../models/images":51,"../models/package":52,"../models/packages":53,"../models/servers":48,"../models/networks":54,"../models/vm":33,"../models/job":55,"./job-progress":28,"./package-preview":56,"../adminui":2,"../models/users":57}],12:[function(require,module,exports){
var Backbone = require('backbone');

var app = require('../adminui');

var Server = require('../models/server');
var Nics = require('../models/nics');

var NotesView = require('./notes');
var BaseView = require('./base');
var TraitsModal = require('./traits-editor');
var JobProgressView = require('./job-progress');
var ChangeRackForm = require('./server-change-rack');
var ChangePlatformForm = require('./server-change-platform');
var ServerNicsView = require('./server-nics');
var ServerSetup = require('./server-setup');

var ServerTemplate = require('../tpl/server.hbs');
var ServerView = Backbone.Marionette.ItemView.extend({
    id: 'page-server',
    sidebar: 'servers',

    template: ServerTemplate,

    events: {
        'click .setup': 'showSetupModal',
        'click .change-rack-id': 'showChangeRackField',
        'click .change-platform': 'showChangePlatformField',
        'click .modify-traits': 'showTraitsModal',
        'click .factory-reset': 'factoryReset',
        'click .reboot': 'reboot',
        'click .forget': 'forget',
        'click .change-reserve': 'toggleReserve'
    },

    url: function() {
        return _.str.sprintf('servers/%s', this.model.get('uuid'));
    },

    modelEvents: {
        'change': 'render'
    },

    initialize: function(options) {
        this.model = options.server || new Server();

        if (options.uuid) {
            this.model.set({
                uuid: options.uuid
            });
            this.model.fetch();
        }

        this.nics = new Nics({
            belongs_to_type: 'server',
            belongs_to_uuid: this.model.get('uuid')
        });
        this.nics.fetchNics();
    },

    templateHelpers: {
        platform_version: function() {
            return this.sysinfo['Live Image'];
        },
        cpu_type: function() {
            return this.sysinfo['CPU Type'];
        },
        cpu_physical_cores: function() {
            return this.sysinfo['CPU Physical Cores'];
        },
        cpu_total_cores: function() {
            return this.sysinfo['CPU Total Cores'];
        },
        serial_number: function() {
            return this.sysinfo['Serial Number'];
        },
        total_memory: function() {
            return this.sysinfo['MiB of Memory'];
        }
    },

    serializeData: function() {
        var data = Marionette.ItemView.prototype.serializeData.call(this);
        data.disks = _.map(data.sysinfo['Disks'], function(v, k) {
            return {
                name: k,
                size: v['Size in GB']
            };
        });
        data.traits = _.map(data.traits, function(v, k) {
            return {
                name: k,
                value: v
            };
        });
        return data;
    },

    toggleReserve: function() {
        var newValue = !this.model.get('reserved');
        this.model.update({
            'reserved': newValue
        });
    },

    showChangePlatformField: function() {
        var self = this;
        var $link = this.$('.platform a');
        var view = new ChangePlatformForm({
            model: this.model
        });

        this.bindTo(view, 'cancel', function() {
            $link.show();
        }, this);

        this.bindTo(view, 'save', function(platform) {
            self.model.set({
                boot_platform: platform
            });
            view.remove();
            $link.show();
        });
        this.$('.platform').append(view.el);
        $link.hide();
        view.render();
    },

    showChangeRackField: function() {
        var self = this;
        var view = new ChangeRackForm({
            model: this.model
        });
        var $link = this.$('.rack td a');

        this.bindTo(view, 'cancel', function() {
            $link.show();
        }, this);

        this.bindTo(view, 'save', function(rack) {
            self.model.set({
                rack_identifier: rack
            });
            view.remove();
            $link.show();
        });
        this.$('.rack td').append(view.el);
        $link.hide();
        view.render();
    },

    showTraitsModal: function() {
        var modal = new TraitsModal({
            traits: this.model.get('traits')
        });
        var server = this.model;
        modal.show();
        this.bindTo(modal, 'save-traits', function(traits) {
            server.set({
                traits: traits
            });
            server.update({
                traits: traits
            }, function() {
                modal.close();
            });
        });
    },

    showSetupModal: function() {
        var view = new ServerSetup({
            model: this.model
        });
        view.render();
    },

    factoryReset: function() {
        this.model.factoryReset(function(job) {
            app.vent.trigger('showjob', job);
        });
    },

    reboot: function() {
        this.model.reboot(function(job) {
            app.vent.trigger('showjob', job);
        });
    },

    forget: function() {
        this.model.forget(function(err) {
            alert('Server Removed from Datacenter');
            app.vent.trigger('showview', 'servers');
        });
    },

    onRender: function() {
        this.notesView = new NotesView({
            itemUuid: this.model.get('uuid'),
            el: this.$('.notes')
        });
        this.notesView.render();
        this.nicsView = new ServerNicsView({
            nics: this.nics,
            el: this.$('.nics')
        });
        this.nicsView.render();
    }
});

module.exports = ServerView;
},{"backbone":"/Z1EQg","../tpl/server.hbs":58,"../adminui":2,"../models/server":35,"../models/nics":59,"./notes":43,"./base":50,"./traits-editor":60,"./job-progress":28,"./server-change-rack":61,"./server-change-platform":62,"./server-nics":63,"./server-setup":64}],13:[function(require,module,exports){


/**
 * ./dashboard.js
 *
 * Dashboard View
 **/

var Backbone = require('backbone');

var adminui = require('../adminui');
var AlarmsView = require('./alarms');
var DashboardTemplate = require('../tpl/dashboard.hbs');
var Dashboard = Backbone.Marionette.ItemView.extend({
    id: 'page-dashboard',
    name: 'dashboard',
    url: 'dashboard',
    template: DashboardTemplate,

    initialize: function() {
        this.alarmsView = new AlarmsView({
            userUuid: adminui.user.get('adminUuid')
        });
    },

    onRender: function() {
        this.alarmsView.setElement(this.$('#dashboard-alarms')).render();
        var self = this;
        $.getJSON("/_/stats/vm_count", function(res) {
            self.$('.vm-count').html(res.total);
        });
        $.getJSON("/_/stats/server_count", function(res) {
            self.$('.server-count').html(res.total);
        });

        return this;
    }
});

module.exports = Dashboard;
},{"backbone":"/Z1EQg","../tpl/dashboard.hbs":65,"../adminui":2,"./alarms":66}],15:[function(require,module,exports){
var Backbone = require('backbone');


var kb = require('knockback');
var BaseView = require('./base');
var VmsList = require('./vms-list');
var Vms = require('../models/vms');
var SSHKeys = require('../models/sshkeys');
var UserForm = require('./user-form');

var SSHKeyListItemTemplate = require('../tpl/sshkey-list-item.hbs');
var SSHKeyListItem = Backbone.Marionette.ItemView.extend({
    tagName: 'tr',
    template: SSHKeyListItemTemplate,
    events: {
        'click .remove': 'onClickRemove'
    },
    onClickRemove: function() {
        this.model.destroy();
    }
});

var SSHKeysList = Backbone.Marionette.CollectionView.extend({
    itemView: SSHKeyListItem
});

var User = require('../models/user');
var UserView = Marionette.ItemView.extend({
    template: require('../tpl/user.hbs'),
    id: 'page-user',
    events: {
        'click .edit-user': 'onClickEditUser',
        'click .add-key': 'onClickAddKey'
    },

    sidebar: 'users',

    url: function() {
        return _.str.sprintf('/users/%s', this.model.get('uuid'));
    },

    onClickEditUser: function(e) {
        var form = new UserForm({user: this.model});
        form.render();
    },

    onClickAddKey: function(e) {
        var AddKeyView = require('./sshkey-create');
        var view = new AddKeyView({
            user: this.model.get('uuid')
        });
        view.render();

        this.bindTo(view, 'saved', function(key) {
            this.sshkeys.add(key);
        }, this);
    },

    initialize: function(options) {
        if (options.user) {
            this.model = options.user;
        } else {
            this.model = new User({
                uuid: options.uuid
            });
        }
        this.model.fetch();

        this.bindTo(this.model, 'reset', this.render, this);

        this.vms = new Vms({
            params: {
                owner_uuid: this.model.get('uuid')
            }
        });
        this.vms.fetch();

        this.sshkeys = new SSHKeys({
            user: this.model.get('uuid')
        });
        this.sshkeys.fetch();

        this.vmsList = new VmsList({
            collection: this.vms
        });
        this.sshkeysList = new SSHKeysList({
            collection: this.sshkeys
        });
    },

    onRender: function() {
        this.vmsList.setElement(this.$('.vms-list tbody')).render();
        this.sshkeysList.setElement(this.$('.ssh-keys tbody')).render();

        var viewModel = kb.viewModel(
        this.model, {
            keys: ['company','uuid', 'cn', 'sn', 'email', 'login', 'memberof', 'member']
        });

        viewModel.member = ko.computed(function() {
            var mb = viewModel.memberof() || [];
            return mb.join(',');
        }, this);

        kb.applyBindings(viewModel, this.el);
    }
});

module.exports = UserView;

},{"backbone":"/Z1EQg","knockback":"XGgBAH","../tpl/sshkey-list-item.hbs":67,"../tpl/user.hbs":68,"./base":50,"./vms-list":31,"../models/vms":30,"../models/sshkeys":69,"./user-form":70,"../models/user":5,"./sshkey-create":71}],17:[function(require,module,exports){
var Backbone = require('backbone');



var moment = require('moment');
var Images = require('../models/images');
var app = require('../adminui');

var ImageRow = Backbone.Marionette.ItemView.extend({
    tagName: 'tr',
    template: require('../tpl/images-row.hbs'),
    events: {
        'click .image-name': 'onClickImageName'
    },
    onClickImageName: function(e) {
        if (e) {e.preventDefault(); }
        app.vent.trigger('showview', 'image', {image: this.model});
    },

    templateHelpers: {
        publish_date: function() {
            var d = moment(this.published_at);
            return d.format("MMM D, YYYY");
        },
        active: function() {
            return this.state == 'active';
        },
        unactivated: function() {
            return this.state == 'unactivated';
        },
        disabled: function() {
            return this.state == 'disabled';
        }
    }
});

var ImagesView = Backbone.Marionette.CompositeView.extend({
    template: require('../tpl/images.hbs'),
    url: 'images',
    sidebar: 'images',
    itemView: ImageRow,
    itemViewContainer: 'tbody',
    events: {
        'click .import-image': 'onClickImportImage'
    },
    initialize: function(opts) {
        this.collection = new Images();
        this.collection.fetch({data: {state:'all'}});
    },
    serializeData: function() {
        return {collection: this.collection};
    },
    onCompositeCollectionRendered: function()  {
        this.$('.record-count').html(this.collection.length);
    },
    onClickImportImage: function() {
        app.vent.trigger('showview', 'image-import');
    }
  });

module.exports = ImagesView;


},{"backbone":"/Z1EQg","moment":"t5BXmg","../tpl/images-row.hbs":72,"../tpl/images.hbs":73,"../models/images":51,"../adminui":2}],18:[function(require,module,exports){
var Backbone = require('backbone');


var adminui = require('../adminui');
var Img = require('../models/image');
var ImageView = Backbone.Marionette.ItemView.extend({
    sidebar: 'images',
    id: 'page-image',
    template: require('../tpl/image.hbs'),
    url: function() {
        return _.str.sprintf('images/%s', this.model.get('uuid'));
    },

    events: {
        'click .activate': 'onClickActivate',
        'click .disable': 'onClickDisable',
        'click .enable': 'onClickEnable',
        'click .add-file': 'onClickAddFile',
        'click .show-upload-form': 'onClickShowUploadForm',
        'click .cancel-upload-form': 'onClickCancelUploadForm',
        'click .start-upload': 'onClickStartUpload',
        'click .change-publicity': 'onClickChangePublicity',
        'change .fileinput': 'onSelectFile'
    },

    modelEvents: {
        'change': 'render',
        'error': 'onError'
    },

    templateHelpers: {
        'active': function() {
            return this.state === 'active';
        },

        'unactivated': function() {
            return this.state === 'unactivated';
        },

        'activatable': function() {
            return this.state !== 'active';
        },


        'enableable': function() {
            return this.disabled === true;
        },

        'disableable': function() {
            return this.disabled === false;
        }
    },

    initialize: function(options) {
        this.viewModel = new Backbone.Model();
        this.viewModel.set({
            uploadform: false,
            uploading: false
        });

        if (options.uuid) {
            this.model = new Img({uuid: options.uuid});
        } else if (options.image) {
            this.model = options.image;
        }
        this.model.fetch();

        this.bindTo(this.viewModel, 'change:uploadform', this.onChangeUploadForm, this);
        this.bindTo(this.viewModel, 'change:progress', this.onChangeProgress, this);
        this.bindTo(this.viewModel, 'change:file', this.onChangeFile, this);
    },

    onClickShowUploadForm: function() {
        this.viewModel.set({uploadform:true});
    },

    onClickCancelUploadForm: function() {
        this.viewModel.set({uploadform:false});
    },

    onClickChangePublicity: function() {
        var newVal = !this.model.get('public');
        var self = this;
        this.model.save({'public': newVal}, {success: function() {
            self.model.fetch();
        }});
    },

    onChangeProgress: function(model, value) {
        if (value) {
            this.$('li.progress').show();
        } else {
            this.$('li.progress').fadeOut();
        }
    },

    onChangeUploadForm: function(model, value) {
        if (value) {
            this.$('.add-file').html('Select image file to upload');
            this.$(".file").addClass("to-be-removed");
            this.$('.upload').show();
        } else {
            if (model.get('uploading') === false) {
                this.$(".file").removeClass("to-be-removed");
            }
            this.$('.upload').hide();
        }
        this.$('.upload button.start-upload').attr("disabled", 'disabled');
    },

    onError: function(model, res) {
        adminui.vent.trigger('error', {
            xhr: res,
            context: 'images / imgapi'
        });
    },

    onRender: function() {
        this.$("li.progress").hide();
    },

    onClickActivate: function(e) {
        e.preventDefault();
        var self = this;
        this.model.activate(function() {
            self.model.fetch();
        });
    },

    onClickDisable: function(e) {
        e.preventDefault();
        var self = this;
        this.model.disable(function() {
            self.model.fetch();
        });
    },

    onClickEnable: function(e) {
        e.preventDefault();
        var self = this;
        alert('blocked on imgapi.enableImage'); //XXX
        this.model.enable(function() {
            self.model.fetch();
        });
    },

    onClickAddFile: function() {
        this.$('.fileinput').click();
    },

    onChangeFile: function(model, file) {
        if (file) {
            this.$('.upload button.start-upload').removeAttr("disabled");
            this.$('.add-file').html(file.name);
        } else {
            this.$('.upload button.start-upload').attr("disabled", "disabled");
        }
    },

    onSelectFile: function(e) {
        var file = e.target.files[0] || e.dataTransfer.files[0];
        this.viewModel.set({file:file});
    },

    onClickStartUpload: function() {
        var xhr = new XMLHttpRequest();
        var file = this.viewModel.get('file');
        var compression = $('.upload .compression select').val();

        xhr.upload.addEventListener("progress", this.onUploadProgress.bind(this), false);
        xhr.addEventListener("load", this.onUploadComplete.bind(this), false);
        xhr.addEventListener("error", this.onUploadFailed.bind(this), false);
        xhr.addEventListener("abort", this.onUploadCancelled.bind(this), false);

        xhr.open("PUT", this.model.url() + "/file");
        xhr.setRequestHeader("Content-type", file.type);
        xhr.setRequestHeader("content-length", file.size);
        xhr.setRequestHeader("x-file-compression", compression);
        xhr.setRequestHeader('x-adminui-token', $.ajaxSettings.headers['x-adminui-token']);
        xhr.send(file);

        this.viewModel.set({uploadform: false});
        this.viewModel.set({uploading: true});
        this.viewModel.set({progress: true});
        return false;
    },

    onUploadProgress: function(e) {
        var pct = Math.floor(e.loaded/e.total * 100).toString() + '%';
        console.log(pct);
        this.$('li.progress .bar').css('width', pct);
    },

    onUploadComplete: function(e) {
        var self = this;
        this.viewModel.set({progress: false});
        this.viewModel.set({uploading: false});
        this.model.fetch();
    },

    onUploadFailed: function(e) {
        this.viewModel.set({uploading: false});
        console.log(e);
    },

    onUploadCancelled: function(e) {
        this.viewModel.set({uploading: false});
        console.log(e);
    }

});

module.exports = ImageView;

},{"backbone":"/Z1EQg","../tpl/image.hbs":74,"../adminui":2,"../models/image":34}],19:[function(require,module,exports){
var Backbone = require('backbone');


var app = require('../adminui');
var Img = require('../models/image');
var ImageImportTemplate = require('../tpl/image-import.hbs');
var ImageImportView = Backbone.Marionette.ItemView.extend({
    id: 'page-image-import',
    sidebar: 'images',
    url: 'image-import',
    template: ImageImportTemplate,
    events: {
        'click input[name=import-source]': 'onChangeImportSource',
        'click button.import': 'onClickImport',
        'submit form': 'onClickImport'
    },
    ui: {
        'urlControlGroup': '.control-group.url',
        'manifestControlGroup': '.control-group.manifest',
        'importSource': 'input[name=import-source]',
        'alert': '.alert'
    },
    onShow: function() {
        this.ui.manifestControlGroup.hide();
        this.ui.urlControlGroup.hide();
        this.ui.alert.hide();
    },
    onChangeImportSource: function() {
        var val = this.ui.importSource.filter(':checked').val();
        if (val === 'manifest') {
            this.ui.urlControlGroup.hide();
            this.ui.manifestControlGroup.show();
        } else {
            this.ui.urlControlGroup.show();
            this.ui.manifestControlGroup.hide();
        }
    },
    showError: function(message) {
        this.ui.alert.html(message);
        this.ui.alert.show();
    },
    onClickImport: function(e) {
        e.preventDefault();
        var self = this;
        var val = this.ui.importSource.filter(':checked').val();
        if (val == 'manifest') {
            var manifestJSON = this.$("textarea[name=manifest]").val();
            var manifest;
            try {
                manifest = JSON.parse(manifestJSON);
            } catch (ex) {
                self.showError('Invalid Image Manifest JSON: ' + ex.message);
                return;
            }

            var img = new Img(manifest);
            img.adminImport().done(function(a, b, c) {
                app.vent.trigger('showview', 'image', {uuid: img.get('uuid')});
            }).fail(function(xhr, jqErr, statusText) {
                console.log(statusText, 'statusText');
                if (statusText == 'Conflict') {
                    var err = JSON.parse(xhr.responseText);
                    self.showError(err.message);
                } else {
                    app.vent.trigger('error', {
                        xhr: xhr,
                        context: 'images / imgapi'
                    });
                }
            });
        } else {
            alert('not implemented yet');
            // ...
        }

        return false;
    }
});

module.exports = ImageImportView;

},{"backbone":"/Z1EQg","../tpl/image-import.hbs":75,"../adminui":2,"../models/image":34}],20:[function(require,module,exports){
var adminui = require('../adminui');
var Backbone = require('backbone');
var Jobs = require('../models/jobs');

var JobProgressView = require('./job-progress');

var JobsItemViewTemplate = require('../tpl/jobs-item.hbs');
var JobsItemView = Backbone.Marionette.ItemView.extend({
    template: JobsItemViewTemplate,
    tagName: 'tr',
    events: {
        "click button.details": "showJobDetails"
    },
    showJobDetails: function() {
        var detailsView = new JobProgressView({
            model: this.model
        });
        detailsView.show();
    }
});


var JobsTemplate = require('../tpl/jobs.hbs');

var JobsItemEmptyView = Backbone.Marionette.ItemView.extend({
    template: '<div class="well">There are no jobs to show.</div>'
});

var JobsView = Backbone.Marionette.CompositeView.extend({
    name: 'jobs',
    id: 'page-jobs',
    template: JobsTemplate,
    url: function() {
        return '/jobs';
    },
    itemView: JobsItemView,
    emptyView: JobsItemEmptyView,
    itemViewContainer: 'tbody',
    initialize: function() {
        this.collection = new Jobs();
        this.collection.fetch();
        this.bindTo(this.collection, 'error', this.onError);
    },

    onError: function(model, xhr) {
        adminui.vent.trigger('error', {
            context: 'workflow via vmapi',
            xhr: xhr
        });
    }
});


module.exports = JobsView;
},{"backbone":"/Z1EQg","../tpl/jobs-item.hbs":76,"../tpl/jobs.hbs":77,"../adminui":2,"../models/jobs":78,"./job-progress":28}],21:[function(require,module,exports){
var Backbone = require('backbone');


var Networks = require('../models/networks');
var Network = require('../models/network');
var NetworkCreateView = require('./networks-create');

var NetworksTemplate = require('../tpl/networks.hbs');
var NetworksListItemTemplate = require('../tpl/networks-list-item.hbs');

var adminui = require('../adminui');

var NetworksListItem = Backbone.Marionette.ItemView.extend({
    template: NetworksListItemTemplate,
    tagName: 'li',
    events: {
        'click': 'select'
    },

    highlightIfThis: function(model) {
        if (model == this.model) {
            this.highlight();
        }
    },

    unhighlight: function() {
        this.$el.siblings().removeClass('active');
    },

    highlight: function() {
        this.$el.siblings().removeClass('active');
        this.$el.addClass('active');
    },

    select: function() {
        this.highlight();
        this.trigger('select', this.model);
    }
});


var NetworksDetailView = require('./networks-detail');
var NetworksView = Backbone.Marionette.Layout.extend({
    template: NetworksTemplate,
    name: "networks",
    url: 'networks',
    events: {
        'click button[name=create]': 'showCreateNetworkForm'
    },
    attributes: {
        "id":"page-networks"
    },
    regions: {
        "list": ".list",
        "details": ".details"
    },

    initialize: function(options) {
        this.listView = new NetworksListView();
        options = options || {};
        if (options.uuid) {
            this.network = new Network({uuid: options.uuid});
            this.network.fetch();
        }
    },

    showCreateNetworkForm: function() {
        var view = new NetworkCreateView();
        this.bindTo(view, 'saved', function(n) {
            this.listView.collection.add(n);
            this.showNetwork(n);
        }, this);
        this.details.show(view);
    },

    showNetwork: function(network) {
        var view = new NetworksDetailView({model: network});
        this.details.show(view);
    },

    onRender: function() {
        this.bindTo(this.listView, 'select', this.showNetwork, this);
        this.bindTo(this.details, 'show', function(view) {
            adminui.router.applyUrl(view);
        });

        this.list.show(this.listView);

        if (this.network) {
            this.showNetwork(this.network);
        }
    }
});

var NetworksListTemplate = require('../tpl/networks-list.hbs');
var NetworksListView = Backbone.Marionette.CompositeView.extend({
    itemViewContainer: 'ul.items',
    template: NetworksListTemplate,
    itemView: NetworksListItem,

    initialize: function(options) {
        this.collection = new Networks();
        this.collection.fetch();
        this.bindTo(this.collection, 'error', this.onError, this);
    },

    onError: function(model, res) {
        adminui.vent.trigger('error', {
            xhr: res,
            context: 'napi / networks'
        });
    },

    onBeforeItemAdded: function(itemView) {
        this.bindTo(itemView, 'select', this.onSelect, this);
    },

    onSelect: function(model)  {
        this.trigger('select', model);
    }
});

module.exports = NetworksView;

},{"backbone":"/Z1EQg","../tpl/networks.hbs":79,"../tpl/networks-list-item.hbs":80,"../tpl/networks-list.hbs":81,"../models/networks":54,"../models/network":82,"./networks-create":83,"../adminui":2,"./networks-detail":84}],14:[function(require,module,exports){
var Backbone = require('backbone');


// UsersView
var UserForm = require('./user-form');
var BaseView = require('./base');
var Users = require('../models/users');
var UserView = require('./user');
var tplUsers = require('../tpl/users.hbs');
var adminui = require('../adminui');

var UsersListItem = Backbone.Marionette.ItemView.extend({
    template: require('../tpl/users-list-item.hbs'),
    tagName: 'tr',
    events: {
        'click a.login': 'onClickLoginName'
    },
    onClickLoginName: function(e) {
        e.preventDefault();
        adminui.vent.trigger('showview', 'user', {
            user: this.model
        });
    }
});

var UsersList = Backbone.Marionette.CollectionView.extend({
    itemView: UsersListItem
});

var FilterForm = Backbone.View.extend({
    events: {
        'submit form': 'onSubmit',
        'change input': 'onSubmit',
        'change select': 'onSubmit'
    },
    onSubmit: function(e) {
        e.preventDefault();

        var params = this.$('form').serializeObject();
        this.trigger('query', params);
    }
});

module.exports = Backbone.Marionette.ItemView.extend({

    template: tplUsers,

    url: 'users',

    id: "page-users",

    sidebar: 'users',

    events: {
        'click button[data-event=new-user]': 'newUser'
    },

    initialize: function() {
        this.users = new Users();
        this.usersListView = new UsersList({
            collection: this.users
        });

        this.filterView = new FilterForm();
        this.bindTo(this.users, 'error', this.onError, this);
    },


    query: function(params) {
        this.$('.alert').hide();
        this.users.fetch({
            data: params
        });
    },

    onError: function(model, xhr) {
        adminui.vent.trigger('error', {
            xhr: xhr,
            context: 'users / ufds',
            message: 'error occured while retrieving user information'
        });
    },

    onShow: function() {
        this.$('.alert').hide();
    },

    newUser: function() {
        this.createView = new UserForm();
        this.createView.render();
    },

    loadUserCounts: function() {
        this.users.userCount(this.updateCount);
    },

    updateCount: function(c) {
        this.$('.total-accounts').html(c);
    },

    onRender: function() {
        this.$findField = this.$('.findField');
        this.filterView.setElement(this.$('.users-filter'));
        this.bindTo(this.filterView, 'query', this.query, this);
        this.usersListView.setElement(this.$('.users-list tbody'));
        this.users.fetch();
        this.loadUserCounts();
        return this;
    }
});

},{"backbone":"/Z1EQg","../tpl/users.hbs":85,"../tpl/users-list-item.hbs":86,"./user-form":70,"../models/users":57,"./user":15,"../adminui":2,"./base":50}],23:[function(require,module,exports){
(function(){var Backbone = require('backbone');

// Backbone.sync
// -------------
// Map from CRUD to HTTP for our default `Backbone.sync` implementation.
var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch': 'PATCH',
    'delete': 'DELETE',
    'read': 'GET'
};

module.exports = Backbone.Model.extend({
    // Override this function to change the manner in which Backbone persists
    // models to the server. You will be passed the type of request, and the
    // model in question. By default, makes a RESTful Ajax request
    // to the model's `url()`. Some possible customizations could be:
    //
    // * Use `setTimeout` to batch rapid-fire updates into a single request.
    // * Send up the models as XML instead of JSON.
    // * Persist models via WebSockets instead of Ajax.
    //
    // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
    // as `POST`, with a `_method` parameter containing the true HTTP method,
    // as well as all requests with the body as `application/x-www-form-urlencoded`
    // instead of `application/json` with the model in a param named `model`.
    // Useful when interfacing with server-side languages like **PHP** that make
    // it difficult to read the body of `PUT` requests.
    sync: function(method, model, options) {
        var type = methodMap[method];

        // Default options, unless specified.
        _.defaults(options || (options = {}), {
            emulateHTTP: Backbone.emulateHTTP,
            emulateJSON: Backbone.emulateJSON
        });

        // Default JSON-request options.
        var params = {
            type: type,
            dataType: 'json'
        };

        // Ensure that we have a URL.
        if (!options.url) {
            params.url = _.result(model, 'url') || urlError();
        }

        // Ensure that we have the appropriate request data.
        if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
            params.contentType = 'application/json';
            params.data = JSON.stringify(options.attrs || model.toJSON(options));
        }

        // For older servers, emulate JSON by encoding the request into an HTML-form.
        if (options.emulateJSON) {
            params.contentType = 'application/x-www-form-urlencoded';
            params.data = params.data ? {
                model: params.data
            } : {};
        }

        // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
        // And an `X-HTTP-Method-Override` header.
        if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
            params.type = 'POST';
            if (options.emulateJSON) params.data._method = type;
            var beforeSend = options.beforeSend;
            options.beforeSend = function(xhr) {
                xhr.setRequestHeader('X-HTTP-Method-Override', type);
                if (beforeSend) return beforeSend.apply(this, arguments);
            };
        }

        // Don't process data on a non-GET request.
        if (params.type !== 'GET' && !options.emulateJSON) {
            params.processData = false;
        }

        var success = options.success;
        options.success = function(resp) {
            if (success) success(model, resp, options);
            model.trigger('sync', model, resp, options);
        };

        var error = options.error;
        options.error = function(xhr) {
            var contentType = xhr.getResponseHeader('content-type');
            if (contentType === 'application/json') {
                console.log('parsing JSON response');
                xhr.responseData = jQuery.parseJSON(xhr.responseText);
            }
            if (error) error(model, xhr, options);
            model.trigger('error', model, xhr, options);
        };

        // Make the request, allowing the user to override any Ajax options.
        var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
        model.trigger('request', model, xhr, options);
        return xhr;
    }
});

})()
},{"backbone":"/Z1EQg"}],34:[function(require,module,exports){
var Backbone = require('backbone');


module.exports = Backbone.Model.extend({
    urlRoot: '/_/images',

    idAttribute: 'uuid',

    defaults: {
        'name': null
    },

    nameWithVersion: function() {
        return _.str.sprintf('%s %s', this.get('name'), this.get('version'));
    },

    activate: function(cb) {
        $.post(this.url() + "?action=activate", cb);
    },

    disable: function(cb) {
        $.post(this.url() + "?action=disable", cb);
    },

    enable: function(cb) {
        $.post(this.url() + "?action=enable", cb);
    },

    adminImport: function() {
        var url = this.url() + '?action=import';
        var ajax = $.ajax(url, {
            data: JSON.stringify(this.attributes),
            contentType: 'application/json',
            type: 'POST'
        });

        return ajax;
    },

    toJSON: function() {
        var attrs = this.attributes;
        attrs.files = _.map(attrs.files, function(f) {
            if(f.size) {
                f.size_in_mb = _sizeToMB(f.size);
            }
            return f;
        });
        return attrs;
    }
});

function _sizeToMB(size) {
    return _.str.sprintf('%0.1f', size / 1024 / 1024);
}


},{"backbone":"/Z1EQg"}],50:[function(require,module,exports){


var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

module.exports = Backbone.Marionette.View;

},{"backbone":"/Z1EQg","backbone.marionette":"WHZV4H"}],54:[function(require,module,exports){
var Backbone = require('backbone');


	module.exports = Backbone.Collection.extend({
		url: "/_/networks"
	});

},{"backbone":"/Z1EQg"}],55:[function(require,module,exports){


var Backbone = require('backbone');
var Job = Backbone.Model.extend({
    defaults: {
        "name": ""
    },

    urlRoot: "/_/jobs",

    idAttribute: "uuid",

    startWatching: function() {
        var self = this;
        this._interval = setInterval(function() {
            self.fetch();
        }, 1000);
    },

    stopWatching: function() {
        clearInterval(this._interval);
    }
});
module.exports = Job;

},{"backbone":"/Z1EQg"}],59:[function(require,module,exports){
var Backbone = require('backbone');


var Nics = Backbone.Collection.extend({
    url: '/_/nics',
    initialize: function(options) {
        this.belongs_to_type = options.belongs_to_type;
        this.belongs_to_uuid = options.belongs_to_uuid;
    },

    fetchNics: function() {
        var query = {};

        if (this.belongs_to_uuid) {
            query.belongs_to_uuid = this.belongs_to_uuid;
        }

        if (this.belongs_to_type) {
            query.belongs_to_type = this.belongs_to_type;
        }

        this.fetch({
            data: query
        });
    }
});
module.exports = Nics;
},{"backbone":"/Z1EQg"}],61:[function(require,module,exports){
var Backbone = require('backbone');


var ChangeRackFormTemplate = function() {
    return '<input class="input input" type="text"><button class="btn btn-primary save">Save</button><button class="btn cancel">Cancel</button>';
};

var ChangeRackForm = Backbone.Marionette.ItemView.extend({
    attributes: {
        'class': 'change-rack-form'
    },
    template: ChangeRackFormTemplate,
    events: {
        'click button.save': 'save',
        'click button.cancel': 'cancel'
    },
    save: function() {
        var self = this;
        var rid = this.$('input').val();
        this.model.update({rack_identifier: rid }, function() {
            self.trigger('save', rid);
        });
    },
    cancel: function() {
        this.trigger('cancel');
        this.remove();
    }
});

module.exports = ChangeRackForm;

},{"backbone":"/Z1EQg"}],78:[function(require,module,exports){
var Backbone = require('backbone');
var Jobs = Backbone.Collection.extend({
    url: '/_/jobs'
});

module.exports = Jobs;
},{"backbone":"/Z1EQg"}],28:[function(require,module,exports){
var Backbone = require('backbone');


var Marionette= require('backbone.marionette');

var JobProgressView = Marionette.ItemView.extend({
    attributes: {
        'class': 'modal',
        'id': 'job-progress'
    },
    template: require('../tpl/job-progress.hbs'),
    initialize: function() {
        this.model.fetch();
        this.bindTo(this.model, 'change', this.render, this);
    },
    templateHelpers: {
        'finished': function() {
            return this.execution === 'succeeded' || this.execution === 'failed';
        }
    },
    show: function() {
        this.render();
        var modal = this.$el.modal();
        this.bindTo(modal, 'hide', this.onClose);
        this._timer = setInterval(this.update.bind(this), 3000);
    },
    update: function() {
        this.model.fetch({success: this.onUpdate.bind(this)});
    },
    onUpdate: function() {
        var execution = this.model.get('execution');

        if (execution === 'succeeded' || execution === 'failed') {
            clearInterval(this._timer);
        }

        this.trigger('execution', this.model.get('execution'));
    },
    onClose: function() {
        clearInterval(this._timer);
    }
});

module.exports = JobProgressView;

},{"backbone":"/Z1EQg","backbone.marionette":"WHZV4H","../tpl/job-progress.hbs":87}],38:[function(require,module,exports){
var Backbone = require('backbone');

var TemplateEditing = require('../tpl/tags-list-editing.hbs');

var EditingView = Backbone.Marionette.ItemView.extend({
    tagName: 'tr',
    template: TemplateEditing,
    events: {
        'click .edit': 'edit',
        'click .cancel': 'cancel',
        'click .save': 'save',
        'click .remove': 'del',
        'keyup input': 'checkFields'
    },

    initialize: function(options) {
        _.bindAll(this);

        this.model = new Backbone.Model();

        this.model.on('change:editing', function() {
            if (this.model.get('editing') === true) {
                this.$el.addClass('editing');
            } else {
                this.$el.removeClass('editing');
            }
        }, this);

        if (options.editing) {
            this.model.set({
                editing: options.editing
            });
        }

        this.model.on('change', this.render);

        this.tag = {};
        this.tag.name = options.name || '';
        this.tag.value = options.value || '';
    },

    cancel: function() {
        this.model.set({
            editing: false
        });
        this.trigger('cancel');
    },

    del: function() {
        this.trigger('remove', this.tag);
    },

    edit: function() {
        this.model.set({
            editing: true
        });
    },

    save: function() {
        this.tag.name = this.$('input[name=name]').val();
        this.tag.value = this.$('input[name=value]').val();
        if ((!this.tag.name.length) || (!this.tag.value.length)) {
            return false;
        }
        this.trigger('save', this.tag);
        this.model.set({
            editing: false
        });
    },

    checkFields: function(e) {
        if (this.$('input[name=name]').val().length && this.$('input[name=value]').val().length) {
            this.enableSave();
        } else {
            this.disableSave();
        }
    },

    enableSave: function() {
        this.$('button.save').removeAttr('disabled');
    },

    disableSave: function() {
        this.$('button.save').attr('disabled', 'disabled');
    },

    serializeData: function() {
        return {
            editing: this.model.get('editing'),
            tag: this.tag
        };
    },

    onRender: function() {
        if (this.model.get('editing')) {
            this.checkFields();
            this.focus();
        }
        return this;
    },

    focus: function() {
        this.$('input:first').focus();
    }

});

var TagsList = Backbone.Marionette.ItemView.extend({
    template: require('../tpl/tags-list.hbs'),

    events: {
        'click .add-tag': 'addTag'
    },

    initialize: function(options) {
        _.bindAll(this);

        if (!options.vm) {
            throw new TypeError('options.vm required');
        }
        this.vm = options.vm;
    },

    addTag: function() {
        var addTagButton = this.$('.add-tag');
        addTagButton.hide();

        var addView = new EditingView({
            editing: true
        });
        addView.on('cancel', function() {
            addTagButton.show();
            addView.remove();
        });

        addView.on('save', function(tag) {
            var tags = this.vm.get('tags');
            tags[tag.name] = tag.value;
            this.vm.set({
                tags: tags
            });
            this.vm.saveTags();
            this.render();
        }, this);

        addView.render();

        this.$('tfoot').append(addView.$el);
        addView.focus();
    },

    onRender: function() {
        _(this.vm.get('tags')).each(function(tv, tn) {
            var view = new EditingView({
                name: tn,
                value: tv
            });
            view.on('save', function(tag) {
                var tags = this.vm.get('tags');
                delete tags[tn];
                tags[tag.name] = tag.value;
                this.vm.set({
                    tags: tags
                });
                this.vm.saveTags();
            }, this);

            view.on('remove', function(tag) {
                var tags = this.vm.get('tags');
                delete tags[tag.name];
                this.vm.set({
                    tags: tags
                });
                this.vm.saveTags();
                view.$el.fadeOut(200, function() {
                    view.remove();
                });
            }, this);

            this.$('tbody').append(view.$el);
            view.render();
        }, this);
        return this;
    }

});

module.exports = TagsList;
},{"backbone":"/Z1EQg","../tpl/tags-list-editing.hbs":88,"../tpl/tags-list.hbs":89}],56:[function(require,module,exports){
var Backbone = require('backbone');



var PackagePreviewView = Backbone.Marionette.ItemView.extend({
    template: require('../tpl/package-preview.hbs'),
    attributes: {
        'class': 'package-preview'
    },
    bindings: {
        '[name=max_physical_memory]': 'max_physical_memory',
        '[name=max_swap]': 'max_swap',
        '[name=name]': 'name',
        '[name=version]': 'version',
        '[name=vcpus]': 'vcpus',
        '[name=quota]': 'quota',
        '[name=zfs_io_priority]': 'zfs_io_priority'
    },
    initialize: function(options) {
        this.model = options.model;
        this.bindTo(this.model, 'change:uuid', this.toggleDisplay);
    },
    toggleDisplay: function() {
        if (this.model.get('uuid') && this.model.get('uuid').length) {
            this.$el.show();
        } else {
            this.$el.hide();
        }
    },
    onRender: function() {
        this.stickit();
        this.toggleDisplay();
    }
});

module.exports = PackagePreviewView;

},{"backbone":"/Z1EQg","../tpl/package-preview.hbs":90}],60:[function(require,module,exports){
var Backbone = require('backbone');



var View = Backbone.Marionette.ItemView.extend({
    template: require('../tpl/traits-editor.hbs'),
    attributes: {
        'class':'modal',
        'id': 'traits-editor'
    },
    events: {
        'blur textarea': 'checkSyntax',
        'click .btn-primary': 'onClickSave'
    },
    initialize: function(options) {
        options = options || {};
        this.traits = options.traits || {};
    },
    onRender: function() {
        this.$('textarea').text(JSON.stringify(this.traits, null, 2));
    },
    checkSyntax: function() {
        try {
            var traits = JSON.parse(this.$('textarea').val());
            this.$('.btn-primary').removeAttr('disabled');
            this.$('.error').empty();
            return traits;
        } catch (e) {
            this.$('.btn-primary').attr('disabled', 'disabled');
            this.showError('JSON Error: ' + e.message);
        }
    },
    onClickSave: function() {
        var trait = null;
        try {
            traits = JSON.parse(this.$('textarea').val());
        } catch (e) {
            this.showError('JSON Error: ' + e.message);
        } finally {
            if (traits !== null) {
                this.trigger('save-traits', traits);
            }
        }
    },

    showError: function(message) {
        this.$('.error').text(message);
    },

    close: function() {
        this.$el.modal('hide');
        this.remove();
    },
    show: function() {
        this.render();
        this.$el.modal();
    }
});

module.exports = View;

},{"backbone":"/Z1EQg","../tpl/traits-editor.hbs":91}],63:[function(require,module,exports){
var Backbone = require('backbone');

var ServerNicsTemplate = require('../tpl/server-nics.hbs');
var ServerNicTemplate = require('../tpl/server-nic.hbs');
var ServerNic = Backbone.Marionette.ItemView.extend({
    template: ServerNicTemplate,
    tagName: 'tr',
    bindings: {
        '.mac': 'mac',
        '.ip': 'ip',
        '.netmask': 'netmask',
        '.nic_tag': 'nic_tag',
        '.vlan_id': 'vlan_id',
        '.nic_tags_provided': {
            observe: 'nic_tags_provided',
            onGet: function(tags) {
                if (tags.length) {
                    return tags.join(', ');
                }
            }
        },
        '.resolvers': {
            observe: 'resolvers',
            onGet: function(resolvers) {
                if (resolvers.length) {
                    return resolvers.join(', ');
                }
            }
        }
    },
    onRender: function() {
        this.stickit();
    }
});

var ServerNicsView = Backbone.Marionette.CompositeView.extend({
    template: ServerNicsTemplate,
    itemView: ServerNic,
    itemViewContainer: 'tbody',
    initialize: function(options) {
        this.collection = options.nics;
    }
});

module.exports = ServerNicsView;
},{"backbone":"/Z1EQg","../tpl/server-nics.hbs":92,"../tpl/server-nic.hbs":93}],26:[function(require,module,exports){
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var app = require('../adminui');

var Topbar = Marionette.ItemView.extend({
    events: {
        'click a.signout': 'signout'
    },

    initialize: function(options) {
        this.user = options.user;
    },

    signout: function() {
        app.vent.trigger('signout');
    },

    renderLoginName: function() {
        this.$('.acc-controls .login-name').html(this.user.get('login'));
    },

    serializeData: function() {
        return {
            user: this.user
        };
    }
});

module.exports = Topbar;
},{"backbone":"/Z1EQg","backbone.marionette":"WHZV4H","../adminui":2}],27:[function(require,module,exports){
var Backbone = require('backbone');
var app = require('../adminui');
var Marionette = require('backbone.marionette');

var Mainnav = Marionette.ItemView.extend({
    events: {
        'click li[data-view]':'onSelect'
    },

    initialize: function() {
        this.bindTo(app.vent, 'mainnav:highlight', this.highlight, this);
    },

    onSelect: function(e) {
        e.preventDefault();

        var li = $(e.currentTarget);
        var view = li.attr("data-view");
        this.highlight(view);

        app.vent.trigger("showview", view);
    },

    highlight: function(view) {
        this.$("li").removeClass('active');
        this.$("li i").removeClass("icon-white");

        var li = this.$('li[data-view='+view+']');

        li.addClass('active');
        li.find("i").addClass("icon-white");
    }
});

module.exports = Mainnav;

},{"backbone":"/Z1EQg","backbone.marionette":"WHZV4H","../adminui":2}],30:[function(require,module,exports){
var Backbone = require('backbone');
var Vm = require('./vm');

  module.exports = Backbone.Collection.extend({
model: Vm,

url: "/_/vms",

initialize: function(options) {
  this.options = options || {};
},

fetch: function(opts) {
  opts = opts || {};
  if (this.options.params) {
    opts.data = $.param(this.options.params);
  }

  Backbone.Collection.prototype.fetch.call(this, opts);
}

  });


},{"backbone":"/Z1EQg","./vm":33}],31:[function(require,module,exports){
var Backbone = require('backbone');
var ItemTemplate = require('../tpl/vms-list-item.hbs');
var adminui = require('../adminui');

var ItemView = Marionette.ItemView.extend({
    tagName: 'tr',
    template: ItemTemplate,

    events: {
        'click .alias a': 'navigateToVmDetails'
    },

    initialize: function() {
        _.bindAll(this);
    },

    navigateToVmDetails: function() {
        adminui.vent.trigger('showview', 'vm', {
            vm: this.model
        });
    }
});

module.exports = Backbone.Marionette.CollectionView.extend({
    itemView: ItemView
});
},{"backbone":"/Z1EQg","../tpl/vms-list-item.hbs":94,"../adminui":2}],33:[function(require,module,exports){
var Backbone = require('backbone');
var Model = require('./model');
var Job = require('./job');
var Vm = Model.extend({
    urlRoot: '/_/vms',

    idAttribute: 'uuid',

    defaults: {
        nics: [],
        snapshots: []
    },

    update: function(attrs, cb) {
        $.post(this.url() + '?action=update', attrs, function(data) {
            var job = new Job({
                uuid: data.job_uuid
            });
            cb(job);
        });
    },

    start: function(cb) {
        $.post(this.url() + '?action=start', {}, function(data) {
            var job = new Job({
                uuid: data.job_uuid
            });
            cb(job);
        });
    },

    stop: function(cb) {
        $.post(this.url() + '?action=stop', {}, function(data) {
            var job = new Job({
                uuid: data.job_uuid
            });
            cb(job);
        });
    },

    reboot: function(cb) {
        $.post(this.url() + '?action=reboot', {}, function(data) {
            var job = new Job({
                uuid: data.job_uuid
            });
            cb(job);
        });
    },

    del: function(cb) {
        $.delete_(this.url(), function(data) {
            var job = new Job({
                uuid: data.job_uuid
            });
            cb(job);
        });
    },

    saveTags: function(cb) {
        $.put(this.url() + '/tags', this.get('tags'), cb);
    },

    createSnapshot: function(cb) {
        $.post(this.url() + '?action=create_snapshot', {}, function(data) {
            var job = new Job({
                uuid: data.job_uuid
            });
            cb(job);
        });
    },

    rollbackSnapshot: function(snapshotName, cb) {
        $.post(this.url() + '?action=rollback_snapshot', {
            name: snapshotName
        }, function(data) {
            var job = new Job({
                uuid: data.job_uuid
            });
            cb(job);
        });
    },

    addNics: function(networks, cb) {
        $.post(this.url() + '?action=add_nics', {
            networks: networks
        }, function(data) {
            var job = new Job({
                uuid: data.job_uuid
            });
            cb(job);
        });
    },

    removeNics: function(macs, cb) {
        $.post(this.url() + '?action=remove_nics', {
            macs: macs
        }, function(data) {
            var job = new Job({
                uuid: data.job_uuid
            });
            cb(job);
        });
    },


    saveAlias: function(cb) {
        $.put(this.url(), {
            alias: this.get('alias')
        }, cb);
    },

    saveCustomerMetadata: function(cb) {
        $.put(this.url() + '/customer_metadata', this.get('customer_metadata'), cb);
    },

    ips: function() {
        return this.get('nics').map(function(n) {
            return n.ip;
        });
    }
});

module.exports = Vm;
},{"backbone":"/Z1EQg","./model":23,"./job":55}],35:[function(require,module,exports){
var Backbone = require('backbone');
var Job = require('./job');
var Server = Backbone.Model.extend({
    urlRoot: '/_/servers',

    idAttribute: 'uuid',

    defaults: {
        sysinfo: {}
    },

    setup: function(opts, callback) {
        opts = opts || {};
        $.post(this.url() + '?action=setup', opts, function(data) {
            var job = new Job({
                uuid: data.job_uuid
            });
            callback(job);
        });
    },

    factoryReset: function(callback) {
        $.post(this.url() + '?action=factory-reset', {}, function(data) {
            var job = new Job({
                uuid: data.job_uuid
            });
            callback(job);
        });
    },

    reboot: function(callback) {
        $.post(this.url() + '?action=reboot', {}, function(data) {
            var job = new Job({
                uuid: data.job_uuid
            });
            callback(job);
        });
    },

    forget: function(cb) {
        $.delete_(this.url(), {}, function(data) {
            console.log(data);
            cb();
        });
    },

    update: function(attrs, cb) {
        this.set(attrs);
        $.ajax({
            url: this.url(),
            type: "PUT",
            data: JSON.stringify(attrs),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: cb
        });
    }

});
module.exports = Server;
},{"backbone":"/Z1EQg","./job":55}],36:[function(require,module,exports){
var Backbone = require('backbone');
var Probe = require('./probe');

	module.exports = Backbone.Collection.extend({

		url: '/_/amon/probes',

		model: Probe,

		fetchProbes: function(userUuid) {
			var params = $.param({ user: userUuid });
			this.fetch({ data: params });
		}
	});

},{"backbone":"/Z1EQg","./probe":95}],37:[function(require,module,exports){
var Backbone = require('backbone');
var JobProgressView = require('./job-progress');
var BaseView = require('./base');
var tplVmDelete = require('../tpl/vm-delete.hbs');

module.exports = Backbone.Marionette.ItemView.extend({
    template: tplVmDelete,
    attributes: {
        'class': 'modal hide fade'
    },

    events: {
        'click .delete': 'clickedDelete'
    },

    initialize: function(options) {
        this.vm = options.vm;
        this.owner = options.owner;
    },

    serializeData: function() {
        return {
            owner: this.owner.toJSON(),
            vm: this.vm.toJSON()
        };
    },

    show: function() {
        this.render();
        this.$el.modal();
    },

    clickedDelete: function(e) {
        var self = this;
        this.$el.modal('hide');
        this.vm.del(function(job) {
            job.name = 'Delete VM';
            var jobView = new JobProgressView({
                model: job
            });
            jobView.show();
        });
    }
});
},{"backbone":"/Z1EQg","../tpl/vm-delete.hbs":96,"./job-progress":28,"./base":50}],39:[function(require,module,exports){
var Backbone = require('backbone');


var NicsRowView = require('./nics-row');
var JobProgress = require('./job-progress');

var NicsView = Backbone.Marionette.CompositeView.extend({
    template: require('../tpl/nics.hbs'),
    itemView: NicsRowView,
    itemViewContainer: 'tbody',
    events: {
        'click button.add-nic': 'onClickAddNic',
        'click button.remove-nics': 'onClickRemoveNics'
    },

    initialize: function(options)  {
        this.model = options.vm;
        this.selectedNics = new Backbone.Collection();
        this.collection = new Backbone.Collection(this.model.get('nics'));

        this.bindTo(this.selectedNics, 'add remove', this.onChangeSelectedNics, this);
        this.bindTo(this.model, 'change:nics', this.resetNics, this);
    },

    resetNics: function(vm) {
        this.collection.reset(vm.get('nics'));
    },

    onClickRemoveNics: function() {
        var self = this;
        var macs = this.selectedNics.pluck('mac');
        this.model.removeNics(macs, function(job) {
            var jobView = new JobProgress({model: job});
            jobView.show();
            self.bindTo(jobView, 'execution', function(st) {
                console.log(st);
                if (st === 'succeeded') {
                    self.selectedNics.each(function(n) {
                        self.collection.remove(n);
                    });
                }
            });
        });
    },

    onClickAddNic: function() {
        var AddNicView = require('./vm-add-nic');
        var view = new AddNicView({vm: this.model});
        view.render();
    },

    onChangeSelectedNics: function() {
        if (this.selectedNics.length > 0) {
            this.enableActions();
        } else {
            this.disableActions();
        }
    },

    enableActions: function() {
        this.$(".btn-group .remove-nics").show();
    },

    disableActions: function() {
        this.$(".btn-group .remove-nics").hide();
    },

    onBeforeItemAdded: function(itemView) {
        this.bindTo(itemView, 'select', this.onSelectNic, this);
        this.bindTo(itemView, 'deselect', this.onDeselectNic, this);
    },

    onSelectNic: function(nic) {
        this.selectedNics.add(nic);
    },

    onDeselectNic: function(nic) {
        this.selectedNics.remove(nic);
    },

    onRender: function() {
        this.disableActions();
    }

});

module.exports = NicsView;

},{"backbone":"/Z1EQg","../tpl/nics.hbs":97,"./nics-row":98,"./job-progress":28,"./vm-add-nic":99}],40:[function(require,module,exports){
var Backbone = require('backbone');
var ko = require('knockout');
var BaseView = require('./base');
var metadataViewModalTemplate = require('../tpl/metadata-view-modal.hbs');
var metadataEditModalTemplate = require('../tpl/metadata-edit-modal.hbs');

var MetadataViewModel = function(m) {
    m = m || {};
    this.key = ko.observable(m.key);
    this.value = ko.observable(m.value);
    this.multiline = ko.computed(function() {
        return (/\n/).test(this.value());
    }, this);
    this.dataIsGood = ko.computed(function() {
        return this.key() && this.value();
    }, this);
};

var MetadataList = Backbone.Marionette.ItemView.extend({

    template: require("../tpl/metadata.hbs"),

    initialize: function(options) {
        _.bindAll(this);
        if (!options.vm) {
            throw new TypeError('options.vm required');
        }
        this.vm = options.vm;
        this.metadata = ko.observableArray([]);
    },

    showContent: function(m) {
        var view = $(metadataViewModalTemplate()).modal();
        ko.applyBindings(m, view.get(0));
        view.modal('show');
    },

    showAddPane: function() {
        var self = this;

        var view = $(metadataEditModalTemplate()).modal({
            show: false,
            backdrop: 'static'
        });

        var viewModel = new MetadataViewModel();
        viewModel.editAction = this.edit;
        showAction = this.showContent;
        removeAction = this.removeItem;
        viewModel.saveAction = function(m) {
            self.metadata.push(m);
            self.save(function() {
                view.modal('hide').remove();
            });
        };

        ko.applyBindings(viewModel, view.get(0));
        view.on('shown', function() {
            console.log('shown');
            view.find('input:first').focus();
        });
        view.modal('show');
    },

    removeItem: function(m) {
        this.metadata.remove(m);
        this.save();
    },

    save: function(cb) {
        var data = {};
        _(this.metadata()).each(function(m) {
            data[m.key()] = m.value();
        });
        this.vm.set({
            customer_metadata: data
        });
        this.vm.saveCustomerMetadata(cb);
        return data;
    },

    edit: function(m) {
        var view = $(metadataEditModalTemplate()).modal({
            backdrop: 'static',
            show: false
        });
        m.saveAction = function() {
            this.save(function() {
                view.modal('hide');
            });
        }.bind(this);
        ko.applyBindings(m, view.get(0));
        view.on('shown', function() {
            view.find('textarea').focus();
        });
        view.modal('show');
    },

    onRender: function() {
        _.each(this.vm.get('customer_metadata'), function(v, k) {
            var viewModel = new MetadataViewModel({
                key: k,
                value: v
            });
            viewModel.editAction = this.edit;
            viewModel.showAction = this.showContent;
            viewModel.removeAction = this.removeItem;
            this.metadata.push(viewModel);
        }, this);

        ko.applyBindings({
            metadata: this.metadata,
            addAction: this.showAddPane
        }, this.el);
    }
});

module.exports = MetadataList;
},{"backbone":"/Z1EQg","knockout":"i/30Ax","../tpl/metadata-view-modal.hbs":100,"../tpl/metadata-edit-modal.hbs":101,"../tpl/metadata.hbs":102,"./base":50}],41:[function(require,module,exports){
var Backbone = require('backbone');


/**
 * Snapshots Table/List
 */
var Snapshot = Backbone.Model.extend({});
var Snapshots = Backbone.Collection.extend({});
var JobProgressView = require('./job-progress');

var SnapshotRowTemplate = require('../tpl/snapshots-row.hbs');
var SnapshotRow = Backbone.Marionette.ItemView.extend({
    tagName: 'tr',
    template: SnapshotRowTemplate,
    events: {
        'click .rollback': 'rollbackToSnapshot'
    },
    rollbackToSnapshot: function() {
        var name = this.model.get('name');
        var self = this;
        var vm = this.vm;
        vm.rollbackSnapshot(name, function(job) {
            var jobView = new JobProgressView({model: job});
            self.bindTo(jobView, 'execution', function(exec) {
                if (exec === 'succeeded') {
                    vm.fetch();
                }
            });
            jobView.show();
        });
    }
});


var View = Backbone.Marionette.CompositeView.extend({
    itemView: SnapshotRow,
    itemViewContainer: 'tbody',
    template: require('../tpl/snapshots.hbs'),
    events: {
        'click button': 'clickedCreateSnapshot'
    },
    initialize: function(options) {
        this.vm = options.vm;
        this.collection = new Snapshots(this.vm.get('snapshots'));
        this.bindTo(this.collection, "add", this.render, this);
        this.bindTo(this.collection, "remove", this.render, this);
        this.bindTo(this.collection, "reset", this.render, this);
        this.bindTo(this.vm, 'change:snapshots', this.resetSnapshots, this);
    },
    resetSnapshots: function(vm, n) {
        console.log('reset');
        this.collection.reset(vm.get('snapshots'));
    },
    onBeforeItemAdded: function(view) {
        view.vm = this.vm;
    },
    templateHelpers: function() {
        var self = this;
        return {
            snapshots: this.collection,
            hasSnapshots: function(data) {
                return self.collection.length > 0;
            }
        };
    },
    clickedCreateSnapshot: function() {
        var vm = this.vm;
        var self = this;
        this.vm.createSnapshot(function(job) {
            var jobView = new JobProgressView({model: job});
            self.bindTo(jobView, 'execution', function(exec) {
                console.log(exec);
                if (exec === 'succeeded') {
                    vm.fetch();
                }
            });
            jobView.show();
        });
    }
});
module.exports = View;

},{"backbone":"/Z1EQg","../tpl/snapshots-row.hbs":103,"../tpl/snapshots.hbs":104,"./job-progress":28}],42:[function(require,module,exports){
var Backbone = require('backbone');
var Template = require('../tpl/vm-change-owner.hbs');
var app = require('../adminui');

var View = Backbone.Marionette.ItemView.extend({
    attributes: {
        'class': 'modal'
    },

    events: {
        'click button.btn-primary': 'onSubmit'
    },

    initialize: function(options) {
        if (typeof(this.vm) === 'undefined') {
            throw "options.vm not present";
        }

        this.vm = options.vm;
    },

    template: Template,

    show: function() {
        this.render();
        this.$el.modal('show');
        this.$('input:first').focus();
    },

    onSubmit: function(e) {
        e.preventDefault();
        var self = this;
        var owner = this.$('[name=owner_uuid]').val();
        this.vm.update({
            'new_owner_uuid': owner
        }, function(job) {
            app.vent.trigger('showjob', job);
            self.bindTo(job, 'execution', function(status) {
                if (status == 'succeeded') {
                    self.vm.fetch();
                }
            });
            self.$el.modal('hide').remove();
        });
    }
});

module.exports = View;
},{"backbone":"/Z1EQg","../tpl/vm-change-owner.hbs":105,"../adminui":2}],43:[function(require,module,exports){
var Backbone = require('backbone');


var Notes = require('../models/notes');
var Note = require('../models/note');
var User = require('../models/user');

var NotesItemView = Backbone.Marionette.ItemView.extend({
    template: require('../tpl/notes-item.hbs'),
    tagName: 'li',
    initialize: function() {
        this.user = new User({uuid: this.model.get('owner_uuid')});
        this.user.fetch();
    },
    userBindings: {
        '.author': {
            observe: ['cn', 'sn'],
            onGet: function(values) {
                return values.join(' ');
            }
        }
    },
    noteBindings: {
        '.note': 'note',
        '.date': {
            observe: 'created',
            onGet: function(created) {
                var year = created.getFullYear();
                var month = created.getMonth();
                var day = created.getDate();
                var h = created.getHours();
                var m = created.getMinutes();
                var date = [year, month, day].join('/');
                var time = [h,m].join(':');
                return [date, time].join(' ');
            }
        }
    },
    onRender: function() {
        this.stickit(this.model, this.noteBindings);
        this.stickit(this.user, this.userBindings);
    }

});





var EmptyNoteView = Backbone.Marionette.ItemView.extend({
    tagName: 'li',
    attributes: {
        'class': 'empty'
    },
    template: function(data) { return 'There are no notes yet...'; }
});




var View = Backbone.Marionette.CompositeView.extend({
    template: require('../tpl/notes.hbs'),

    itemView: NotesItemView,
    emptyView: EmptyNoteView,

    itemViewContainer: 'ul',

    ui: {
        'noteField': 'textarea',
        'saveButton': 'button.add-note'
    },

    events: {
        'input textarea': 'noteChanged',
        'click button': 'saveNote'
    },

    noteChanged: function() {
        if (this.ui.noteField.val().length) {
            this.ui.saveButton.removeAttr('disabled');
        } else {
            this.ui.saveButton.attr('disabled', 'disabled');
        }
    },

    saveNote: function() {
        var self = this;
        var noteText = this.ui.noteField.val();
        var note = new Note({
            item_uuid: this.collection.item_uuid,
            note: noteText
        });
        note.save(null, {
            success: function() {
                self.ui.noteField.val('');
                self.collection.fetch();
            }
        });
    },

    onRender: function() {
        this.ui.saveButton.attr('disabled', 'disabled');
    },

    initialize: function(options) {
        if (! options.itemUuid) {
            throw new TypeError('options.itemUuid required for notes');
        }

        this.collection = new Notes();
        this.collection.item_uuid = options.itemUuid;
        this.collection.fetch();
    }
});

module.exports = View;

},{"backbone":"/Z1EQg","../tpl/notes-item.hbs":106,"../tpl/notes.hbs":107,"../models/notes":108,"../models/note":109,"../models/user":5}],44:[function(require,module,exports){
var Backbone = require('backbone');
var Probe = require('../models/probe');
var BaseView = require('../views/base');
var SelectProbeTypeView = require('../views/monitoring/select-probe-type');
var SelectMonitorView = require('../views/monitoring/select-monitor');
var ConfigLogScan = require('../views/monitoring/config-log-scan');
var ConfigMachineUp = require('../views/monitoring/config-machine-up');
var ConfigHttp = require('../views/monitoring/config-http');
var ConfigIcmp = require('../views/monitoring/config-icmp');


var ProbeConfigViews = {
    'log-scan': ConfigLogScan,
    'machine-up': ConfigMachineUp,
    'http': ConfigHttp,
    'icmp': ConfigIcmp
};


var CreateProbeController = Backbone.View.extend({
    initialize: function(options) {
        _.bindAll(this);
        this.probe = options.probe || new Probe();
        this.vm = options.vm;
        this.showSelectProbeView();
    },

    showSelectProbeView: function() {
        this.selectionView = new SelectProbeTypeView();
        this.selectionView.on('select', this.onSelectProbe);
        this.selectionView.render().$el.modal();
    },

    onSelectProbe: function(p) {
        this.probe.set({type: p});
        this.selectionView.$el.modal('hide');
        this.showProbeConfig(p);
    },

    showProbeConfig: function(p) {
        var ProbeConfigView = (ProbeConfigViews[p]);

        this.probeConfigView = new ProbeConfigView({
            vm: this.vm,
            probe: this.probe
        });

        this.probeConfigView.render().$el.modal();
        this.probeConfigView.on('done', this.onDoneProbeConfig);
        this.probeConfigView.focus();
    },


    onDoneProbeConfig: function(cfg) {
        console.log('onDoneProbeConfig', cfg);
        var self = this;
        console.log(this.probe);
        this.probe.set({
            user: this.vm.get('owner_uuid'),
            type: cfg.type,
            name: cfg.name,
            agent: cfg.agent,
            machine: cfg.machine,
            config: cfg.config
        });

        console.log(this.probe);

        this.probe.save({}, {
            success: function() {
                self.probeConfigView.$el.modal('hide');
                self.eventBus.trigger('probe:added', self.probe);
            },
            error: function() {
                alert('Error saving probe');
            }
        });
    }
});

module.exports = CreateProbeController;


},{"backbone":"/Z1EQg","../models/probe":95,"../views/base":50,"../views/monitoring/select-probe-type":110,"../views/monitoring/select-monitor":111,"../views/monitoring/config-log-scan":112,"../views/monitoring/config-machine-up":113,"../views/monitoring/config-http":114,"../views/monitoring/config-icmp":115}],45:[function(require,module,exports){
var Backbone = require('backbone');
var Packages = require('../models/packages');
var Package = require('../models/package');
var JobProgressView = require('./job-progress');
var PackagePreviewView = require('./package-preview');

var ViewModel = Backbone.Model.extend({});
var View = Backbone.Marionette.ItemView.extend({
    template: require('../tpl/resize-vm.hbs'),
    attributes: {
        'class': 'modal'
    },
    events: {
        'click button': 'onClickResize'
    },
    initialize: function(options) {
        this.vm = options.vm;
        this.model = new ViewModel();

        this.packages = new Packages();
        this.packages.fetch();
        this.selectedPackage = new Package();
        this.packagePreviewView = new PackagePreviewView({
            model: this.selectedPackage
        });
        this.bindTo(this.packages, 'reset', this.render, this);
        this.bindTo(this.model, 'change:package', this.onSelectPackage, this);
    },
    onClickResize: function() {
        var self = this;
        var pkg = new ViewModel(this.model.get('package'));
        var values = {};
        values.billing_id = pkg.get('uuid');
        values.package_name = pkg.get('name');
        values.package_version = pkg.get('version');
        values.cpu_cap = pkg.get('cpu_cap');
        values.max_lwps = pkg.get('max_lwps');
        values.max_swap = pkg.get('max_swap');
        values.quota = pkg.get('quota');
        values.vcpus = pkg.get('vcpus');
        values.zfs_io_priority = pkg.get('zfs_io_priority');
        values.ram = pkg.get('max_physical_memory');
        this.vm.update(values, function(job) {
            self.$el.modal('hide');
            var jobView = new JobProgressView({
                model: job
            });
            jobView.show();
        });
    },
    onSelectPackage: function(p) {
        var pkg = p.get('package');
        if (pkg && typeof(pkg) === 'object') {
            this.selectedPackage.set(pkg);
        } else {
            this.selectedPackage.clear();
        }
    },
    onRender: function() {
        this.$('.package-preview-container').html(this.packagePreviewView.render().el);
        var self = this;
        this.stickit(this.model, {
            'button': {
                attributes: [{
                    name: 'disabled',
                    observe: 'package',
                    onGet: function(pkg) {
                        return pkg === null || pkg.length === 0;
                    }
                }]
            },
            'select': {
                observe: 'package',
                selectOptions: {
                    'collection': 'this.packages',
                    defaultOption: {
                        label: 'Select a Package'
                    },
                    'labelPath': 'name'
                }
            }
        });
    },
    show: function() {
        this.render();
        this.$el.modal();
    }
});

module.exports = View;
},{"backbone":"/Z1EQg","../tpl/resize-vm.hbs":116,"../models/packages":53,"../models/package":52,"./job-progress":28,"./package-preview":56}],51:[function(require,module,exports){
var Backbone = require('backbone');
var Image = require('./image');

module.exports = Backbone.Collection.extend({
    model: Image,
    url: '/_/images'
});

},{"backbone":"/Z1EQg","./image":34}],52:[function(require,module,exports){
var Backbone = require('backbone');
var Model = require('./model');
module.exports = Model.extend({
    urlRoot: '/_/packages',
    idAttribute: 'uuid',
    defaults: {
        'default': false,
        'traits': {}
    }
});
},{"backbone":"/Z1EQg","./model":23}],53:[function(require,module,exports){
var Backbone = require('backbone');
var Package = require('./package');
var Packages = Backbone.Collection.extend({
    model: Package,
    url: '/_/packages',
    search: function(val) {
        if (val.length === 0) {
            this.fetch();
            return;
        }
        var filtered = this.filter(function(m) {
            return m.get('uuid') == val || m.get('name').indexOf(val) !== -1;
        });

        this.reset(filtered);
    },

    comparator: function(pkg) {
        return pkg.get("name");
    },

    fetchActive: function() {
        this.fetch({
            data: $.param({
                'active': true
            })
        });
    }
});

module.exports = Packages;
},{"backbone":"/Z1EQg","./package":52}],48:[function(require,module,exports){
var Backbone = require('backbone');
var Server = require('./server');
var Servers = Backbone.Collection.extend({
    url: "/_/servers",
    model: Server
});
module.exports = Servers;
},{"backbone":"/Z1EQg","./server":35}],57:[function(require,module,exports){
var Backbone = require('backbone');
var User = require('./user');
var Users = Backbone.Collection.extend({
    model: User,
    url: '/_/users',

    userCount: function(successCb) {
        $.get('/_/users/count', function(res) {
            successCb(res.count);
        });
    },

    searchByLogin: function(login, successCb) {
        this.fetch({
            data: $.param({
                'login': login
            }),
            success: successCb
        });
    }
});

module.exports = Users;
},{"backbone":"/Z1EQg","./user":5}],62:[function(require,module,exports){
var Backbone = require('backbone');


var Platforms = require('../models/platforms');
var Platform = Backbone.Model.extend({});
var ViewModel = Backbone.Model.extend({});
var ChangePlatformTemplate = function() {
    return '<select class="input"></select><button class="btn btn-primary save">Save</button><button class="btn cancel">Cancel</button>';
};
var ChangePlatformForm = Backbone.Marionette.ItemView.extend({
    attributes: {
        'class': 'change-platform-form'
    },
    template: ChangePlatformTemplate,
    events: {
        'click button.save': 'save',
        'click button.cancel': 'cancel'
    },
    initialize: function(options) {
        this.platforms = new Platforms();
        this.platforms.fetch();
        this.bindTo(this.platforms, 'sync', this.applyBindings);
        this.viewModel = new ViewModel();
        this.viewModel.set({
            platform: options.model.get('boot_platform')
        });
    },
    save: function() {
        var self = this;
        var platform = this.$('select').val();
        this.model.update({
            'boot_platform': platform
        }, function() {
            self.trigger('save', platform);
        });
    },
    cancel: function() {
        this.trigger('cancel');
        this.remove();
    },
    applyBindings: function() {
        this.stickit(this.viewModel, {
            'select': {
                observe: 'platform',
                selectOptions: {
                    collection: 'this.platforms',
                    labelPath: 'version',
                    valuePath: 'version'
                }
            }
        });
    }
});

module.exports = ChangePlatformForm;
},{"backbone":"/Z1EQg","../models/platforms":117}],64:[function(require,module,exports){
var Backbone = require('backbone');


var app = require('../adminui');
var Template = require('../tpl/server-setup.hbs');
var ViewModel = Backbone.Model.extend({});
var ServerSetupView = Backbone.Marionette.ItemView.extend({
    template: Template,
    id: 'server-setup',
    attributes: {
        'class': 'modal'
    },
    events: {
        'click setup': 'setup'
    },
    initialize: function(options) {
        this.viewModel = new ViewModel({customHostname: false});
    },
    setup: function() {
        var server = this.model;
        var self = this;
        var hostname = this.$('.custom-hostname').val();
        this.model.setup({hostname: hostname}, function(job) {
            self.remove();
            app.vent.trigger('showjob', job);
            self.bindTo(job, 'execution', function(status) {
                if (status === 'succeeded') {
                    server.fetch();
                }
            });
        });
    },
    onRender: function() {
        this.stickit(this.model, {
            '.custom-hostname': {
                observe: 'customHostname'
            },
            '.custom-hostname-container': {
                observe: 'customHostname',
                updateView: false,
                visible: true
            }
        });
        this.$el.modal('show');
    }
});
module.exports = ServerSetupView;

},{"backbone":"/Z1EQg","../tpl/server-setup.hbs":118,"../adminui":2}],66:[function(require,module,exports){
var Backbone = require('backbone');
var Alarms = require('../models/alarms');
var Alarm = require('../models/alarm');

var Probes = require('../models/probes');
var ProbeGroups = require('../models/probe-groups');
var AlarmsTemplate = require('../tpl/alarms.html');


var AlarmsView = Backbone.Marionette.ItemView.extend({
    template: function(vars) {
        vars.alarms = vars.alarms || [];
        return AlarmsTemplate(vars);
    },

    events: {
        'click .summary': 'showDetails',
        'click .suppress': 'suppressAlarm'
    },

    showDetails: function(e) {
        $(e.currentTarget).siblings('.details').toggle();
    },

    suppressAlarm: function(e) {
        var self = this;
        e.preventDefault();
        e.stopPropagation();
        var uuid = $(e.target).closest('li').attr('data-uuid');
        uuid = _.str.trim(uuid);
        var alarm = new Alarm({
            id: uuid,
            user: this.probeGroups.user
        });
        alarm.suppress(function() {
            self.fetch();
        });
    },

    initialize: function(options) {
        _.bindAll(this);

        if (options.userUuid) {
            this.alarms = new Alarms();
            this.probeGroups = new ProbeGroups();
            this.probeGroups.user = options.userUuid;
            this.probes = new Probes();
        }

        this.bindTo(this.alarms, 'reset', this.render);
        this.bindTo(this.probeGroups, 'reset', this.render);
        this.bindTo(this.probes, 'reset', this.render);
        this.fetch();
    },

    fetch: function() {
        if (this.options.userUuid) {
            this.probes.fetchProbes(this.options.userUuid);
            this.alarms.fetchAlarms(this.options.userUuid);
            this.probeGroups.fetch();
        }
    },

    dataReady: function() {
        return this.probes.length && this.alarms.length && this.probeGroups.length;
    },

    serializeData: function() {
        if (!this.dataReady()) {
            return;
        }

        this.alarms.each(function(a) {
            if (a.get('probeGroup')) {
                a.probeGroup = this.probeGroups.find(function(pg) {
                    return pg.get('uuid') == a.get('probeGroup');
                });
            }

            _(a.get('faults')).each(function(f) {
                var faultProbe = f.probe;
                if (faultProbe) {
                    f.probe = this.probes.find(function(p) {
                        return p.get('uuid') == faultProbe;
                    });
                }
            }, this);

        }, this);

        var vars = {
            probes: this.probes,
            probeGroups: this.probeGroups,
            alarms: this.alarms
        };
        var open = vars.alarms.filter(function(a) {
            return a.get('suppressed') === false && a.get('closed') === false;
        });
        vars.alarms = new Backbone.Collection(open);
        return vars;
    },

    onRender: function() {
        this.$('.details').hide();
    }
});

module.exports = AlarmsView;
},{"backbone":"/Z1EQg","../tpl/alarms.html":119,"../models/alarms":120,"../models/alarm":121,"../models/probes":36,"../models/probe-groups":122}],70:[function(require,module,exports){
var Backbone = require('backbone');



var User = require('../models/user');
var Template = require('../tpl/user-form.hbs');
var app = require('../adminui');

module.exports = Backbone.Marionette.ItemView.extend({

    template: Template,

    id: 'user-form',

    attributes: {
        'class': 'modal'
    },
    modelEvents: {
        'error': 'onError'
    },
    events: {
        'input input[name=first_name]': 'updateCommonName',
        'input input[name=last_name]': 'updateCommonName',
        'submit form': 'save'
    },
    bindings: {
        '.action': {
            observe: 'uuid',
            onGet: function(val) {
                if (val && val.length) {
                    return 'Modify';
                } else {
                    return 'Create';
                }
            }
        },
        '[name=login]': 'login',
        '[name=email]': 'email',
        '[name=company]': 'company',
        '[name=phone]': 'phone',
        '[name=password]': 'password',
        '[name=last_name]': 'sn',
        '[name=first_name]': {
            'observe': 'cn',
            updateModel: false,
            onGet: function(val) {
                var parts = val.split(/\s/);
                parts.slice(0, parts.length-2);
                return parts.join(' ');
            }
        }
    },

    updateCommonName: function(e) {
        var newcn = this.$('[name=first_name]').val() + ' ' + this.$('[name=last_name]').val();
        this.model.set({cn:newcn}, {silent: true});
    },


    initialize: function(options) {
        if (options && options.user) {
            this.model = options.user;
            this.mode = 'edit';
        } else {
            this.model = new User();
            this.mode = 'create';
        }
    },

    onError: function(model, xhr) {
        var ul = $("<ul />");
        this.$('.control-group').removeClass('error');
        _(xhr.responseData.errors).each(function(e) {
            this.$('[name='+e.field+']').parents('.control-group').addClass('error');
            ul.append('<li>'+e.message+' (' + e.field + ')</li>');
        });

        this.$(".alert")
            .empty()
            .append('<h4 class="alert-heading">Please fix the following errors</h4>')
            .append(ul)
            .show();
    },

    save: function(e) {
        e.preventDefault();
        e.stopPropagation();

        var self = this;

        this.$('.alert').hide();
        this.model.save(null, {
            success: function(model, resp) {
                self.$el.modal('hide').remove();
                app.vent.trigger('showview', 'user', {user: self.model});
            }
        });
    },

    serialize: function() {
        var obj = {};

        _(this.$('form').serializeArray()).each(function(o) {
            obj[o.name] = o.value;
        });

        return obj;
    },

    onRender: function() {
        this.stickit();
        this.$el.modal({keyboard: false});
        this.$el.on('shown', _.bind(function() {
            this.$("input:first").focus();
        }, this));

        return this;
    }

});

},{"backbone":"/Z1EQg","../tpl/user-form.hbs":123,"../models/user":5,"../adminui":2}],124:[function(require,module,exports){
var Backbone = require('backbone');

require('backbone.modelbinder');
var FormTemplate = require('../tpl/packages-form.hbs');
var Package = require('../models/package');

var PackageForm = Backbone.Marionette.ItemView.extend({
    template: FormTemplate,
    events: {
        'submit': 'onSubmit',
        'click button[type=cancel]': 'onCancel'
    },
    initialize: function(options) {
        options = options || {};
        this.modelBinder = new Backbone.ModelBinder();

        if (!options.model) {
            this.model = new Package({
                version: "1.0.0"
            });
        }
    },

    onCancel: function(e) {
        e.preventDefault();
        if (this.model.isNew()) {
            console.log(this.model.isNew());
            this.vent.trigger('showpackage');
        } else {
            this.vent.trigger('showpackage', this.model);
        }
    },

    onSubmit: function(e) {
        e.preventDefault();
        var self = this;
        this.model.save(null, {
            success: function(model, resp) {
                console.log(model);
                self.vent.trigger('showpackage', model);
            }
        });
    },

    onRender: function() {
        this.modelBinder.bind(this.model, this.el);
    },

    onClose: function() {
        this.modelBinder.unbind();
    },

    onShow: function() {
        this.$('input:first').focus();
    }
});

module.exports = PackageForm;
},{"backbone":"/Z1EQg","backbone.modelbinder":"ahDvth","../tpl/packages-form.hbs":125,"../models/package":52}],69:[function(require,module,exports){
var Backbone = require('backbone');


var SSHKey = require('./sshkey');
var SSHKeys = Backbone.Collection.extend({
    model: SSHKey,
    initialize: function(options) {
        if (typeof(options.user) === 'object') {
            this.uuid = options.user.get('uuid');
        } else if (typeof(options.user) == 'string') {
            this.uuid = options.user;
        }

        if (typeof(this.uuid) !== 'string') {
            throw new TypeError('options.user {string|object} required');
        }
    },
    parse: function(response) {
        return _.map(response, function(item) {
            item.user = this.uuid;
            console.log(item);
            return item;
        }, this);
    },
    url: function() {
        return '/_/users/' + this.uuid + '/keys';
    }
});

module.exports = SSHKeys;
},{"backbone":"/Z1EQg","./sshkey":126}],71:[function(require,module,exports){
var Backbone = require('backbone');


var SSHKey = require('../models/sshkey');

module.exports = Backbone.Marionette.ItemView.extend({
    className: 'modal',
    template: require('../tpl/sshkey-create.hbs'),
    events: {
        'click button.save': 'onClickSave'
    },
    modelEvents: {
        'sync': 'onModelSync',
        'error': 'onModelError'
    },

    initialize: function(options) {
        if (typeof(options.user) !== 'string') {
            throw new TypeError('options.user {string} required');
        }

        this.model = new SSHKey({
            user: options.user
        });
    },

    onModelSync: function(model) {
        this.trigger('saved', model);
        this.$el.modal('hide').remove();
    },

    onModelError: function(model, xhr, error) {
        this.$('textarea').parents('.control-group').addClass('error');
        this.$(".alert").html(xhr.responseData.message);
        this.$(".alert").show();
    },

    onClickSave: function() {
        this.$('textarea').parents('.control-group').removeClass('error');
        var key = this.$('textarea[name=key]').val();
        this.model.save({
            key: key
        });
    },

    onRender: function() {
        this.$el.modal();
        this.$('.alert').hide();
    }
});
},{"backbone":"/Z1EQg","../tpl/sshkey-create.hbs":127,"../models/sshkey":126}],82:[function(require,module,exports){
var Backbone = require('backbone');
var Model = require('./model');

module.exports = Model.extend({
    urlRoot: "/_/networks",
    idAttribute: 'uuid'
});
},{"backbone":"/Z1EQg","./model":23}],83:[function(require,module,exports){
var Backbone = require('backbone');
var Template = require('../tpl/networks-create.hbs');
var Network = require('../models/network');
var NicTags = require('../models/nictags');

var View = Backbone.Marionette.ItemView.extend({
    template: Template,

    events: {
        'submit form': 'onSubmit',
        'click .create-new-nic-tag': 'onClickCreateNewNicTag'
    },

    ui: {
        'alert': '.alert',
        'nicTagSelect': 'select[name=nic_tag]',
        'newNicTagField': 'input[name=nic_tag]',
        'createNewNicTagButton': '.create-new-nic-tag'
    },

    modelEvents: {
        'error': 'onError'
    },

    initialize: function() {
        this.modelBinder = new Backbone.ModelBinder();
        this.model = new Network();
        this.nicTags = new NicTags();
        this.nicTagsSelect = new Backbone.Marionette.CollectionView({
            itemView: Backbone.View.extend({
                tagName: 'option',
                render: function() {
                    var name = this.model.get('name');
                    this.$el.text(name);
                    this.$el.attr("value", name);
                }
            }),
            collection: this.nicTags
        });
    },

    onClickCreateNewNicTag: function() {
        this.ui.nicTagSelect.hide();
        this.ui.createNewNicTagButton.hide();
        this.ui.newNicTagField.show().focus();
    },

    onSubmit: function(e) {
        var self = this;
        e.preventDefault();
        this.model.save(null, {success: function(model) {
            self.trigger('saved', model);
        }});
    },

    onError: function(model, xhr, options) {
        var fieldMap = {
            'name': '[name=name]',
            'subnet': '[name=subnet]',
            'gateway': '[name=gateway]',
            'provision_start_ip': '[name=provision_start_ip]',
            'provision_end_ip': '[name=provision_end_ip]',
            'resolvers': '[name=resolvers]',
            'nic_tag': '[name=nic_tag]',
            'vlan_id': '[name=vlan_id]'
        };
        var err = xhr.responseData;
        this.ui.alert.find('.message').html(err.message);
        this.$('.control-group').removeClass('error');
        _.each(err.errors, function(errObj) {
            var field = $(fieldMap[errObj.field]);
            field.parents('.control-group').addClass('error');
        }, this);
        this.ui.alert.find('.error').html(err.message);
        this.ui.alert.show();
    },



    onRender: function() {
        this.ui.newNicTagField.hide();
        this.nicTagsSelect.setElement(this.$('select[name=nic_tag]'));
        this.nicTags.fetch();
        var bindings = Backbone.ModelBinder.createDefaultBindings(this.el, 'name');
        bindings['resolvers'].converter = function(direction, value, attrName, model) {
            if (direction == 'ModelToView') {
                return (value || []).join(',');
            } else {
                return value.split(',');
            }
        };
        this.modelBinder.bind(this.model, this.el, bindings);
    },

    onShow: function() {
        this.$('.alert').hide();
    },

    onClose: function() {
        this.modelBinder.unbind();
    }
});

module.exports = View;

},{"backbone":"/Z1EQg","../tpl/networks-create.hbs":128,"../models/network":82,"../models/nictags":129}],84:[function(require,module,exports){
var Backbone = require('backbone');


var Template = require('../tpl/networks-detail.hbs');

var Addresses = require('../models/addresses');

var AddressesTableRowTemplate = require('../tpl/networks-detail-address-row.hbs');
var AddressesTableRow = Backbone.Marionette.ItemView.extend({
    tagName: "tr",
    template: AddressesTableRowTemplate,
    templateHelpers: {
        belongs_to_url: function() {
            var uuid = this.belongs_to_uuid;
            var type = this.belongs_to_type;
            var prefix;
            if (type === 'server') {
                prefix = 'servers';
            } else if (type === 'zone') {
                prefix = 'vms';
            } else {
                return null;
            }
            return _.str.sprintf('/%s/%s', prefix, uuid);
        }
    }
});

var AddressesTable = Backbone.Marionette.CollectionView.extend({
    itemView: AddressesTableRow
});

var NotesView = require('./notes');

var NetworkDetailView = Backbone.Marionette.ItemView.extend({
    template: Template,
    sidebar: "networks",
    initialize: function() {
        this.modelBinder = new Backbone.ModelBinder();
    },
    url: function() {
        return _.str.sprintf('networks/%s', this.model.get('uuid'));
    },
    onRender: function() {
        var addresses = new Addresses({uuid: this.model.get('uuid') });
        var addressesTable = new AddressesTable({
            el: this.$(".addresses tbody"),
            collection: addresses
        });
        addresses.fetch();
        this.modelBinder.bind(this.model, this.el);

        this.notesView = new NotesView({itemUuid: this.model.get('uuid'), el: this.$('.notes')});
        this.notesView.render();
    }
});

module.exports = NetworkDetailView;

},{"backbone":"/Z1EQg","../tpl/networks-detail.hbs":130,"../tpl/networks-detail-address-row.hbs":131,"../models/addresses":132,"./notes":43}],119:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='';
 if (alarms.length) { 
__p+='\n<div class="alarms-container has-alarms">\n<ul class="unstyled alarms-list">\n\t';
 alarms.each(function(alarm) { 
__p+='\n\t\t<li data-uuid="'+
((__t=( alarm.get('id') ))==null?'':__t)+
'">\n\t\t\t<div class="summary">\n\t\t\t\t<div class="fault-count">\n\t\t\t\t\t'+
((__t=( alarm.get('numEvents') ))==null?'':__t)+
'\n\t\t\t\t</div>\n\n\t\t\t\t<div class="probe-name">\n\t\t\t\t\t';
 if (alarm.probeGroup) { 
__p+='\n\t\t\t\t\t'+
((__t=( alarm.probeGroup.get('name') ))==null?'':__t)+
'\n\t\t\t\t\t';
 } else { 
__p+='\n\t\t\t\t\t'+
((__t=( alarm.probe.get('name') ))==null?'':__t)+
'\n\t\t\t\t\t';
 } 
__p+='\n\t\t\t\t</div>\n\n\t\t\t\t<div class="time-last-event">\n\t\t\t\t\t'+
((__t=( new Date(alarm.get('timeLastEvent')) ))==null?'':__t)+
'\n\t\t\t\t</div>\n\n\t\t\t\t<div class="actions">\n\t\t\t\t\t<a class="suppress"><i class="icon-remove icon-white"></i></a>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class="details">\n\t\t\t\t<ul class="unstyled faults">\n\t\t\t\t\t';
 _.each(alarm.get('faults'), function(fault) { 
__p+='\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<div class="fault-name">'+
((__t=( fault.probe.get('name') ))==null?'':__t)+
'</div>\n\t\t\t\t\t\t<div class="fault-time">'+
((__t=( new Date(fault.event.time) ))==null?'':__t)+
'</div>\n\t\t\t\t\t\t<div class="fault-message">'+
((__t=( fault.event.data.message ))==null?'':__t)+
'</div>\n\t\t\t\t\t</li>\n\t\t\t\t\t';
 }); 
__p+='\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</li>\n\t';
 }); 
__p+='\n</ul>\n</div>\n';
 } else { 
__p+='\n<div class="alarms-container no-alarms">There are no alarms at this time.</div>\n';
 } 
__p+='';
}
return __p;
};

},{}],95:[function(require,module,exports){
var Backbone = require('backbone');


var Probe = Backbone.Model.extend({
    urlRoot: '/_/amon/probes',
    idAttribute: 'uuid',
    
    url: function() {
        if (this.isNew()) {
            return this.urlRoot;
        } else {
            return _.str.sprintf('/_/amon/probes/%s/%s', this.get('user'), this.get('uuid'));
        }
    },

    validate: function(attrs) {
        var errors = {};

        if (!attrs.name || attrs.name.length === 0) {
            errors.name = 'name is required';
        }

        if (!attrs.type || attrs.type.length === 0) {
            errors.type = 'type is required';
        }

        if (Probe.types.indexOf(attrs.type) === -1) {
            errors.type = 'specified probe type does not exist';
        }

        if (_.size(errors) > 0) {
            return errors;
        }
    }
});

Probe.types = ['machine-up', 'log-scan', 'icmp', 'http'];

module.exports = Probe;


},{"backbone":"/Z1EQg"}],109:[function(require,module,exports){
var Backbone = require('backbone');


var Note = Backbone.Model.extend({
    idAttribute: 'uuid',
    urlRoot: function() {
        return '/_/notes/' + this.item_uuid;
    },
    initialize: function(options) {
        this.item_uuid = options.item_uuid;
    }
});

module.exports = Note;

},{"backbone":"/Z1EQg"}],117:[function(require,module,exports){


var Backbone = require('backbone');
var Platforms = Backbone.Collection.extend({
    url: '/_/platforms',
    parse: function(res) {
        var arr = [];
        _.each(res, function(n, d) {
            arr.push({
                version: d,
                latest: n.latest
            });
        });
        return arr;
    }
});

module.exports = Platforms;

},{"backbone":"/Z1EQg"}],121:[function(require,module,exports){
var Backbone = require('backbone');
var Alarm = Backbone.Model.extend({
    urlRoot: function() {
        return '/_/amon/alarms/' + this.get('user');
    },
    idAttribute: 'id',
    suppress: function(cb) {
        $.post(this.url() + '?action=suppress', {}, cb);
    }
});

module.exports = Alarm;
},{"backbone":"/Z1EQg"}],129:[function(require,module,exports){
var Backbone = require('backbone');


/**
 * NicTags
 */
module.exports = Backbone.Collection.extend({
    url: '/_/nic_tags'
});

},{"backbone":"/Z1EQg"}],132:[function(require,module,exports){
var Backbone = require('backbone');


module.exports = Backbone.Collection.extend({
    url: function() {
        return '/_/networks/' + this.uuid + '/ips';
    },
    
    initialize: function(options) {
        this.uuid = options.uuid;
    }
});

},{"backbone":"/Z1EQg"}],16:[function(require,module,exports){
var Backbone = require('backbone');

var Packages = require('../models/packages');
var PackagesTemplate = require('../tpl/packages.hbs');
var PackagesListItemTemplate = require('../tpl/packages-list-item.hbs');
var PackageForm = require('./packages-form');

var adminui = require('../adminui');

var PackagesListItemView = Backbone.Marionette.ItemView.extend({
    tagName: 'li',
    template: PackagesListItemTemplate,
    events: {
        'click': 'select'
    },

    initialize: function(options) {
        this.vent = options.vent;
    },

    onRender: function() {
        this.bindTo(this.vent, 'highlight', this.highlightIfThis, this);
    },

    highlightIfThis: function(model) {
        if (model == this.model) {
            this.highlight();
        }
    },
    unhighlight: function() {
        this.$el.siblings().removeClass('active');
    },

    highlight: function() {
        this.$el.siblings().removeClass('active');
        this.$el.addClass('active');
    },

    select: function() {
        this.highlight();
        this.trigger('select', this.model);
    }
});

var PackagesList = Backbone.Marionette.CollectionView.extend({
    tagName: 'ul',
    attributes: {
        'class': 'nav'
    },
    itemView: PackagesListItemView,
    initialize: function(options) {
        this.vent = options.vent;
    },

    deselect: function() {
        this.children.each(function(c) {
            c.unhighlight();
        }, this);
    },

    onBeforeItemAdded: function(itemView) {
        this.bindTo(itemView, 'select', this.onSelect, this);
        itemView.vent = this.vent;
    },

    onSelect: function(pkg) {
        this.vent.trigger('showpackage', pkg);
    }
});

var TraitsEditor = require('./traits-editor');

var PackagesDetailTemplate = require('../tpl/packages-detail-template.hbs');

var Handlebars = require('handlebars-runtime');
Handlebars.registerHelper('normalize', function(v) {
    if (v % 1024 === 0) {
        return _.str.sprintf("%d GB", v / 1024);
    }

    return _.str.sprintf("%d MB", v);
});

var PackageDetail = Backbone.Marionette.ItemView.extend({
    template: PackagesDetailTemplate,
    url: function() {
        return 'packages/' + this.model.get('uuid');
    },
    events: {
        'click .edit': 'onEdit',
        'click .traits': 'onTraits'
    },

    initialize: function(options) {},

    onEdit: function() {
        this.vent.trigger('showedit', this.model);
    },

    onSaveTraits: function(traits) {
        var that = this;
        this.model.set();
        this.model.save({
            traits: traits
        }, {
            success: function() {
                that.traitsEditor.close();
                that.model.fetch();
            }
        });
    },

    onTraits: function() {
        this.traitsEditor = new TraitsEditor();
        this.traitsEditor.traits = this.model.get('traits');
        this.bindTo(this.traitsEditor, 'save-traits', this.onSaveTraits);
        this.traitsEditor.show();
    }

});

var PackagesView = Backbone.Marionette.Layout.extend({
    regions: {
        'list': '#list',
        'detail': '#detail'
    },

    attributes: {
        id: "page-packages"
    },

    ui: {
        'searchInput': '.search input',
        'createButton': 'button.create'
    },

    sidebar: 'packages',

    url: 'packages',

    template: PackagesTemplate,

    initialize: function(options) {
        options = options || {};
        this.packages = new Packages();
        this.packages.fetch();
        this.bindTo(this.packages, 'error', this.onError);

        this.initialPackageUUID = options.uuid;
        this.vent = new Marionette.EventAggregator();
    },

    onError: function(model, xhr) {
        adminui.vent.trigger('error', {
            xhr: xhr,
            context: 'packages / ufds',
            message: 'error occured while retrieving package information'
        });
    },

    onRender: function() {
        var packagesList = new PackagesList({
            collection: this.packages,
            vent: this.vent
        });

        this.bindTo(this.ui.searchInput, 'input', this.search, this);
        this.bindTo(this.ui.createButton, 'click', this.onClickCreateButton, this);

        this.bindTo(this.vent, 'showpackage', this.showPackage, this);
        this.bindTo(this.vent, 'showedit', this.showForm, this);
        this.bindTo(this.packages, 'reset', this.showInitialPackage, this);

        this.bindTo(this.detail, 'show', function(view) {
            adminui.router.applyUrl(view);
        });

        this.list.show(packagesList);
    },

    onClickCreateButton: function() {
        this.showForm();
    },

    search: function() {
        var val = this.ui.searchInput.val();
        this.packages.search(val);
    },

    showForm: function(model) {
        if (!model) {
            this.$(".sidebar").animate({
                opacity: 0.4
            });
            this.list.currentView.deselect();
        }
        var form = new PackageForm({
            model: model
        });
        this.detail.show(form);
        this.detail.currentView.vent = this.vent;
    },

    showPackage: function(pkg) {
        if (!pkg) {
            this.showInitialPackage();
            return;
        }

        this.$(".sidebar").animate({
            opacity: 1
        });

        if ((!this.detail.currentView) || (this.detail.currentView.model !== pkg || (false === this.detail.currentView instanceof(PackageDetail)))) {
            this.detail.show(new PackageDetail({
                model: pkg
            }));
        }

        if (!this.packages.get(pkg.get('uuid'))) {
            this.packages.add(pkg);
        }

        this.vent.trigger('highlight', pkg);

        this.detail.currentView.vent = this.vent;
    },

    showInitialPackage: function() {
        var pkg;
        if (this.initialPackageUUID) {
            pkg = this.packages.get(this.initialPackageUUID);
        } else {
            pkg = this.packages.at(0);
        }

        if (pkg) {
            this.showPackage(pkg);
        } else {
            this.detail.reset();
        }
    }
});


module.exports = PackagesView;
},{"backbone":"/Z1EQg","../tpl/packages.hbs":133,"../tpl/packages-list-item.hbs":134,"../tpl/packages-detail-template.hbs":135,"../models/packages":53,"./packages-form":124,"../adminui":2,"./traits-editor":60,"handlebars-runtime":136}],136:[function(require,module,exports){
/*

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

// lib/handlebars/browser-prefix.js
var Handlebars = {};
module.exports = Handlebars;

(function(Handlebars, undefined) {
;
// lib/handlebars/base.js

Handlebars.VERSION = "1.0.0-rc.3";
Handlebars.COMPILER_REVISION = 2;

Handlebars.REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '>= 1.0.0-rc.3'
};

Handlebars.helpers  = {};
Handlebars.partials = {};

Handlebars.registerHelper = function(name, fn, inverse) {
  if(inverse) { fn.not = inverse; }
  this.helpers[name] = fn;
};

Handlebars.registerPartial = function(name, str) {
  this.partials[name] = str;
};

Handlebars.registerHelper('helperMissing', function(arg) {
  if(arguments.length === 2) {
    return undefined;
  } else {
    throw new Error("Could not find property '" + arg + "'");
  }
});

var toString = Object.prototype.toString, functionType = "[object Function]";

Handlebars.registerHelper('blockHelperMissing', function(context, options) {
  var inverse = options.inverse || function() {}, fn = options.fn;

  var type = toString.call(context);

  if(type === functionType) { context = context.call(this); }

  if(context === true) {
    return fn(this);
  } else if(context === false || context == null) {
    return inverse(this);
  } else if(type === "[object Array]") {
    if(context.length > 0) {
      return Handlebars.helpers.each(context, options);
    } else {
      return inverse(this);
    }
  } else {
    return fn(context);
  }
});

Handlebars.K = function() {};

Handlebars.createFrame = Object.create || function(object) {
  Handlebars.K.prototype = object;
  var obj = new Handlebars.K();
  Handlebars.K.prototype = null;
  return obj;
};

Handlebars.logger = {
  DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, level: 3,

  methodMap: {0: 'debug', 1: 'info', 2: 'warn', 3: 'error'},

  // can be overridden in the host environment
  log: function(level, obj) {
    if (Handlebars.logger.level <= level) {
      var method = Handlebars.logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, obj);
      }
    }
  }
};

Handlebars.log = function(level, obj) { Handlebars.logger.log(level, obj); };

Handlebars.registerHelper('each', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var i = 0, ret = "", data;

  if (options.data) {
    data = Handlebars.createFrame(options.data);
  }

  if(context && typeof context === 'object') {
    if(context instanceof Array){
      for(var j = context.length; i<j; i++) {
        if (data) { data.index = i; }
        ret = ret + fn(context[i], { data: data });
      }
    } else {
      for(var key in context) {
        if(context.hasOwnProperty(key)) {
          if(data) { data.key = key; }
          ret = ret + fn(context[key], {data: data});
          i++;
        }
      }
    }
  }

  if(i === 0){
    ret = inverse(this);
  }

  return ret;
});

Handlebars.registerHelper('if', function(context, options) {
  var type = toString.call(context);
  if(type === functionType) { context = context.call(this); }

  if(!context || Handlebars.Utils.isEmpty(context)) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

Handlebars.registerHelper('unless', function(context, options) {
  return Handlebars.helpers['if'].call(this, context, {fn: options.inverse, inverse: options.fn});
});

Handlebars.registerHelper('with', function(context, options) {
  if (!Handlebars.Utils.isEmpty(context)) return options.fn(context);
});

Handlebars.registerHelper('log', function(context, options) {
  var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
  Handlebars.log(level, context);
});
;
// lib/handlebars/utils.js

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

Handlebars.Exception = function(message) {
  var tmp = Error.prototype.constructor.apply(this, arguments);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }
};
Handlebars.Exception.prototype = new Error();

// Build out our basic SafeString type
Handlebars.SafeString = function(string) {
  this.string = string;
};
Handlebars.SafeString.prototype.toString = function() {
  return this.string.toString();
};

var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

var escapeChar = function(chr) {
  return escape[chr] || "&amp;";
};

Handlebars.Utils = {
  escapeExpression: function(string) {
    // don't escape SafeStrings, since they're already safe
    if (string instanceof Handlebars.SafeString) {
      return string.toString();
    } else if (string == null || string === false) {
      return "";
    }

    if(!possible.test(string)) { return string; }
    return string.replace(badChars, escapeChar);
  },

  isEmpty: function(value) {
    if (!value && value !== 0) {
      return true;
    } else if(toString.call(value) === "[object Array]" && value.length === 0) {
      return true;
    } else {
      return false;
    }
  }
};
;
// lib/handlebars/runtime.js

Handlebars.VM = {
  template: function(templateSpec) {
    // Just add water
    var container = {
      escapeExpression: Handlebars.Utils.escapeExpression,
      invokePartial: Handlebars.VM.invokePartial,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          return Handlebars.VM.program(fn, data);
        } else if(programWrapper) {
          return programWrapper;
        } else {
          programWrapper = this.programs[i] = Handlebars.VM.program(fn);
          return programWrapper;
        }
      },
      programWithDepth: Handlebars.VM.programWithDepth,
      noop: Handlebars.VM.noop,
      compilerInfo: null
    };

    return function(context, options) {
      options = options || {};
      var result = templateSpec.call(container, Handlebars, context, options.helpers, options.partials, options.data);

      var compilerInfo = container.compilerInfo || [],
          compilerRevision = compilerInfo[0] || 1,
          currentRevision = Handlebars.COMPILER_REVISION;

      if (compilerRevision !== currentRevision) {
        if (compilerRevision < currentRevision) {
          var runtimeVersions = Handlebars.REVISION_CHANGES[currentRevision],
              compilerVersions = Handlebars.REVISION_CHANGES[compilerRevision];
          throw "Template was precompiled with an older version of Handlebars than the current runtime. "+
                "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").";
        } else {
          // Use the embedded version info since the runtime doesn't know about this revision yet
          throw "Template was precompiled with a newer version of Handlebars than the current runtime. "+
                "Please update your runtime to a newer version ("+compilerInfo[1]+").";
        }
      }

      return result;
    };
  },

  programWithDepth: function(fn, data, $depth) {
    var args = Array.prototype.slice.call(arguments, 2);

    return function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
  },
  program: function(fn, data) {
    return function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
  },
  noop: function() { return ""; },
  invokePartial: function(partial, name, context, helpers, partials, data) {
    var options = { helpers: helpers, partials: partials, data: data };

    if(partial === undefined) {
      throw new Handlebars.Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    } else if (!Handlebars.compile) {
      throw new Handlebars.Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    } else {
      partials[name] = Handlebars.compile(partial, {data: data !== undefined});
      return partials[name](context, options);
    }
  }
};

Handlebars.template = Handlebars.VM.template;
;
// lib/handlebars/browser-suffix.js
})(Handlebars);
;

},{}],98:[function(require,module,exports){
var Backbone = require('backbone');

var NicsRowView = Backbone.Marionette.ItemView.extend({
    tagName: 'tr',
    template: require('../tpl/nics-row.hbs'),

    events: {
        'change input': 'onSelect'
    },

    onSelect: function(e) {
        var checked = this.$('input').is(':checked');

        if (checked) {
            this.$el.addClass('selected');
            this.trigger('select', this.model);
        } else {
            this.$el.removeClass('selected');
            this.trigger('deselect', this.model);
        }
    }

});
module.exports = NicsRowView;
},{"backbone":"/Z1EQg","../tpl/nics-row.hbs":137}],99:[function(require,module,exports){
var Backbone = require('backbone');
var Networks = require('../models/networks');
var JobProgress = require('./job-progress');
var VmAddNicView = Backbone.Marionette.ItemView.extend({
    template: require('../tpl/vm-add-nic.hbs'),
    attributes: {
        'class': 'modal'
    },
    events: {
        'click button[type=submit]': 'onSubmit'
    },

    initialize: function(options) {
        this.vm = options.vm;
        this.selectedNetwork = new Backbone.Model();
        this.networks = new Networks();
    },

    onSubmit: function() {
        var self = this;
        var vm = this.vm;
        var netuuid = this.selectedNetwork.get('uuid');
        vm.addNics([{
            uuid: netuuid
        }], function(job) {
            self.$el.modal('hide').remove();
            var view = new JobProgress({
                model: job
            });
            view.show();
            self.bindTo(view, 'execution', function(st) {
                if (st === 'succeeded') {
                    vm.fetch();
                }
            });
        });
    },

    onRender: function() {
        var self = this;
        var bindings = {
            'button[type=submit]': {
                attributes: [{
                    observe: 'uuid',
                    name: 'disabled',
                    onGet: function(val, attrName) {
                        return !val.length;
                    }
                }]
            },
            'select[name=network]': {
                observe: 'uuid',
                selectOptions: {
                    collection: function() {
                        var col = self.networks.toJSON();
                        col = _(col).map(function(n) {
                            n.label = [n.name, n.subnet].join(' - ');
                            return n;
                        });
                        col.unshift({
                            label: 'Select a Network'
                        });
                        return col;
                    },
                    labelPath: 'label',
                    valuePath: 'uuid'
                }
            }
        };

        this.$el.modal('show');
        this.networks.fetch({
            success: function() {
                self.stickit(self.selectedNetwork, bindings);
            }
        });
    }
});

module.exports = VmAddNicView;
},{"backbone":"/Z1EQg","../tpl/vm-add-nic.hbs":138,"../models/networks":54,"./job-progress":28}],108:[function(require,module,exports){
var Note = require('./note');

var Backbone = require('backbone');

var Notes = module.exports = Backbone.Collection.extend({
    model: Note,
    url: function() {
        return '/_/notes/' + this.item_uuid;
    },
    parse: function(col) {
        return _.map(col, function(obj) {
            obj.created = new Date(obj.created);
            return obj;
        });
    }
});
},{"backbone":"/Z1EQg","./note":109}],110:[function(require,module,exports){
var Backbone = require('backbone');
var ProbeSelectionTemplate  = require('../../tpl/probe-selection.hbs');

module.exports = Backbone.Marionette.ItemView.extend({
    template: ProbeSelectionTemplate,
    events: {
        'click a': 'selectedProbeType'
    },
    selectedProbeType: function(e) {
        var elm = $(e.currentTarget);
        var probe = elm.attr('data-probe-type');
        this.trigger('select', probe);
        this.$el.modal('hide');
    }
});
},{"backbone":"/Z1EQg","../../tpl/probe-selection.hbs":139}],113:[function(require,module,exports){
var Backbone = require('backbone');
var Template = require('../../tpl/monitoring-machine-up-probe.hbs');

module.exports = Backbone.Marionette.ItemView.extend({

    template: Template,

    events: {
        'click button': 'done'
    },

    initialize: function(options) {
        options = options || {};

        this.params = {
            type: 'machine-up',
            agent: options.vm.get('uuid'),
            name: _.str.sprintf('machine-up-%s', options.vm.get('alias'))
        };
    },

    focus: function() {
        return this;
    },

    onRender: function() {
        return this;
    },

    done: function() {
        this.trigger('done', this.params);
    },

    hide: function() {
        this.$el.modal('hide');
    }
});
},{"backbone":"/Z1EQg","../../tpl/monitoring-machine-up-probe.hbs":140}],114:[function(require,module,exports){
var Backbone = require('backbone');
var ConfigHttpProbe = Backbone.Marionette.ItemView.extend({

    template: require('../../tpl/monitoring-http-probe.hbs'),

    events: {
        'click button.btn-primary': 'onComplete',
        'submit form': 'onComplete',

        'keyup input[name=name]': 'validateName',
        'keyup input[name=url]': 'validateUrl',
        'keyup input[name=username]': 'validateUsername',
        'keyup input[name=password]': 'validatePassword',
        'keyup input[name=interval]': 'validateInterval',
        'keyup input[name=max-response-tine]': 'validateMaxResponseTime'
    },

    initialize: function(options) {
        this.params = {type: 'http', config: {}};

        // XXX There should probably be a way to select which agent to run this probe...
        this.params.agent  = options.vm.get('uuid');
    },

    focus: function() {
        this.$('input')[0].focus();
    },

    bindElements: function() {
        this.$url = this.$('input[name=url]');
        this.$urlGroup = this.$('.control-group.url');
        this.$protocol = this.$('select[name=protocol]');

        this.$name = this.$('input[name=name]');
        this.$nameGroup = this.$('.control-group.name');

        this.$username = this.$('input[name=username]');
        this.$usernameGroup = this.$('.control-group.username');

        this.$password = this.$('input[name=password]');
        this.$passwordGroup = this.$('.control-group.password');

        this.$interval = this.$('input[name=interval]');
        this.$intervalGroup = this.$('.control-group.interval');

        this.$maxResponseTime = this.$('input[name=max-response-time]');
        this.$maxResponseTimeGroup = this.$('.control-group.max-response-time');
    },

    onRender: function() {
        this.bindElements();
    },


    /**
     * Input Callbacks
     */
    onComplete: function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.validateUrl() &&
            this.validateName() &&
            this.validateUsername() &&
            this.validatePassword() &&
            this.validateInterval() &&
            this.validateMaxResponseTime()) {

            this.populateParams();
            this.trigger('done', this.params);
        }
    },

    populateParams: function() {
        this.params.config.url = _.str.sprintf("%s://%s", this.$protocol.val(), this.$url.val());

        if (this.$name.val().length) {
            this.params.name = this.$name.val();
        }
        if (this.$interval.val().length) {
            this.params.config.interval = Number(this.$interval.val());
        }
        if (this.$username.val().length) {
            this.params.config.username = this.$username.val();
        }
        if (this.$password.val().length) {
            this.params.config.password = this.$password.val();
        }
        if (this.$maxResponseTime.val().length) {
            this.params.config.maxResponseTime = this.$maxResponseTime.val();
        }
    },

    validateUrl: function() {
        if (this.$url.val().length === 0) {
            this.$urlGroup.addClass('error');
        } else {
            this.$urlGroup.removeClass('error');
            return true;
        }
    },

    validateName: function() {
        if (this.$name.val().length === 0) {
            this.$nameGroup.addClass('error');
        } else {
            this.$nameGroup.removeClass('error');
            return true;
        }
    },

    validateUsername: function() { return true; },

    validatePassword: function() { return true; },

    validateMaxResponseTime: function() {
        var val = this.$maxResponseTime.val();
        if (val.length > 0 && /^\d+$/.test(val) === false) {
            this.$maxResponseTimeGroup.addClass('error');
        } else {
            this.$maxResponseTimeGroup.removeClass('error');
            return true;
        }

    },

    validateInterval: function() {
        var val = this.$interval.val();
        if (val.length > 0 && /^\d+$/.test(val) === false) {
            this.$intervalGroup.addClass('error');
        } else {
            this.$intervalGroup.removeClass('error');
            return true;
        }
    }
});

module.exports = ConfigHttpProbe;


},{"backbone":"/Z1EQg","../../tpl/monitoring-http-probe.hbs":141}],115:[function(require,module,exports){
var Backbone = require('backbone');
var HOST_REGEX = /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*\.?$/;

var ICMPProbe = Backbone.Marionette.ItemView.extend({

    template: require('../../tpl/monitoring-icmp-probe.hbs'),

    events: {
        "click button.btn-primary": 'onComplete',
        'submit form': 'onComplete',
        "keyup input[name=host]": 'onHostChange',
        "keyup input[name=name]": 'onNameChange'
    },

    initialize: function(options) {
        this.params = {
            type: 'icmp',
            agent: options.vm.get('uuid'),
            config: {}
        };
    },


    bindElements: function() {
        this.$host = this.$('input[name=host]');
        this.$hostControlGroup = this.$('.control-group.host');

        this.$name = this.$('input[name=name]');
        this.$nameControlGroup = this.$('.control-group.name');
    },

    focus: function() {
        this.$('input:first').focus();
    },

    onRender: function() {
        this.bindElements();

        return this;
    },

    // --- Dom Event Handlers

    onNameChange: function() {
        this.validateName();
    },

    onHostChange: function() {
        this.validateHost();
        this.$name.val(_.str.sprintf('icmp-%s', this.$host.val()));
    },

    onComplete: function(e) {
        console.log('onComplete');
        e.preventDefault();
        e.stopPropagation();

        if (this.validateName() && this.validateHost()) {
            this.trigger('done', this.getParams());
        }
    },

    getParams: function() {
        this.params.name = this.$name.val();
        this.params.config.host = this.$host.val();
        return this.params;
    },

    validateName: function() {
        var val = this.$name.val();
        if (val.length === 0) {
            this.$nameControlGroup.addClass('error');
            return false;
        } else {
            this.$nameControlGroup.removeClass('error');
            return true;
        }
    },

    validateHost: function() {
        var val = this.$host.val();
        if (val.length === 0 || false === HOST_REGEX.test(val)) {
            this.$hostControlGroup.addClass('error');
            return false;
        } else {
            this.$hostControlGroup.removeClass('error');
            return true;
        }
    }


});

module.exports = ICMPProbe;
},{"backbone":"/Z1EQg","../../tpl/monitoring-icmp-probe.hbs":142}],120:[function(require,module,exports){
var Alarm = require('./alarm');
var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
    model: Alarm,
    url: '/_/amon/alarms',

    parse: function(resp) {
        var data = Backbone.Model.prototype.parse.call(this, resp);
        if (data.timeOpened) {
            data.timeOpened = new Date(data.timeOpened);
        }
        if (data.timeClosed) {
            data.timeClosed = new Date(data.timeClosed);
        }
        if (data.timeLastEvent) {
            data.timeLastEvent = new Date(data.timeLastEvent);
        }
        return data;
    },

    fetchAlarms: function(userUuid) {
        var params = $.param({user: userUuid});
        this.fetch({ data: params });
    }
});

},{"backbone":"/Z1EQg","./alarm":121}],122:[function(require,module,exports){
var ProbeGroup = require('./probe-group');
var Backbone = require('backbone');

var ProbeGroups = Backbone.Collection.extend({
    model: ProbeGroup,
    url: function() {
        return _.str.sprintf("/_/amon/probegroups/%s", this.user);
    }
});

module.exports = ProbeGroups;
},{"backbone":"/Z1EQg","./probe-group":143}],126:[function(require,module,exports){
var Backbone = require('backbone');
var Model = require('./model');

module.exports = Model.extend({
    urlRoot: function() {
        return _.str.sprintf('/_/users/%s/keys', this.user);
    },

    idAttribute: 'fingerprint',

    initialize: function(options) {
        if (!options.user) {
            throw new TypeError('options.user required');
        }

        this.user = options.user;
    }
});
},{"backbone":"/Z1EQg","./model":23}],111:[function(require,module,exports){
var Backbone = require('backbone');
var BaseView = require('../base');

var SelectMonitorView = BaseView.extend({
    template: 'select-monitor',

    render: function() {
        this.$el.html(this.template());
        return this;
    }

});

module.exports = SelectMonitorView;
},{"backbone":"/Z1EQg","../base":50}],112:[function(require,module,exports){
var Backbone = require('backbone');
var BaseView = require('../base');
var tplLogScan = require('../../tpl/probe-log-scan.hbs');

module.exports = Backbone.Marionette.ItemView.extend({

    template: tplLogScan,

    events: {
        'keyup input[name=name]': 'nameChanged',
        'keyup input[name=path]': 'pathChanged',
        'keyup input[name=pattern]': 'patternChanged',

        'change input[name=is-regex]': 'isRegexChanged',

        'keyup input[name=threshold]': 'thresholdChanged',
        'keyup input[name=period]': 'periodChanged',
        'click button': 'done'
    },

    initialize: function(options) {
        _.bindAll(this);

        this.params = {};
        this.params.type = 'log-scan';
        this.params.machine = options.vm.get('uuid');
        this.params.config = {};
        this.params.config.match = {};
    },

    bindElements: function() {
        this.$name = this.$('input[name=name]');
        this.$path = this.$('input[name=path]');
        this.$threshold = this.$('input[name=threshold]');
        this.$isRegex = this.$('input[name=is-regex]');
        this.$pattern = this.$('input[name=pattern]');
        this.$period = this.$('input[name=period]');
        this.$completeButton = this.$('button');
    },

    focus: function() {
        this.$('input:first').focus();

        return this;
    },

    onRender: function() {
        this.bindElements();
        this.initialState();

        return this;
    },

    initialState: function() {
        this.$completeButton.addClass('disabled');
    },



    done: function() {
        this.trigger('done', this.params);
    },

    hide: function() {
        this.$el.modal('hide');
    },

    showError: function(field, msg) {
        this.$('.control-group-'+field).addClass('error');
    },

    hideError: function(field) {
        this.$('.control-group-'+field).removeClass('error');
    },

    nameChanged: function() {
        var vRes = this._validateName();
        if (true === vRes) {
            this.hideError('name');
            this.params.name = this.$name.val();
        } else {
            this.showError('name', vRes);
        }
    },

    pathChanged: function() {
        if (true === this._validatePath()) {
            this.hideError('path');
            this.params.config.path = this.$path.val();
        } else {
            this.showError('path', 'Path likely to be invalid.');
        }
    },

    patternChanged: function() {
        if (true === this._validatePattern()) {
            this.hideError('pattern');
            console.log(this.$pattern.val());
            this.params.config.match.pattern = this.$pattern.val();
            console.log(this.params);

        } else {
            this.showError('pattern', 'Pattern is required');
        }
    },

    thresholdChanged: function() {
        var regex = /^\d+$/;
        var value = this.$threshold.val();
        if (value.length === 0) {
            delete this.params.config.threshold;
            this.hideError();
            return;
        }

        if (regex.test(value)) {
            this.params.config.threshold = Number(value);
            this.hideError('threshold');
        } else {
            this.showError('threshold', 'Threshold should be a number');
        }
    },

    periodChanged: function() {
        var res = this._validatePeriod();

        if (res === true) {
            this.params.config.period = this.$period.val();
            this.hideError('period');
        } else {
            this.showError('period', res);
        }
    },

    isRegexChanged: function() {
        if (this.$isRegex.is(':checked')) {
            this.params.config.match.type = 'regex';
        } else {
            this.params.config.match.type = 'substring';
        }
    },

    regexChanged: function() {
        var res = this._validateThreshold();

        if (res === true) {
            this.params.config.match.pattern = this.$pattern.val();
            this.hideError('regex');
        } else {
            this.showError('regex', res);
        }
    },

    _validatePath: function() {
        var regex = /^\/.+/;
        if (regex.test(this.$path.val())) {
            return true;
        } else {
            return 'path liekly to be invalid.';
        }
    },

    _validatePattern: function() {
        console.log('validate-pattern');
        if (this.$pattern.val().length) {
            return true;
        } else {
            return "Pattern must be provided";
        }
    },

    _validatePeriod: function() {
        if (this.$period.val().length) {
            if (/^\d+$/.test(this.$period.val())) {
                return "Period should be a number";
            }
        }
        return true;
    },

    _validateThreshold: function() {
        if (this.$threshold.val().length) {
            if (/^\d+$/.test(this.$threshold.val())) {
                return "Threshold should be a number";
            }
        }
        return true;
    },

    _validateName: function() {
        if (this.$name.val().length === 0) {
            return 'probe name is required';
        }

        return true;
    }
});


},{"backbone":"/Z1EQg","../../tpl/probe-log-scan.hbs":144,"../base":50}],143:[function(require,module,exports){
var Backbone = require('backbone');
var ProbeGroup = Backbone.Model.extend({
    idAttribute: 'uuid',
    url: function() {
        if (this.isNew()) {
            return _.str.sprintf("/_/amon/probegroups/%s", this.get('user'));
        } else {
            return _.str.sprintf("/_/amon/probegroups/%s/%s", this.get('user'), this.get('uuid'));
        }
    }
});

module.exports = ProbeGroup;
},{"backbone":"/Z1EQg"}],22:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "\n<div class=\"branding\">\n	<span class=\"joyent\">Joyent</span>\n	<span class=\"sdc\">SmartDataCenter</span> \n	<span class=\"product\">Operations Portal</span>\n	<span class=\"version\">7.0</span>\n</div>\n\n<div class=\"alert alert-error\">\n	<span class=\"msg\"></span>\n</div>\n\n<form class=\"form\">\n	<div class=\"control-group\">\n		<label class=\"control-label\">Username</label>\n		<input class=\"input\" type=\"text\" name=\"username\">\n	</div>\n\n	<div class=\"control-group\">\n		<label class=\"control-label\">Password</label>\n		<input class=\"input\" type=\"password\" name=\"password\">\n	</div>\n\n	<div class=\"controls\">\n		<button type=\"submit\" class=\"btn btn-large btn-info\">Sign In to SmartDataCenter</button>\n	</div>\n</form>\n";
  });

},{"handlebars-runtime":136}],24:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div id=\"topbar\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"span6 branding\">\n        <span class=\"joyent\">Joyent</span>\n        <span class=\"sdc\">SmartDataCenter</span> \n        <span class=\"product\">Operations Portal</span>\n        <span class=\"version\">7.0</span>\n      </div>\n      <div class=\"span6 acc-controls\">\n        Signed in as: &nbsp; <i class=\"icon-user\"></i> <span class=\"login-name\"></span>\n        &nbsp;\n        <a class=\"signout\">Sign out</a>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div id=\"rootnav\">\n  <div class=\"container\">\n    <div class=\"navbar\">\n      <div class=\"navbar-inner\">\n        <ul class=\"nav\" id=\"mainnav\">\n          <li data-view=\"dashboard\"><a href=\"/dashboard\">Dashboard</a></li>\n\n          <li data-view=\"vms\"><a href=\"/vms\">Virtual Machines</a></li>\n          <li data-view=\"servers\"><a href=\"/servers\">Servers</a></li>\n          <li data-view=\"users\"><a href=\"/users\">Users</a></li>\n\n          <li data-view=\"images\"><a href=\"/images\">Images</a></li>\n          <li data-view=\"networks\"><a href=\"/networks\">Networks</a></li>\n          <li data-view=\"packages\"><a href=\"/packages\">Packages</a></li>\n\n          <li data-view=\"jobs\"><a href=\"/jobs\">Jobs</a></li>\n          <li data-view=\"services\"><a href=\"/services\">Services</a></li>\n\n          <li class=\"fishbulb\"><a href=\"/fishbulb\" target=\"fishbulb\">Cloud Analytics</a></li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container\">\n  <div class=\"row\">\n    <div id=\"content\" class=\"span12\"></div>\n  </div>\n</div>\n";
  });

},{"handlebars-runtime":136}],25:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <p>Message: ";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n    ";
  return buffer;
  }

  buffer += "<div class=\"modal hide error-modal\">\n  <div class=\"modal-header\">\n    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n    <h3>An Error Occured: "
    + escapeExpression(((stack1 = ((stack1 = depth0.xhr),stack1 == null || stack1 === false ? stack1 : stack1.statusText)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n  </div>\n  <div class=\"modal-body\">\n    <p>Context: ";
  if (stack2 = helpers.context) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.context; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</p>\n    ";
  stack2 = helpers['if'].call(depth0, depth0.message, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    <p>HTTP Status: <pre>"
    + escapeExpression(((stack1 = ((stack1 = depth0.xhr),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = depth0.xhr),stack1 == null || stack1 === false ? stack1 : stack1.statusText)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</pre></p>\n    <p>HTTP body: \n      <pre>";
  if (stack2 = helpers.responseBody) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.responseBody; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</pre>\n    </p>\n  </div>\n  <div class=\"modal-footer\">\n    <a href=\"#\" class=\"btn\" data-dismiss=\"modal\">Close</a>\n  </div>\n</div>";
  return buffer;
  });

},{"handlebars-runtime":136}],29:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div id=\"page-vms\">\n	<div class=\"page-header\">\n		<h1>Virtual Machines\n			<div class=\"actions\">\n				<button class=\"provision-button btn btn-primary\"> <i class=\"icon-plus icon-white\"></i> Provision a New VM </button>\n				<button class=\"toggle-filter btn\" data-toggle=\"button\"><i class=\"icon-filter\"></i> Filter Options</button>\n			</div>\n		</h1>\n	</div>\n\n	<div class=\"row\">\n		<div class=\"vms-list span12\">\n			<table class=\"table table-striped\">\n				<thead>\n					<tr>\n						<th class=\"status\">Status</th>\n						<th class=\"alias\">Alias</th>\n						<th class=\"memory\">Memory</th>\n						<th class=\"package\">Package</th>\n					</tr>\n				</thead>\n				<tbody></tbody>\n				<caption align=\"bottom\">\n					<span class=\"record-count\"></span> Virtual Machines\n				</caption>\n			</table>\n		</div>\n\n\n		<div class=\"filter-panel vms-filter span3\">\n			<h4>Filter Options</h4>\n			<div class=\"alert alert-error\"></div>\n			<form>\n				<label>Data Center</label>\n				<select name=\"dc\" disabled></select>\n\n				<label>UUID</label>\n				<input type=\"text\" name=\"uuid\" placeholder=\"UUID\">\n\n				<label>State</label>\n				<select name=\"state\">\n					<option>running</option>\n					<option>stopped</option>\n					<option>destroyed</option>\n				</select>\n\n				<label>Alias</label>\n				<input type=\"text\" name=\"alias\" placeholder=\"alias\">\n\n				<label>Server</label>\n				<input type=\"text\" name=\"server_uuid\" placeholder=\"Server UUID\">\n\n				<label>RAM</label>\n				<input type=\"text\" name=\"ram\" placeholder=\"RAM\">\n\n				<label>Owner</label>\n				<input type=\"text\" name=\"owner_uuid\" placeholder=\"owner UUID\">\n\n				<button class=\"btn btn-large btn-info\"><i class=\"icon-filter icon-white\"></i> Apply Filters</button>\n			</form>\n		</div>\n	</div>\n</div>";
  });

},{"handlebars-runtime":136}],32:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"page-header\">\n  <h1>\n    <span class=\"vm-alias\"></span>\n    <small class=\"uuid vm-uuid\"></small>\n    <div class=\"resource-status\">Status <span class=\"vm-state\"></span></div>\n  </h1>\n</div>\n<div class=\"actions btn-group\">\n  <a class=\"btn dropdown-toggle btn-primary\" data-toggle=\"dropdown\" href=\"#\">\n    Actions <span class=\"caret\"></span>\n  </a>\n\n  <ul class=\"dropdown-menu\">\n    <li><a href=\"#\" class=\"start\">Start</a></li>\n    <li><a href=\"#\" class=\"stop\">Stop</a></li>\n    <li><a href=\"#\" class=\"reboot\">Reboot</a></li>\n    <li class=\"divider\"></li>\n    <li><a class=\"resize\" href=\"#\">Resize</a></li>\n    <li class=\"divider\"></li>\n    <li><a class=\"delete\" href=\"#\">Delete</a></li>\n    <li class=\"divider\"></li>\n    <li><a href=\"#\" class=\"create-probe\">Create Probe</a></li>\n  </ul>\n</div>\n\n\n\n\n\n\n<div class=\"vms-details\">\n  <div class=\"row\">\n    <div class=\"span12\">\n      <h3>Overview</h3>\n      <table class=\"overview\">\n        <tr>\n          <th>Name</th>\n          <td>\n            <span class=\"alias\">\n              <span class=\"value vm-alias\"></span>\n              <a class=\"btn-link rename\"><i class=\"icon-edit\"></i> rename</a>\n            </span>\n            <span class=\"vm-uuid\"></span>\n          </td>\n        </tr>\n        <tr>\n          <th>Owner</th>\n          <td>\n            <a class=\"owner-name\" href=\"/users/"
    + escapeExpression(((stack1 = ((stack1 = depth0.vm),stack1 == null || stack1 === false ? stack1 : stack1.owner_uuid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.cn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n            <span class=\"owner-uuid\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.vm),stack1 == null || stack1 === false ? stack1 : stack1.owner_uuid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            <a class=\"btn-link change-owner\"><i class=\"icon-edit\"></i> change</a>\n          </td>\n        </tr>\n\n        <tr>\n          <th>Memory</th>\n          <td>\n            <span class=\"vm-memory\"></span> MB\n          </td>\n        </tr>\n\n        <tr>\n          <th>Swap</th>\n          <td><span class=\"vm-swap\"></span> MB</td>\n        </tr>\n\n        <tr>\n          <th>IP Addresse</th>\n          <td>\n            <span class=\"vm-ips\"></span>\n          </td>\n        </tr>\n        <tr>\n          <th>Image</th>\n          <td>\n            <a class=\"image-name-version\"></a>\n            <span class=\"image-uuid\"></span>\n          </td>\n        </tr>\n        <tr>\n          <th>Server</th>\n          <td>\n            <a class=\"server-hostname\"></a>\n            <span class=\"server-uuid\"></span>\n          </td>\n        </tr>\n        <tr>\n          <th>Package</th>\n          <td>\n            <a class=\"package\">\n              <span class=\"package-name\"></span>\n              <span class=\"package-version\"></span>\n            </a>\n            <span class=\"billing-id\"></span>\n          </td>\n        </tr>\n      </table>\n    </div><!-- span12 view overview -->\n  </div><!-- row -->\n</div><!-- details -->\n\n<div class=\"row-fluid\">\n  <div class=\"span12\">\n    <div class=\"nics\"></div>\n  </div>\n</div> <!-- end row-fluid container for nics-->\n\n\n<div class=\"row-fluid\">\n    <div class=\"span12\">\n      <div class=\"snapshots\">\n      </div>\n    </div>\n  </div>\n  \n  <div class=\"row\">\n    <div class=\"span12\">\n      <h3>Metadata</h3>\n      <div class=\"metadata\"></div>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"span6\">\n      <h3>Tags</h3>\n      <div class=\"tags\"></div>\n    </div>\n\n    <div class=\"span6 notes\"></div>\n  </div>\n</div>\n";
  return buffer;
  });

},{"handlebars-runtime":136}],49:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"page\" id=\"page-provision\">\n	<div class=\"page-header\">\n		<h1>Provision a Virtual Machine</h1>\n	</div>\n\n	<form class=\"form-horizontal span12\">\n		<div class=\"alert alert-block alert-error\">\n			<strong>OH SNAP!</strong> <span class=\"message\"></span>\n		</div>\n\n		<fieldset>\n			<div class=\"control-group\">\n				<label class=\"control-label\" for=\"input-owner\">Owner</label>\n				<div class=\"controls\">\n					<input id=\"input-owner\" type=\"text\" placeholder=\"enter a username\" class=\"input-xlarge\" name=\"owner\">\n					<p class=\"help-inline\">Required</p>\n				</div>\n			</div>\n\n			<div class=\"control-group\">\n				<label class=\"control-label\" for=\"input-alias\">Alias</label>\n				<div class=\"controls\">\n					<input id=\"input-alias\" name=\"alias\"\n					placeholder=\"name as it appears to the customer\"\n					type=\"text\" class=\"input-xlarge\">\n					<span class=\"help-inline\">Optional</span>\n				</div>\n			</div>\n\n			<div class=\"control-group\">\n				<label class=\"control-label\">Package</label>\n				<div class=\"controls\">\n					<select name=\"package\"></select>\n				</div>\n\n				<div class=\"package-preview-container\"></div>\n			</div>\n\n      <div class=\"control-group\">\n        <label class=\"control-label\">Image</label>\n        <div class=\"controls\">\n          <input id=\"input-image\" type=\"text\" placeholder=\"enter UUID or search image by name\" class=\"input-xlarge\" name=\"image\">\n          <p class=\"help-inline\">Required</p>\n          <p class=\"help-block\">Image to provision machine with</p>\n        </div>\n      </div>\n\n      <div class=\"control-group\">\n        <label class=\"control-label\">Server</label>\n        <div class=\"controls\">\n          <input id=\"input-server\" type=\"text\" placeholder=\"enter UUID or search by hostname\" class=\"input-xlarge\" name=\"server\">\n          <p class=\"help-inline\">Optional</p>\n          <p class=\"help-block\">Server to provision machine to</p>\n        </div>\n      </div>\n\n      <div class=\"control-group\">\n        <label class=\"control-label\">Networks</label>\n        <div class=\"network-checkboxes controls\">\n          <label class=\"checkbox\"><input type=\"checkbox\" name=\"networks[]\" /><span class=\"name\">My Network<span></label>\n          <p class=\"help-block\">Must select at least one network</p>\n        </div>\n      </div>\n\n      <div class=\"control-group control-group-brand\">\n        <label class=\"control-label\">Brand</label>\n        <div class=\"controls\">\n          <select name=\"brand\">\n            <option value=\"joyent\">joyent</option>\n            <option value=\"joyent-minimal\">joyent-minimal</option>\n            <option value=\"kvm\">kvm</option>\n          </select>\n        </div>\n      </div>\n\n      <div class=\"form-actions\">\n        <button type=\"submit\" class=\"btn btn-primary\">Provision</button>\n      </div>\n\n    </div>\n\n  </fieldset>\n</form>\n</div>";
  });

},{"handlebars-runtime":136}],46:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"page-header\">\n	<h1>Servers\n		<div class=\"actions\">\n				<button class=\"toggle-filter btn\" data-toggle=\"button\"><i class=\"icon-filter\"></i> Filter Options</button>\n			</div>\n	</h1>\n</div>\n\n<div class=\"row-fluid\">\n	<div class=\"servers-list span12\">\n		<table class=\"table table-striped\">\n			<thead>\n				<tr>\n					<th class=\"status\">Status</th>\n					<th>Hostname</th>\n					<th class=\"memory\">RAM Usage</th>\n					<th></th>\n				</tr>\n			</thead>\n			<tbody>\n			</tbody>\n			<caption align=\"bottom\">\n				<span class=\"record-count\"></span> Servers\n			</caption>\n		</table>\n	</div>\n\n	<div class=\"filter-panel servers-filter span3\">\n		<h3>Filter Options</h3>\n		<form>\n			<label>Data Center</label>\n			<select name=\"dc\" disabled></select>\n\n			<label>UUID</label>\n			<input type=\"text\" name=\"uuid\" placeholder=\"UUID\">\n\n			<label>Setup State</label>\n			<select name=\"setup\">\n				<option value=\"\">any</option>\n				<option value=\"true\">setup</option>\n				<option value=\"false\">not setup</option>\n			</select>\n\n			<button class=\"btn btn-large btn-info\">Apply Filters</button>\n		</form>\n	</div>\n</div>";
  });

},{"handlebars-runtime":136}],47:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  if (stack1 = helpers.status) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.status; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n    label-warn\n    ";
  }

function program5(depth0,data) {
  
  
  return "\n    <i class=\"icon-ok-sign icon-white\"></i>\n    ";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <span class=\"percent\">";
  if (stack1 = helpers.memory_percent) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.memory_percent; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " %</span>\n\n  <span class=\"breakdown\">";
  if (stack1 = helpers.memory_available_mb) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.memory_available_mb; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " / ";
  if (stack1 = helpers.memory_total_mb) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.memory_total_mb; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " MB</span>\n\n  ";
  return buffer;
  }

function program9(depth0,data) {
  
  
  return "\n  <button class=\"setup btn btn-mini\">Setup</button>\n  ";
  }

  buffer += "<td class=\"status\">\n  <span class=\"\n    label\n    ";
  stack1 = helpers['if'].call(depth0, depth0.running, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    \">\n    ";
  stack1 = helpers['if'].call(depth0, depth0.running, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  if (stack1 = helpers.status) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.status; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n  </span>\n</td>\n<td class=\"name\">\n  <a>";
  if (stack1 = helpers.hostname) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.hostname; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n  <span class=\"uuid\">";
  if (stack1 = helpers.uuid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.uuid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n</td>\n<td class=\"memory\">\n  ";
  stack1 = helpers['if'].call(depth0, depth0.memory_total_bytes, {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</td>\n<td>\n  ";
  stack1 = helpers['if'].call(depth0, depth0.not_setup, {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</td>";
  return buffer;
  });

},{"handlebars-runtime":136}],58:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n      <span class=\"server-setting-up\">\n        Setting Up\n      </span>\n      ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <span class=\"server-state ";
  if (stack1 = helpers.status) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.status; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n        ";
  if (stack1 = helpers.status) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.status; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n      </span>\n      ";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "\n<div class=\"btn-group pull-right actions\">\n  <button class=\"btn btn-info setup\">Setup Server</button>\n</div>\n";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  if (stack1 = helpers.rack_identifier) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.rack_identifier; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n            <a class=\"change-rack-id\">Change <i class=\"icon-edit\"></i></a>\n            ";
  return buffer;
  }

function program9(depth0,data) {
  
  
  return "\n            <span style=\"color: #aaa;\">No Rack Assigned</span>\n            <a class=\"change-rack-id\">Assign to Rack <i class=\"icon-edit\"></i></a>\n            ";
  }

function program11(depth0,data) {
  
  
  return "\n            Reserved\n            <a class=\"change-reserve\">Unreserve <i class=\"icon-edit\"></i></a>\n            ";
  }

function program13(depth0,data) {
  
  
  return "\n            Not Reserved\n            <a class=\"change-reserve\">Reserve <i class=\"icon-edit\"></i></a>\n            ";
  }

function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n          <td>"
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n          <td>"
    + escapeExpression(((stack1 = depth0.size),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GB</td>\n        </tr>\n        ";
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <table class=\"traits\">\n      <thead>\n        <tr>\n          <th>Property</th>\n          <th>Value</th>\n        </tr>\n      </thead>\n      <tbody>\n        ";
  stack1 = helpers.each.call(depth0, depth0.traits, {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </tbody>\n      <tfoot>\n      <td colspan=\"2\"><button class=\"btn btn-small modify-traits\"><i class=\"icon-edit\"></i> Edit Traits</button></td>\n    </tfoot>\n    </table>\n    ";
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n          <td style=\"width: 100px;\">"
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n          <td>"
    + escapeExpression(((stack1 = depth0.value),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        </tr>\n        ";
  return buffer;
  }

function program20(depth0,data) {
  
  
  return "\n    <div class=\"zero-state\">\n      <p>There are no traits configured for this server.</p>\n      <button class=\"btn btn-small modify-traits\"><i class=\"icon-edit\"></i> Assign Traits</button>\n    </div>\n    ";
  }

  buffer += "<div class=\"page-header\">\n  <h1>";
  if (stack1 = helpers.hostname) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.hostname; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n    <small class=\"uuid\">";
  if (stack1 = helpers.uuid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.uuid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</small>\n    <div class=\"server-state-container\">\n      Status &nbsp;\n      ";
  stack1 = helpers['if'].call(depth0, depth0.setting_up, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n\n  </h1>\n</div>\n\n";
  stack1 = helpers.unless.call(depth0, depth0.setup, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div class=\"row\">\n  <div class=\"span7\">\n    <table class=\"overview\">\n      <tbody>\n        <tr>\n          <th>Datacenter</th>\n          <td>";
  if (stack1 = helpers.datacenter) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.datacenter; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        </tr>\n\n        <tr>\n          <th>Hostname</th>\n          <td>";
  if (stack1 = helpers.hostname) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.hostname; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        </tr>\n        <tr class=\"rack\">\n          <th>Rack</th>\n          <td>\n            ";
  stack1 = helpers['if'].call(depth0, depth0.rack_identifier, {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </td>\n        </tr>\n        <tr>\n          <th>Reserved</th>\n          <td>\n            ";
  stack1 = helpers['if'].call(depth0, depth0.reserved, {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div><!--span-->\n\n  <div class=\"span5\">\n    <div class=\"platform well\">\n      <h4>Platform Version</h4>\n      <div class=\"current\"><strong>Current</strong> ";
  if (stack1 = helpers.current_platform) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.current_platform; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n      <div class=\"boot\"><strong>Next Boot</strong> ";
  if (stack1 = helpers.boot_platform) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.boot_platform; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n      \n      <a class=\"change-platform\">Change Boot Platform <i class=\"icon-edit\"></i></a>\n    </div>\n  </div>\n</div><!--row-->\n\n<div class=\"row\">\n  <div class=\"span12\">\n    <h3>Network Interfaces</h3>\n    <div class=\"nics\"></div>\n  </div>\n\n  <div class=\"span12\">\n    <h3>Hardware</h3>\n    <table class=\"hardware\">\n      <tbody>\n        <tr>\n          <th>CPU Type</th>\n          <td>";
  if (stack1 = helpers.cpu_type) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cpu_type; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        </tr>\n        <tr>\n          <th>CPU Physical Cores</th>\n          <td>";
  if (stack1 = helpers.cpu_physical_cores) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cpu_physical_cores; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        </tr>\n        <tr>\n          <th>CPU Total Cores</th>\n          <td>";
  if (stack1 = helpers.cpu_total_cores) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cpu_total_cores; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        </tr>\n        <tr>\n          <th>Serial Number</th>\n          <td>";
  if (stack1 = helpers.serial_number) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.serial_number; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        </tr>\n        <tr>\n          <th>Total Memory</th>\n          <td>";
  if (stack1 = helpers.total_memory) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.total_memory; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " MiB</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div><!-- row-->\n\n<div class=\"row\">\n  <div class=\"span8\">\n    <h3>Disks</h3>\n    <table class=\"disks\">\n      <thead>\n        <tr>\n          <th>Device</th>\n          <th>Size</th>\n        </tr>\n      </thead>\n      <tbody>\n        ";
  stack1 = helpers.each.call(depth0, depth0.disks, {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </tbody>\n    </table>\n\n    <h3>Traits</h3>\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.traits),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(20, program20, data),fn:self.program(17, program17, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </div>\n\n  <div class=\"span4\">\n    <div class=\"notes\"></div>\n  </div>\n</div>\n\n\n<div class=\"row\">\n  <div class=\"span12\">\n    <br>\n    <div class=\"well\" style=\"overflow: hidden\">\n      <p>The following actions are destructive and cannot be undone.</p>\n      <div class=\"pull-left\">\n        <a class=\"btn btn-warning reboot\"><i class=\"icon icon-white icon-refresh\"></i> Reboot Server</a>\n      </div>\n      <div class=\"pull-right\">\n        <a class=\"btn btn-danger factory-reset\">Factory Reset</a>\n        <a class=\"btn btn-danger forget\"><i class=\"icon icon-white icon-trash\"></i> Forget Server</a>\n      </div>\n    </div>\n  </div>\n</div>";
  return buffer;
  });

},{"handlebars-runtime":136}],65:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"row\">\n  <div class=\"counters\">\n    <div class=\"counter span3\">\n      <div class=\"value vm-count\"></div>\n      <div class=\"name\">VIRTUAL MACHINES</div>\n    </div>\n    \n    <div class=\"counter span3\">\n      <div class=\"value server-count\">-</div>\n      <div class=\"name\">Servers</div>\n    </div>\n\n    <div class=\"counter span3\">\n      <div class=\"value server-count\">-</div>\n      <div class=\"name\">Servers</div>\n    </div>\n    \n    <div class=\"counter span3\">\n      <div class=\"value server-count\">-</div>\n      <div class=\"name\">Servers</div>\n    </div>\n  </div>\n</div>\n<br>\n\n<div class=\"row\">\n  <div class=\"span6\">\n    <div class=\"alarms-container\">\n      <div id=\"dashboard-alarms\" class=\"alarms\"></div>\n    </div>\n    <div class=\"widget-label\">\n      Alarms\n    </div>\n  </div>\n</div>";
  });

},{"handlebars-runtime":136}],85:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"page-header\">\n  <h1>Users &amp; Groups \n    <div class=\"actions\">\n      <button data-event=\"new-user\" class=\"btn btn-primary\">\n        <i class=\"icon-plus icon-white\"></i>\n        New User\n      </button>\n    </div>\n  </h1>\n</div>\n\n<div class=\"row-fluid\">\n  <div class=\"span9 users-list\">\n    <table class=\"table\">\n      <thead>\n        <tr>\n          <th>Login</th>\n          <th>Email</th>\n          <th>Name</th>\n        </tr>\n      </thead>\n      <tbody></tbody>\n    </table>\n  </div>\n\n  <div class=\"filter-panel users-filter span3\">\n    <h3>Filter Options</h3>\n    <div class=\"alert alert-error\"></div>\n    <form>\n      <label>UUID</label>\n      <input type=\"text\" name=\"uuid\" placeholder=\"UUID\">\n\n      <label>Login Name</label>\n      <input type=\"text\" name=\"login\" placeholder=\"Login name\">\n\n      <label>Email</label>\n      <input type=\"text\" name=\"email\" placeholder=\"Email Address\">\n\n      <label>First Name</label>\n      <input type=\"text\" name=\"cn\" placeholder=\"First name\">\n\n      <label>Last Name</label>\n      <input type=\"text\" name=\"sn\" placeholder=\"Last name\">\n\n      <button class=\"btn btn-large btn-info\">Apply Filters</button>\n    </form>\n  </div>\n</div>\n";
  });

},{"handlebars-runtime":136}],86:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<td>\n  <a href=\"/users/";
  if (stack1 = helpers.uuid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.uuid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"login\">";
  if (stack1 = helpers.login) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.login; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n</td>\n<td>";
  if (stack1 = helpers.email) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.email; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>";
  if (stack1 = helpers.cn) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cn; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  if (stack1 = helpers.sn) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.sn; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>";
  return buffer;
  });

},{"handlebars-runtime":136}],133:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"row\">\n	<div class=\"span3\">\n		<div class=\"sidebar\">\n			<div class=\"page-header\">\n				<h1>Packages</h1>\n				<button class=\"btn btn-info create\">\n					<i class=\"icon-plus-sig	n icon-white\"></i> Create Package\n				</button>\n			</div>\n\n			<div class=\"search\">\n				<input type=\"text\" class=\"span3\" placeholder=\"Filter by name or Billing ID\">\n			</div>\n\n			<div id=\"list\"></div>\n		</div>\n	</div>\n\n	<div id=\"detail\" class=\"span9\"></div>\n</div>";
  });

},{"handlebars-runtime":136}],134:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<a>\n	<div class=\"name\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n  <div class=\"version\">";
  if (stack1 = helpers.version) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.version; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n</a>";
  return buffer;
  });

},{"handlebars-runtime":136}],135:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "label-info";
  }

  buffer += "<div class=\"page-header\">\n  <h1>\n    ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n    ";
  if (stack1 = helpers.version) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.version; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n    <div class=\"actions\">\n      <button class=\"btn btn-small edit\"><i class=\"icon-pencil\"></i> Edit Package</button>\n      <button class=\"btn btn-small traits\"><i class=\"icon-pencil\"></i> Edit Traits</button>\n    </div>\n  </h1>\n  <div class=\"flags\">\n    <span class=\"label ";
  stack1 = helpers['if'].call(depth0, depth0.active, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \">ACTIVE</span>\n  </div>\n</div>\n\n\n<h3>Memory &amp; CPU</h3>\n\n<div class=\"memory\">\n  <strong>RAM</strong>\n  <div class=\"value\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.normalize),stack1 ? stack1.call(depth0, depth0.max_physical_memory, options) : helperMissing.call(depth0, "normalize", depth0.max_physical_memory, options)))
    + "</div>\n</div>\n\n<div class=\"vcpus\">\n  <strong>VCPUs</strong>\n  <div class=\"value\">";
  if (stack2 = helpers.vcpus) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.vcpus; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</div>\n</div>\n\n<div class=\"swap\">\n  <strong>Swap</strong>\n  <div class=\"value\">";
  if (stack2 = helpers.max_swap) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.max_swap; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " MB</div>\n</div>\n\n<div class=\"cpu-cap\">\n  <strong>CPU Cap</strong>\n  <div class=\"value\">";
  if (stack2 = helpers.cpu_cap) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.cpu_cap; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</div>\n</div>\n\n<div class=\"max-processes\">\n  <strong>Max Processes</strong>\n  <div class=\"value\">";
  if (stack2 = helpers.max_lwps) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.max_lwps; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</div>\n</div>\n\n\n<h3>Storage</h3>\n<div class=\"quota\">\n  <strong>Disk Quota</strong>\n  <div class=\"value\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.normalize),stack1 ? stack1.call(depth0, depth0.quota, options) : helperMissing.call(depth0, "normalize", depth0.quota, options)))
    + "</div>\n</div>\n\n<div class=\"io-priority\">\n  <strong>ZFS IO Priority</strong>\n  <div class=\"value\">";
  if (stack2 = helpers.zfs_io_priority) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.zfs_io_priority; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</div>\n</div>\n\n<h3>Billing</h3>\n\n<div class=\"billing-id\">\n  <strong>Billing ID</strong>\n  <div class=\"value\">";
  if (stack2 = helpers.uuid) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.uuid; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</div>\n</div>";
  return buffer;
  });

},{"handlebars-runtime":136}],67:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<td>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td><td>";
  if (stack1 = helpers.fingerprint) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.fingerprint; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td><td><a class=\"remove\"><i class=\"icon-remove-sign\"></i> Delete</a></td>";
  return buffer;
  });

},{"handlebars-runtime":136}],68:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"page-header\">\n  <h1>\n    <span data-bind=\"text: cn\"></span>\n    <small class=\"uuid\" data-bind=\"text: uuid\"></small>\n\n      <div class=\"actions\">\n        <button class=\"edit-user btn\"> <i class=\"icon-pencil\"></i> Modify User Details</button>\n      </div>\n  </h1>\n</div>\n\n<table class=\"table\">\n  <tr>\n    <th>Login</th>\n    <td><span data-bind=\"text: login\"></span></td>\n  </tr>\n  <tr>\n    <th>Email</th>\n    <td><span data-bind=\"text: email\"></span></td>\n  </tr>\n  <tr>\n    <th>Company</th>\n    <td><span data-bind=\"text: company\"></span></td>\n  </tr>\n</table>\n\n<h3>SSH Keys</h3>\n<div class=\"ssh-keys\">\n  <table class=\"table\">\n    <thead>\n      <tr>\n        <th>Name</th>\n        <th>Fingerprint</th>\n        <th></th>\n      </tr>\n    </thead>\n    <tbody></tbody>\n    <tfoot>\n      <td colspan=\"3\"><button class=\"btn add-key\">\n        <i class=\"icon-plus-sign\"></i>\n        Add Key</button></td>\n    </tfoot>\n  </table>\n</div>\n\n<h3>Virtual Machines</h3>\n<div class=\"vms-list\">\n  <table class=\"table\">\n    <thead>\n      <tr>\n        <th class=\"status\">Status</th>\n        <th class=\"alias\">Alias</th>\n        <th class=\"memory\">Memory</th>\n        <th class=\"package\">Package</th>\n      </tr>\n    </thead>\n    <tbody>\n    </tbody>\n  </table>\n</div>";
  });

},{"handlebars-runtime":136}],72:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n  <span class=\"public\">public</span>\n  ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <span class=\"private\">owner</span>\n    ";
  stack1 = helpers['if'].call(depth0, depth0.acl, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <span class=\"acl\">\n      and <a>"
    + escapeExpression(((stack1 = ((stack1 = depth0.acl),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " others</a>\n    </span>\n    ";
  return buffer;
  }

  buffer += "<td class=\"state\">\n  <span class=\"";
  if (stack1 = helpers.state) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.state; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.state) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.state; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n</td>\n<td>\n  <a class=\"image-name\" href=\"/images/";
  if (stack1 = helpers.uuid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.uuid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  if (stack1 = helpers.version) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.version; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a><br>\n  <span class=\"uuid\">";
  if (stack1 = helpers.uuid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.uuid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n</td>\n<td>\n  ";
  if (stack1 = helpers.publish_date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.publish_date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n</td>\n<td>";
  if (stack1 = helpers.os) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.os; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td class=\"visibility\">\n  ";
  stack1 = helpers['if'].call(depth0, depth0['public'], {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</td>";
  return buffer;
  });

},{"handlebars-runtime":136}],73:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div id=\"page-images\">\n  <div class=\"page-header\">\n    <h1>Images\n    <div class=\"actions\">\n      <a class=\"btn btn-success import-image\">Import Image</a>\n      <a class=\"btn btn-info create-image\">Create Image</a>\n    </div>\n    </h1>\n  </div>\n  <table class=\"table images-table\">\n    <thead>\n      <tr>\n        <th class=\"state\"></th>\n        <th>Name</th>\n        <th>Published</th>\n        <th>OS</th>\n        <th>Visibility</th>\n      </tr>\n    </thead>\n    <tbody>\n    </tbody>\n    <caption align=\"bottom\">\n      <span class=\"record-count\"></span> Images\n    </caption>\n  </table>\n</div>";
  });

},{"handlebars-runtime":136}],74:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n      <span class=\"active\">active</span>\n      ";
  }

function program3(depth0,data) {
  
  
  return "\n      <span class=\"unactivated\">unactivated</span>\n      ";
  }

function program5(depth0,data) {
  
  
  return "\n    <a class=\"btn enable\">Enable</a>\n    ";
  }

function program7(depth0,data) {
  
  
  return "\n    <a class=\"btn activate btn-info\">Activate</a>\n    ";
  }

function program9(depth0,data) {
  
  
  return "\n    <a class=\"btn disable btn-danger\">Disable</a>\n    ";
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"os-image\">\n    <img src=\"/img/os-";
  if (stack1 = helpers.os) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.os; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ".png\">\n  </div>\n  ";
  return buffer;
  }

function program13(depth0,data) {
  
  
  return "\n      Image is available to the <strong>public</strong>\n    ";
  }

function program15(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      This image is <strong>restricted to the owner</strong>\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.acl),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    ";
  return buffer;
  }
function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        and\n        ";
  stack1 = helpers.each.call(depth0, depth0.acl, {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  return buffer;
  }
function program17(depth0,data) {
  
  var buffer = "";
  buffer += " "
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + " ";
  return buffer;
  }

function program19(depth0,data) {
  
  
  return "\n      <i class=\"icon-lock\"></i> Make Image Private\n    ";
  }

function program21(depth0,data) {
  
  
  return "\n      <i class=\"icon-globe\"></i> Make Image Public\n    ";
  }

function program23(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li>\n      <strong>CPU Type</strong>\n      <span class=\"value\">";
  if (stack1 = helpers.cpu_type) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cpu_type; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    </li>\n    ";
  return buffer;
  }

function program25(depth0,data) {
  
  
  return "\n    <a class=\"show-upload-form\">Upload a new file</a>\n    ";
  }

function program27(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"file\">\n      ";
  stack1 = helpers.each.call(depth0, depth0.files, {hash:{},inverse:self.noop,fn:self.program(28, program28, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </li>\n    ";
  return buffer;
  }
function program28(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"sha1\"><span>"
    + escapeExpression(((stack1 = depth0.sha1),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n        <div class=\"size\"><span>"
    + escapeExpression(((stack1 = depth0.size),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " bytes</span></div>\n        <div class=\"compression\"><span>"
    + escapeExpression(((stack1 = depth0.compression),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n      ";
  return buffer;
  }

function program30(depth0,data) {
  
  
  return "\n    <li class=\"empty\">\n        There are currently no files in this Image. An image must have a file before it can be activated.\n    </li>\n    ";
  }

function program32(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        "
    + escapeExpression(((stack1 = depth0.name),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " / "
    + escapeExpression(((stack1 = depth0.description),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n        ";
  return buffer;
  }

function program34(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li>\n      <strong>SSH Key</strong>\n      <span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.requirements),stack1 == null || stack1 === false ? stack1 : stack1.ssh_key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </li>\n    ";
  return buffer;
  }

function program36(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li>\n      <strong>Minimum RAM</strong>\n      <span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.requirements),stack1 == null || stack1 === false ? stack1 : stack1.min_ram)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </li>\n    ";
  return buffer;
  }

function program38(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li>\n      <strong>Maximum RAM</strong>\n      <span class=\"value\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.requirements),stack1 == null || stack1 === false ? stack1 : stack1.max_ram)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </li>\n    ";
  return buffer;
  }

function program40(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n    <li>\n      <strong>Paaswords Generated for users:</strong>\n      <span class=\"value\">\n        ";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.requirements),stack1 == null || stack1 === false ? stack1 : stack1.users), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </span>\n    </li>\n    ";
  return buffer;
  }

function program42(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <h3>Drivers</h3>\n  <ul class=\"unstyled attributes requirements\">\n    <li>\n      <strong>NIC Driver</strong>\n      <span class=\"value\">\n        ";
  if (stack1 = helpers.nic_driver) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.nic_driver; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n      </span>\n    </li>\n    <li>\n      <strong>Disk Driver</strong>\n      <span class=\"value\">\n        ";
  if (stack1 = helpers.disk_driver) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.disk_driver; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n      </span>\n    </li>\n  </ul>\n  ";
  return buffer;
  }

  buffer += "<div class=\"page-header\">\n  <h1>\n    <span class=\"name\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> <span class=\"version\">";
  if (stack1 = helpers.version) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.version; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    <div class=\"resource-status\">\n      Status: \n      ";
  stack1 = helpers['if'].call(depth0, depth0.active, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = helpers['if'].call(depth0, depth0.unactivated, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n  </h1>\n</div>\n\n  <div class=\"actions\">\n    ";
  stack1 = helpers['if'].call(depth0, depth0.enableable, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  stack1 = helpers['if'].call(depth0, depth0.activatable, {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  stack1 = helpers['if'].call(depth0, depth0.disableable, {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</div>\n\n\n<div class=\"basic\">\n  ";
  stack1 = helpers['if'].call(depth0, depth0.os, {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <p class=\"description\">";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n\n  <div class=\"visibility\">\n    ";
  stack1 = helpers['if'].call(depth0, depth0['public'], {hash:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<br>\n\n    <button class=\"btn btn-small change-publicity\">\n    ";
  stack1 = helpers['if'].call(depth0, depth0['public'], {hash:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </button>\n  </div>\n\n</div>\n\n\n<div class=\"details\">\n  <h3>Overview</h3>\n  <ul class=\"unstyled attributes\">\n    <li>\n      <strong>UUID</strong>\n      <span class=\"value uuid\">";
  if (stack1 = helpers.uuid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.uuid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    </li>\n\n    <li>\n      <strong>Owner</strong>\n      <span class=\"value uuid\">";
  if (stack1 = helpers.owner) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.owner; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    </li>\n\n    <li>\n      <strong>Name / Version</strong>\n      <span class=\"value\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  if (stack1 = helpers.version) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.version; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    </li>\n\n    <li>\n      <strong>Publish Date</strong>\n      <span class=\"value\">";
  if (stack1 = helpers.published_at) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.published_at; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    </li>\n\n    <li>\n      <strong>Operating System</strong>\n      <span class=\"value\">";
  if (stack1 = helpers.os) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.os; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    </li>\n\n    <li>\n      <strong>Image Type</strong>\n      <span class=\"value\">";
  if (stack1 = helpers.type) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.type; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    </li>\n\n    ";
  stack1 = helpers['if'].call(depth0, depth0.cpu_type, {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </ul>\n\n  <h3>Files \n    ";
  stack1 = helpers['if'].call(depth0, depth0.unactivated, {hash:{},inverse:self.noop,fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </h3>\n  <ul class=\"unstyled files\">\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.files),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(27, program27, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    <li class=\"progress\">\n      <div class=\"progress progress-striped active\">\n        <div class=\"bar\" style=\"width: 0%;\"></div>\n      </div>\n    </li>\n\n    ";
  stack2 = helpers.unless.call(depth0, ((stack1 = depth0.files),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n\n    <li class=\"upload\">\n      <div class=\"select\">\n        <a class=\"add-file\">Select image file to upload</a>\n      </div>\n      <div class=\"compression\">\n        Compression\n        <select class=\"input-small\">\n          <option value=\"none\">none</option>\n          <option value=\"bzip2\">bzip2</option>\n          <option value=\"gzip\">gzip</option>\n        </select>\n      </div>\n      <button class=\"btn btn-small btn-info start-upload\">Start Upload</button>\n      <button class=\"btn btn-small cancel-upload-form\">Cancel</button>\n    </li>\n  </ul>\n\n  <form class=\"uploadform\">\n    <input type=\"file\" class=\"fileinput\">\n  </form>\n\n  <h3>Requirements</h3>\n  <ul class=\"unstyled attributes requirements\">\n    <li>\n      <strong>Networks</strong>\n      <span class=\"value\">\n        ";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.requirements),stack1 == null || stack1 === false ? stack1 : stack1.networks), {hash:{},inverse:self.noop,fn:self.program(32, program32, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </span>\n    </li>\n\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.requirements),stack1 == null || stack1 === false ? stack1 : stack1.ssh_key), {hash:{},inverse:self.noop,fn:self.program(34, program34, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.requirements),stack1 == null || stack1 === false ? stack1 : stack1.min_ram), {hash:{},inverse:self.noop,fn:self.program(36, program36, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.requirements),stack1 == null || stack1 === false ? stack1 : stack1.max_ram), {hash:{},inverse:self.noop,fn:self.program(38, program38, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.requirements),stack1 == null || stack1 === false ? stack1 : stack1.generate_passwords), {hash:{},inverse:self.noop,fn:self.program(40, program40, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </ul>\n\n  ";
  stack2 = helpers['if'].call(depth0, depth0.nic_driver, {hash:{},inverse:self.noop,fn:self.program(42, program42, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</div>\n";
  return buffer;
  });

},{"handlebars-runtime":136}],75:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<form class=\"form-horizontal\" method=\"post\">\n  <div class=\"page-header\">\n    <h2>Import Image</h2>\n  </div>\n\n  <legend>Select Import Source</legend>\n  <div class=\"control-group\">\n    <label class=\"radio\">\n      <input type=\"radio\" name=\"import-source\" value=\"url\">\n      Import from Image API image URL\n    </label>\n\n\n    <label class=\"radio\">\n      <input type=\"radio\" name=\"import-source\" value=\"manifest\">\n      Import from image manifest\n    </label>\n  </div>\n\n  <div class=\"alert alert-error\">\n    Alerts\n  </div>\n\n\n  <div class=\"control-group manifest\">\n    <label class=\"control-label\">Manifest (.dsmanifest)</label>\n    <div class=\"controls\">\n      <textarea rows=\"18\" class=\"span8 input input-xlarge\" name=\"manifest\"></textarea>\n    </div>\n  </div>\n\n  <div class=\"control-group url\">\n    <label class=\"control-label\">URL to dataset</label>\n    <div class=\"controls\">\n      <input type=\"text\" class=\"input input-xlarge\">\n      <p class=\"help-block\">\n        Example: https://datasets.joyent.com/datasets/7456f2b0-67ac-11e0-b5ec-832e6cf079\n      </p>\n    </div>\n  </div>\n\n  <button class=\"btn btn-primary\" class=\"import\">Import</button>\n</form>";
  });

},{"handlebars-runtime":136}],76:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<td>\n  ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n</td>\n<td>\n  ";
  if (stack1 = helpers.uuid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.uuid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n</td>\n<td class=\"execution ";
  if (stack1 = helpers.execution) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.execution; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n  <span>";
  if (stack1 = helpers.execution) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.execution; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n</td>\n<td>\n  <button class=\"btn btn-mini details\"><i class=\"icon-search\"></i> View Details</button>\n</td>\n";
  return buffer;
  });

},{"handlebars-runtime":136}],77:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"page-header\">\n  <h2>Jobs</h2>\n</div>\n\n<div class=\"jobs-container\">\n  <table class=\"table\">\n    <thead>\n      <th>Name</th>\n      <th>UUID</th>\n      <th>Execution</th>\n      <th></th>\n    </thead>\n    <tbody>\n    </tbody>\n  </table>\n</div>";
  });

},{"handlebars-runtime":136}],79:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"list\"></div>\n<div class=\"details\"></div>";
  });

},{"handlebars-runtime":136}],80:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<A>\n  <div class=\"name\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n  <div class=\"subnet\">";
  if (stack1 = helpers.subnet) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.subnet; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n</a>";
  return buffer;
  });

},{"handlebars-runtime":136}],81:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"page-header\">\n  <h1>Networks</h1>\n  <button type=\"button\" class=\"btn btn-info\" name=\"create\"><i class=\"icon-plus-sign icon-white\"></i> Create  Network</button>\n</div>\n<ul class=\"nav items\"></ul>";
  });

},{"handlebars-runtime":136}],87:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n    <li class=\"";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.error),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\">\n      <div class=\"name\">";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</div>\n      <div class=\"result\">";
  if (stack2 = helpers.result) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.result; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</div>\n      ";
  stack2 = helpers['if'].call(depth0, depth0.error, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </li>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "error";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n      <div class=\"error\">\n        ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.error),stack1 == null || stack1 === false ? stack1 : stack1.message), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </div>\n      ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        "
    + escapeExpression(((stack1 = ((stack1 = depth0.error),stack1 == null || stack1 === false ? stack1 : stack1.message)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n        ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  if (stack1 = helpers.error) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.error; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n        ";
  return buffer;
  }

function program9(depth0,data) {
  
  
  return "\n    <span class=\"wait\">\n      Working... <img src=\"/img/job-progress-loading.gif\">\n    </span>\n    ";
  }

  buffer += "<div class=\"modal-header\">\n  <h2>Job ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " </h2>\n   <small>";
  if (stack1 = helpers.uuid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.uuid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</small>\n</div>\n<div class=\"modal-body\">\n  <div class=\"chain-results\">\n    <ol>\n    ";
  stack1 = helpers.each.call(depth0, depth0.chain_results, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ol>\n  </div>\n</div>\n<div class=\"modal-footer\">\n  <div class=\"pull-left\">\n    <span class=\"execution\">Status: <span class=\"";
  if (stack1 = helpers.execution) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.execution; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.execution) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.execution; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></span> \n    ";
  stack1 = helpers.unless.call(depth0, depth0.finished, {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n  <button class=\"btn\" data-dismiss=\"modal\">Close</button>\n</div>";
  return buffer;
  });

},{"handlebars-runtime":136}],94:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  if (stack1 = helpers.alias) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.alias; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  if (stack1 = helpers.uuid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.uuid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n    ";
  return buffer;
  }

  buffer += "<td class=\"status\">\n	<span class=\"label ";
  if (stack1 = helpers.state) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.state; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n		<i class=\"icon-ok-sign icon-white\"></i> ";
  if (stack1 = helpers.state) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.state; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n	</span>\n</td>\n<td class=\"alias\">\n  <a>\n    ";
  stack1 = helpers['if'].call(depth0, depth0.alias, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </a>\n  <span class=\"uuid\">";
  if (stack1 = helpers.uuid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.uuid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n</td>\n<td class=\"memory\">";
  if (stack1 = helpers.ram) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ram; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " MB</td>\n<td class=\"package\">";
  if (stack1 = helpers.package_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.package_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  if (stack1 = helpers.package_version) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.package_version; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>";
  return buffer;
  });

},{"handlebars-runtime":136}],96:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-header\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"modal\">×</button>\n  <h3>Are you sure you want to delete this VM?</h3>\n</div>\n<div class=\"modal-body\">\n  <p>\n    The Virtual Machine &nbsp; <strong>"
    + escapeExpression(((stack1 = ((stack1 = depth0.vm),stack1 == null || stack1 === false ? stack1 : stack1.alias)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong> <small>"
    + escapeExpression(((stack1 = ((stack1 = depth0.vm),stack1 == null || stack1 === false ? stack1 : stack1.uuid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</small> &nbsp;\n    owned by <strong>"
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.cn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong> <small>"
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.uuid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</small>\n    will be deleted. All data for this Virtual \n    Machine, including any snapshots created will be deleted <em>permanently</em>.\n  </p>\n  <p>\n    <strong>This operation cannot be undone.</strong>\n  </p>\n</div>\n<div class=\"modal-footer\">\n  <a href=\"#\" class=\"btn\" data-dismiss=\"modal\">Cancel</a>\n  <a href=\"#\" class=\"btn btn-danger delete\">YES, Delete It</a>\n</div>";
  return buffer;
  });

},{"handlebars-runtime":136}],88:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n	<td class=\"key\">\n		<input name=\"name\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.tag),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n	</td>\n	<td class=\"value\">\n		<input name=\"value\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.tag),stack1 == null || stack1 === false ? stack1 : stack1.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n		<div class=\"editing-actions\">\n			<button class=\"btn btn-mini btn-info save\">Save</button>\n			<button class=\"btn btn-link cancel\">Cancel</button>\n		</div>\n	</td>\n\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n\n	<td class=\"key\">\n		<span>"
    + escapeExpression(((stack1 = ((stack1 = depth0.tag),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n	</td>\n\n	<td class=\"value\">\n		<span data-key=\"";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"editable\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.tag),stack1 == null || stack1 === false ? stack1 : stack1.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n		<div class=\"row-actions\">\n			<a class=\"edit\"><i class=\"icon-edit\"></i> Edit</a>\n			<a class=\"remove\"><i class=\"icon-trash\"></i></a>\n		</div>\n	</td>\n\n\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, depth0.editing, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

},{"handlebars-runtime":136}],89:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<table class=\"table editable\">\n  <thead>\n    <th>Name</th>\n    <th>Value</th>\n  </thead>\n	<tbody></tbody>\n\n	<tfoot>\n		<tr>\n			<td colspan=\"2\">\n				<button class=\"btn-link add-tag\">Add a tag</button>\n			</td>\n		</tr> \n	</tfoot>\n</table>";
  });

},{"handlebars-runtime":136}],97:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<h3>Network Interfaces\n</h3>\n\n<table class=\"table\">\n  <thead>\n    <tr>\n      <th style=\"width: 20px\"></th>\n      <th>Name</th>\n      <th>IP</th>\n      <th>MAC Address</th>\n      <th>Netmask</th>\n      <th>Tag</th>\n    </tr>\n  </thead>\n  \n  <tbody></tbody>\n  <tfoot>\n    <td colspan=\"6\">\n      <div class=\"btn-toolbar\">\n        <div class=\"btn-group\">\n          <button class=\"btn btn-mini btn-danger remove-nics\"><i class=\"icon-white icon-remove-sign\"></i> Delete Selected NIC</button>\n        </div>\n        <div class=\"btn-group\">\n          <button class=\"btn btn-mini add-nic\"><i class=\"icon-plus-sign\"></i> Add New NIC</button>\n        </div>\n      </div>\n    </td>\n  </tfoot>\n</table>\n";
  });

},{"handlebars-runtime":136}],100:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"modal metadata-view\">\n	<div class=\"modal-header\">\n		<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n		<h3 data-bind=\"text: key\"></h3>\n	</div>\n	<div class=\"modal-body\" data-bind=\"text: value\"></div>\n</div>\n";
  });

},{"handlebars-runtime":136}],101:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"modal metadata-edit\">\n	<div class=\"modal-header\">\n		<input data-bind=\"value: key\" placeholder=\"metadata key\" />\n	</div>\n	<div class=\"modal-body\">\n		<textarea data-bind=\"value: value\" placeholder=\"metadata value\"></textarea>\n	</div>\n	<div class=\"modal-footer\">\n		<a href=\"#\" data-dismiss=\"modal\" class=\"btn\">Close</a>\n		<button class=\"btn btn-info\" \n		data-bind=\"click: saveAction, enable: dataIsGood\">Save changes</button>\n	</div>\n</div>";
  });

},{"handlebars-runtime":136}],102:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<table class=\"table editable\">\n	<thead>\n		<th>Name</th>\n		<th>Value</th>\n	</thead>\n	<tbody data-bind=\"foreach: metadata\" class=\"unstyled\">\n		<tr>\n			<td class=\"key\">\n				<span data-bind=\"text: key\" type=\"text\"></span>\n			</td>\n			<td class=\"value\">\n				<!-- ko if: multiline -->\n				<a class=\"view\" data-bind=\"click: showAction\">View Contents</a>\n				<!-- /ko -->\n				<!-- ko ifnot: multiline -->\n				<span class=\"value\" data-bind=\"text: value\" type=\"text\"></span>\n				<!-- /ko -->\n				<div class=\"row-actions\">\n					<a class=\"edit\" data-bind=\"click: editAction\"><i class=\"icon-edit\"></i> Edit</a>\n					<a class=\"remove\"><i class=\"icon-trash\" data-bind=\"click: removeAction\"></i></a>\n				</div>\n			</td>\n		</tr>\n	</tbody>\n	<tfoot>\n		<tr>\n			<td colspan=\"2\">\n				<button class=\"btn btn-link\" data-bind=\"click: addAction\">Add Metadata</a>\n			</td>\n		</tr>\n	</tfoot>\n</table>";
  });

},{"handlebars-runtime":136}],103:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<td>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>";
  if (stack1 = helpers.created_at) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.created_at; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td><a class=\"rollback\" style=\"cursor:pointer;\">Rollback</a></td>";
  return buffer;
  });

},{"handlebars-runtime":136}],104:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\n  <thead>\n    <th>Name</th>\n    <th>Snapshot Date</th>\n    <th></th>\n  </thead>\n  ";
  }

function program3(depth0,data) {
  
  
  return "\n    <tr><td class=\"empty\">This VM does not have any snapshots.</td></tr>\n    ";
  }

  buffer += "<h3>Snapshots <button class=\"btn pull-right\"><i class=\"icon-camera\"></i> Create Snapshot</button> </h3>\n<table class=\"table\">\n  ";
  stack1 = helpers['if'].call(depth0, depth0.hasSnapshots, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <tbody>\n    ";
  stack1 = helpers.unless.call(depth0, depth0.hasSnapshots, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </tbody>\n</table>";
  return buffer;
  });

},{"handlebars-runtime":136}],105:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"modal-header\">\n  <h2>Change Owner of Virtual Machine</h2>\n</div>\n\n<div class=\"modal-body\">\n  <form class=\"form form-horizontal\" method=\"post\">\n    <p>This will transfer ownership of machine to another user.</p>\n    <div class=\"control-group\">\n    <label class=\"control-label\">New Owner</label>\n    <div class=\"controls\">\n      <input type=\"text\" name=\"owner_uuid\" class=\"input\"></input>\n    </div>\n  </div>\n  </form>\n</div>\n\n<div class=\"modal-footer\">\n  <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n  <button class=\"btn btn-primary\">Change Owner</button>\n</div>";
  });

},{"handlebars-runtime":136}],106:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"author\"></div>\n<div class=\"date\"></div>\n<div class=\"note\"></div>";
  });

},{"handlebars-runtime":136}],107:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<h3>Operator Notes</h3>\n<ul class=\"unstyled\"></ul>\n\n<textarea placeholder=\"Write something...\"></textarea>\n<button class=\"add-note btn btn-info btn-block\">Add Note</button>";
  });

},{"handlebars-runtime":136}],116:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"modal-header\">\n  <h2>Change VM Package</h2>\n</div>\n<div class=\"modal-body\">\n  <p>Resize this Virtual Machines to package: </p>\n  <select name=\"package\"></select>\n  <div class=\"package-preview-container\"></div>\n</div>\n<div class=\"modal-footer\">\n  <button class=\"btn btn-primary\">Resize to selected package</button>\n</div>";
  });

},{"handlebars-runtime":136}],90:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"title\">\n  Details for <span name=\"name\"></span> <span name=\"version\"></span>\n</div>\n<strong>Memory</strong> <span name=\"max_physical_memory\"></span> MB<br>\n<strong>Swap</strong> <span name=\"max_swap\"></span> MB<br>\n<strong>V-CPUs</strong> <span name=\"vcpus\"></span><br>\n<strong>Disk Quota</strong> <span name=\"quota\"></span><br>\n<strong>Disk IO Priority</strong> <span name=\"zfs_io_priority\"></span>";
  });

},{"handlebars-runtime":136}],91:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"modal-header\">\n  <h2>Traits</h2>\n</div>\n<div class=\"modal-body\">\n  <p>Traits are properties utilized by the provisioning algoirthms to determine placement of provisions.</p>\n  <textarea></textarea>\n</div>\n<div class=\"modal-footer\">\n  <div class=\"error\"></div>\n  <button class=\"btn\" data-dismiss=\"modal\">Close</button>\n  <button class=\"btn btn-primary\">Save &amp; Close</button>\n</div>";
  });

},{"handlebars-runtime":136}],92:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<table class=\"table\">\n  <thead>\n    <th>MAC Address</th>\n    <th>IP Address</th>\n    <th>Netmask</th>\n    <th>VLAN ID</th>\n    <th>DNS Resolvers</th>\n    <th>Nic Tag</th>\n    <th>Nic Tags Provided</th>\n  </thead>\n  <tbody></tbody>\n</table>";
  });

},{"handlebars-runtime":136}],93:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<td class=\"mac\"></td>\n<td class=\"ip\"></td>\n<td class=\"netmask\"></td>\n<td class=\"vlan_id\"></td>\n<td class=\"resolvers\"></td>\n<td class=\"nic_tag\"></td>\n<td class=\"nic_tags_provided\"></td>\n";
  });

},{"handlebars-runtime":136}],118:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"modal-header\"><h2>Server Setup</h2></div>\n<div class=\"modal-body\">\n  <p>Server setup installs the required software agents to enable provisioning on this server.</p>\n  <form class=\"form form-horizontal\">\n    <div class=\"control-group\">\n      <div class=\"controls\">\n        <label class=\"checkbox\">\n          <input class=\"custom-hostname\" type=\"checkbox\" /> Specify a custom hostname:\n        </label>\n        <div class=\"custom-hostname-container\">\n          <input type=\"text\"/>\n          <p class=\"help-block\"><span class=\"label label-warning\">Hostname cannot be changed after setup</span></p>\n        </div>\n      </div>\n    </div>\n  </form>\n</div>\n<div class=\"modal-footer\">\n  <button class=\"btn\" data-dismiss=\"modal\">Close</button>\n  <button class=\"btn btn-primary setup\">Setup Server</button>\n</div>";
  });

},{"handlebars-runtime":136}],123:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<form>\n  <div class=\"modal-header\">\n    <a class=\"close\" data-dismiss=\"modal\">×</a>\n    <h3><span class=\"action\"></span> User</h3>\n  </div>\n\n  <div class=\"modal-body\">\n    <div class=\"alert alert-block alert-error hide\"></div>\n    <div class=\"form-horizontal\">\n      <fieldset>\n\n        <div class=\"control-group\">\n          <label class=\"control-label\">Login</label>\n          <div class=\"controls\">\n            <input type=\"text\" name=\"login\" class=\"span3\">\n          </div>\n        </div>\n\n        <div class=\"control-group\">\n          <label class=\"control-label\">Password</label>\n          <div class=\"controls\">\n            <input type=\"password\" name=\"password\" class=\"span3\">\n          </div>\n        </div>\n\n        <div class=\"control-group\">\n          <label class=\"control-label\">Email Address</label>\n          <div class=\"controls\">\n            <input type=\"text\" name=\"email\" placeholder=\"user@example.com\">\n          </div>\n        </div>\n\n        <div class=\"control-group\">\n          <label class=\"control-label\">Name</label>\n          <div class=\"controls\">\n            <input type=\"text\" name=\"first_name\" placeholder=\"first or given name\" class=\"span2\">\n            <input type=\"text\" name=\"last_name\" placeholder=\"last name\" class=\"span2 add-on\">\n          </div>\n        </div>\n\n        <div class=\"control-group\">\n          <label class=\"control-label\">Company</label>\n          <div class=\"controls\">\n            <input type=\"text\" name=\"company\" placeholder=\"Joyent\">\n          </div>\n        </div>\n\n        <div class=\"control-group\">\n          <label class=\"control-label\">Phone Number</label>\n          <div class=\"controls\">\n            <input type=\"text\" name=\"phone\" placeholder=\"510-123-4567\">\n          </div>\n        </div>\n        <input type=\"hidden\" name=\"cn\">\n      </fieldset>\n    </div>\n  </div> <!-- .modal-body -->\n  <div class=\"modal-footer\">\n    <button type='submit' class=\"save btn btn-primary\">Save User</button>\n    <button data-dismiss=\"modal\" class=\"btn\">Close</button>\n  </div>\n</form>\n";
  });

},{"handlebars-runtime":136}],125:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\n  <h2>Edit Package</h2>\n  ";
  }

function program3(depth0,data) {
  
  
  return "\n  <h2>Create a new Package</h2>\n  ";
  }

function program5(depth0,data) {
  
  
  return "readonly";
  }

function program7(depth0,data) {
  
  
  return "\n          Save Package\n          ";
  }

function program9(depth0,data) {
  
  
  return "\n          Create Package\n          ";
  }

  buffer += "<div class=\"page-header\">\n  ";
  stack1 = helpers['if'].call(depth0, depth0.uuid, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n\n<div class=\"row-fluid\">\n  <div class=\"span12\">\n    <form class=\"form-horizontal\">\n      <div class=\"control-group\">\n        <span class=\"help-block\" style=\"margin-bottom: 2em;\">\n          Name and version of the package is used to uniquely identify a package. Once a package with a specific version has been created, the properties making up the package cannot be modified. A new version must be created with the new properties.\n        </span>\n\n        <label class=\"control-label\" for=\"package-name\">Name</label>\n        <div class=\"controls\">\n          <input type=\"text\" id=\"package-name\" ";
  stack1 = helpers['if'].call(depth0, depth0.uuid, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"name\" placeholder=\"Name of the package\">\n        </div>\n      </div>\n\n      <div class=\"control-group\">\n        <label class=\"control-label\" for=\"package-version\">Version</label>\n\n        <div class=\"controls\">\n          <input type=\"text\" id=\"package-version\" ";
  stack1 = helpers['if'].call(depth0, depth0.uuid, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"version\" placeholder=\"Version\">\n        </div>\n      </div>\n\n      <legend>CPU &amp; Memory</legend>\n      <div class=\"control-group\">\n        <label class=\"control-label\" for=\"package-memory\">Memory</label>\n        <div class=\"controls\">\n          <div class=\"input-append\">\n            <input type=\"number\" class=\"input-small\" id=\"package-memory\"  ";
  stack1 = helpers['if'].call(depth0, depth0.uuid, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"max_physical_memory\"\n            min=\"64\" \n            step=\"64\" \n            placeholder=\"memory\">\n            <span class=\"add-on\">MB</span>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"control-group\">\n        <label class=\"control-label\" for=\"package-memory\">Swap</label>\n        <div class=\"controls\">\n          <div class=\"input-append\">\n            <input type=\"number\" class=\"input-small\" id=\"package-swap\"  ";
  stack1 = helpers['if'].call(depth0, depth0.uuid, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"max_swap\" min=\"64\" step=\"64\" placeholder=\"swap\">\n            <span class=\"add-on\">MB</span>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"control-group\">\n        <label class=\"control-label\" for=\"package-vcpus\">Number of CPUs</label>\n        <div class=\"controls\">\n          <div class=\"input-append\">\n            <input type=\"number\" class=\"input-small\" id=\"package-vcpus\"\n             ";
  stack1 = helpers['if'].call(depth0, depth0.uuid, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \n              name=\"vcpus\" min=\"1\" max=\"16\" placeholder=\"cores\">\n            <span class=\"add-on\">cores</span>\n          </div>\n          <p class=\"help-inline\">maximum number of VCPUs is 16</p>\n        </div>\n      </div>\n\n\n      <div class=\"control-group\">\n        <label class=\"control-label\" for=\"package-cap-cpu\">CPU Cap</label>\n        <div class=\"controls\">\n          <input type=\"number\" class=\"input-small\" id=\"package-cpu-cap\"\n           ";
  stack1 = helpers['if'].call(depth0, depth0.uuid, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \n          name=\"cpu_cap\" min=\"1\" max=\"10000\" placeholder=\"cpu cap\">\n        </div>\n      </div>\n\n      <div class=\"control-group\">\n        <label class=\"control-label\" for=\"package-vcpus\">Max Lightweight Processes</label>\n        <div class=\"controls\">\n          <input type=\"number\" class=\"input-small\" id=\"package-max-processes\"\n           ";
  stack1 = helpers['if'].call(depth0, depth0.uuid, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \n          name=\"max_lwps\" min=\"250\" placeholder=\"processes\">\n        </div>\n      </div>\n\n      <legend>Disk</legend>\n\n      <div class=\"control-group\">\n        <label class=\"control-label\" for=\"package-quota\">Disk Quota</label>\n        <div class=\"controls\">\n          <div class=\"input-append\">\n            <input type=\"number\"\n             ";
  stack1 = helpers['if'].call(depth0, depth0.uuid, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \n             class=\"input-medium\" name=\"quota\" id=\"package-quota\" min=\"1\" placeholder=\"disk quota\">\n            <span class=\"add-on\">MB</span>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"control-group\">\n        <label class=\"control-label\" for=\"package-io-prioirty\">IO Priority</label>\n        <div class=\"controls\">\n          <input type=\"number\" \n           ";
  stack1 = helpers['if'].call(depth0, depth0.uuid, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \n          class=\"span3\" name=\"zfs_io_priority\" id=\"package-io-priority\" min=\"1\" placeholder=\"Disk IO Priority\">\n\n          <p class=\"help-inline\">1 for minimun, 10000 for maximum</p>\n        </div>\n      </div>\n\n      <div class=\"control-group\">\n        <div class=\"controls\">\n          <label class=\"checkbox\">\n            <input type=\"checkbox\" name=\"active\"> Activate Package\n          </label>\n          \n          <label class=\"checkbox\">\n            <input type=\"checkbox\" name=\"default\"> Make this the Default Package\n          </label>\n        </div>\n      </div>\n\n      <div class=\"control-group\">\n        <div class=\"controls\">\n        </div>\n      </div>\n\n      <div class=\"form-actions\">\n        <button type=\"submit\" class=\"btn btn-primary\">\n          ";
  stack1 = helpers['if'].call(depth0, depth0.uuid, {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </button>\n        <button type=\"cancel\" class=\"btn\">Cancel</button>\n      </div>\n    </form>\n  </div>\n</div>";
  return buffer;
  });

},{"handlebars-runtime":136}],127:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"modal-body\">\n  <form class=\"form\">\n    <div class=\"alert alert-error\"></div>\n    <div class=\"control-group\">\n      <textarea name=\"key\" style=\"width: 98%; height: 100px;\" placeholder=\"SSH Public Key\"></textarea>\n    </div>\n  </form>\n</div>\n\n<div class=\"modal-footer\">\n  <button class=\"btn btn-cancel\" data-dismiss=\"modal\">Cancel</button>\n  <button class=\"btn btn-primary save\">Save</button>\n</div>";
  });

},{"handlebars-runtime":136}],128:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <option>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  if (stack1 = helpers.uuid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.uuid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>\n        ";
  return buffer;
  }

  buffer += "<div class=\"page-header\"><h2>Create Network</h2></div>\n\n<form class=\"form-horizontal\">\n  <div class=\"alert alert-error\">\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\">×</button>\n    <strong>Error!</strong> <span class=\"error\"></span>\n  </div>\n\n  <div class=\"control-group\">\n    <label class=\"control-label\" for=\"network-name\">Name</label>\n    <div class=\"controls\">\n      <input type=\"text\" id=\"network-name\" name=\"name\" placeholder=\"Name of the network\">\n    </div>\n  </div>\n\n  <div class=\"control-group\">\n    <label class=\"control-label\" for=\"network-gateway\">Subnet</label>\n\n    <div class=\"controls\">\n      <input type=\"text\" id=\"netework-gateway\" name=\"subnet\" placeholder=\"Subnet\">\n    </div>\n  </div>\n\n\n  <div class=\"control-group\">\n    <label class=\"control-label\" for=\"network-gateway\">Gateway</label>\n\n    <div class=\"controls\">\n      <input type=\"text\" id=\"netework-gateway\" name=\"gateway\" placeholder=\"Gateway Address\">\n    </div>\n  </div>\n\n  <div class=\"control-group\">\n    <label class=\"control-label\" for=\"network-provision-start-ip\">Start IP</label>\n\n    <div class=\"controls\">\n      <input type=\"text\" id=\"netework-start-ip\" name=\"provision_start_ip\" placeholder=\"Start IP\">\n    </div>\n  </div>\n\n  <div class=\"control-group\">\n    <label class=\"control-label\" for=\"network-provision-end-ip\">End IP</label>\n\n    <div class=\"controls\">\n      <input type=\"text\" id=\"netework-start-ip\" name=\"provision_end_ip\" placeholder=\"End IP\">\n    </div>\n  </div>\n\n\n\n  <div class=\"control-group\">\n    <label class=\"control-label\" for=\"network-nic-tag\">NIC Tag</label>\n\n    <div class=\"controls\">\n      <select name=\"nic_tag\">\n        <option>Select a nic tag</option>\n        ";
  stack1 = helpers.each.call(depth0, depth0.nic_tags, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </select>\n      <input type=\"text\" class=\"input\" name=\"nic_tag\">\n      <a class=\"btn create-new-nic-tag\">Create a New NIC Tag</a>\n      <p class=\"help-block\">\n        Nics tagged with the same nic tag are reachable on the same Layer 2 network segment.\n      </p>\n    </div>\n  </div>\n\n  <div class=\"control-group\">\n    <label class=\"control-label\" for=\"network-resolvers\">DNS Resolvers</label>\n\n    <div class=\"controls\">\n      <input type=\"text\" id=\"netework-resolvers\" name=\"resolvers\" placeholder=\"DNS Resolvers\">\n    </div>\n  </div>\n\n\n  <div class=\"control-group\">\n    <label class=\"control-label\" for=\"network-vlan-id\">VLAN ID</label>\n\n    <div class=\"controls\">\n      <input type=\"text\" id=\"netework-vlan-id\" name=\"vlan_id\" placeholder=\"VLAN ID\">\n    </div>\n  </div>\n\n  <div class=\"form-actions\">\n    <button class=\"btn btn-primary\" type=\"submit\">Save</button>\n  </div>\n\n</div>";
  return buffer;
  });

},{"handlebars-runtime":136}],130:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"page-header\">\n  <h1><span name=\"name\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> / <span name=\"subnet\">";
  if (stack1 = helpers.subnet) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.subnet; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></h1>\n</div>\n\n<div class=\"row-fluid\">\n  <div class=\"span12\">\n    <h3>Network Details</h3>\n    <ul class=\"unstyled attributes\">\n      <li>\n        <strong>UUID</strong>\n        <div class=\"value\" name=\"uuid\">";
  if (stack1 = helpers.uuid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.uuid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n      </li>\n\n      <li>\n        <strong>VLAN ID</strong>\n        <div class=\"value\" name=\"vlan_id\">";
  if (stack1 = helpers.vlan_id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.vlan_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n      </li>\n\n      <li>\n        <strong>Network</strong>\n        <div class=\"value\" name=\"subnet\">";
  if (stack1 = helpers.subnet) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.subnet; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n      </li>\n      <li>\n\n        <strong>Gateway</strong>\n        <div class=\"value\" name=\"gateway\">";
  if (stack1 = helpers.gateway) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.gateway; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n      </li>\n\n      <li>\n        <strong>Netmask</strong>\n        <div class=\"value\" name=\"netmask\">";
  if (stack1 = helpers.netmask) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.netmask; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n      </li>\n\n      <li>\n        <strong>IP Range</strong>\n        <div class=\"value\">\n          <span name=\"provision_start_ip\">";
  if (stack1 = helpers.provision_start_ip) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.provision_start_ip; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n          -\n          <span name=\"provision_end_ip\">";
  if (stack1 = helpers.provision_end_ip) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.provision_end_ip; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n        </div>\n      </li>\n\n      <li>\n        <strong>NIC Tag</strong>\n        <div class=\"value\" name=\"nic_tag\">";
  if (stack1 = helpers.nic_tag) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.nic_tag; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n      </li>\n\n      <li>\n        <strong>Resolvers</strong>\n        <div class=\"value\" name=\"resolvers\">";
  if (stack1 = helpers.resolvers) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.resolvers; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n      </li>\n    </ul>\n  </div>\n</div>\n\n<div class=\"row-fluid\">\n  <div class=\"span12\">\n    <h3>IP Address Allocations</h3>\n    <table class=\"table addresses\">\n      <tbody></tbody>\n    </table>\n  </div>\n</div>\n\n<div class=\"notes\"></div>";
  return buffer;
  });

},{"handlebars-runtime":136}],131:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <a href=\"";
  if (stack1 = helpers.belongs_to_url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.belongs_to_url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><small>";
  if (stack1 = helpers.belongs_to_uuid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.belongs_to_uuid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</small></a>\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <small>";
  if (stack1 = helpers.belongs_to_uuid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.belongs_to_uuid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</small>\n  ";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "\n  <span class=\"label label-info\">Reserved</span>\n  ";
  }

function program7(depth0,data) {
  
  
  return "\n  <span class=\"label label-info\">Free</span>\n  ";
  }

  buffer += "<td>";
  if (stack1 = helpers.ip) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ip; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td class=\"belongs-to\">\n  <strong>";
  if (stack1 = helpers.belongs_to_type) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.belongs_to_type; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong>\n  ";
  stack1 = helpers['if'].call(depth0, depth0.belongs_to_url, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</td>\n<td>\n  ";
  stack1 = helpers['if'].call(depth0, depth0.reserved, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</td>\n<td>\n  ";
  stack1 = helpers['if'].call(depth0, depth0.free, {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</td>";
  return buffer;
  });

},{"handlebars-runtime":136}],137:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<td><input type=\"checkbox\"></td>\n<td>";
  if (stack1 = helpers['interface']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['interface']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>";
  if (stack1 = helpers.ip) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ip; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>";
  if (stack1 = helpers.mac) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.mac; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>";
  if (stack1 = helpers.netmask) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.netmask; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>";
  if (stack1 = helpers.nic_tag) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.nic_tag; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n";
  return buffer;
  });

},{"handlebars-runtime":136}],138:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"modal-header\">\n  <h3>Select Networks to attach new NIC to</h3>\n</div>\n\n<div class=\"modal-body\">\n  <div class=\"form-horizontal\">\n    <p>Please Note that any changes to networks requires a reboot for changes to take effect</p>\n    <div class=\"control-group\">\n      <label class=\"control-label\">Network</label> \n      <div class=\"controls\">\n        <select name=\"network\"></select>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-footer\">\n  <button class=\"btn\" data-dismiss=\"modal\">Cancel</button>\n  <button class=\"btn btn-primary\" type=\"submit\">Attach Network Interface</button>\n</div>";
  });

},{"handlebars-runtime":136}],139:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"probe-type-select\">\n	<div class=\"modal-header\">\n		<h2>Select Probe Type</h2>\n	</div>\n\n	<div class=\"modal-body\">\n		<a class=\"box\" data-probe-type=\"log-scan\">\n			<div class=\"name\">Log Scan</div>\n			<div class=\"desc\">Watches a specific file, line by line, for a\n				particular pattern</div>\n		</a>\n		<a class=\"box\" data-probe-type='machine-up'>\n			<div class=\"name\">Machine up</div>\n			<div class=\"desc\">Watches for a VM going up or down. This probe does\n				not require an amon service to be running inside the VM being monitored.</div>\n		</a>\n		<a class=\"box\" data-probe-type='http'>\n			<div class=\"name\">HTTP</div>\n			<div class=\"desc\">Watches for response (body text and status code) from specific HTTP(S) URL.</div>\n		</a>\n		<a class=\"box\" data-probe-type='icmp'>\n			<div class=\"name\">ICMP Ping</div>\n			<div class=\"desc\">Sends ICMP packets to a machine and alarms based on latency and reachability.</div>\n		</a>\n	</div>\n</div>";
  });

},{"handlebars-runtime":136}],144:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"probe-log-scan-config\">\n	<div class=\"modal-header\"><h2>Create Logscan Probe</h2></div>\n	<div class=\"modal-body\">\n		<form class=\"form-horizontal\">\n\n			<div class=\"control-group control-group-name\">\n				<label class=\"control-label\">Name of Probe</label>\n				<div class=\"controls\">\n					<input type=\"text\" name=\"name\" class=\"input-xlarge\">\n				</div>\n			</div>\n\n			<fieldset>\n				<legend>Probe Configuration</legend>\n				<div class=\"control-group control-group-path\">\n					<label class=\"control-label\">Log File Path</label>\n					<div class=\"controls\">\n						<input type=\"text\" name=\"path\" class=\"input-xlarge\">\n						<p class=\"help-block\">Path to file on the VM to perform log scan on</p>\n					</div>\n				</div>\n\n				<div class=\"control-group control-group-pattern\">\n					<label class=\"control-label\">Pattern</label>\n					<div class=\"controls\">\n						<input type=\"text\" name=\"pattern\" class=\"input-xlarge\">\n						<p class=\"help-block\">\n							<label class=\"checkbox\"><input type=\"checkbox\" name=\"is-regex\">\n								Pattern is a regular expression\n							</label>\n						</p>\n					</div>\n				</div>\n\n				<div class=\"control-group control-group-period\">\n					<label class=\"control-label\">Period</label>\n					<div class=\"controls\">\n						<div class=\"input-append\">\n							<input type=\"text\" name=\"period\" placeholder=\"60\"\n							class=\"span1\" value=\"\" size=\"4\">\n							<span class=\"add-on\">seconds</span>\n						</div>\n\n						<p class=\"help-block\">Time window in which threshold number of matches must be found to alarm.  </p>\n					</div>\n				</div>\n\n				<div class=\"control-group control-group-threshold\">\n					<label class=\"control-label\">Threshold</label>\n					<div class=\"controls\">\n						<div class=\"input-append threshold-control\">\n							<input type=\"text\" name=\"threshold\" class=\"span1\" value=\"\" placeholder=\"1\" size=\"4\">\n							<span class=\"add-on\">times</span>\n						</div>\n						<p class=\"help-block\">Number of times a match must be found within period to alarm.</p>\n					</div>\n				</div>\n			</fieldset>\n		</form>\n	</div>\n\n	<div class=\"modal-footer\">\n		<div class=\"buttons\">\n			<a href=\"#\" class=\"btn\" data-dismiss=\"modal\">Cancel</a>\n			<button class=\"btn btn-primary\">Continue</button>\n		</div>\n	</div>\n\n</div>";
  });

},{"handlebars-runtime":136}],140:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"probe-machine-up-config\">\n  <div class=\"modal-header\">\n    <h2>Create machine-up Probe</h2>\n  </div>\n  <div class=\"modal-body\">\n    <p>\n      Watch for a VM (i.e. a virtual machine or zone) going up or down.\n      Alarms for this probe will \"clear\", i.e. an alarm created for a\n      machine going down will be automatically closed by the event sent when\n      the machine comes back up.\n    </p>\n  </div>\n  <div class=\"modal-footer\">\n    <div class=\"buttons\">\n      <a class=\"btn\" data-dismiss=\"modal\">Cancel</a>\n      <button class=\"btn btn-primary\">Create Probe</button>\n    </div>\n  </div>\n</div>";
  });

},{"handlebars-runtime":136}],141:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"probe-http-config\">\n  <form class=\"form-horizontal\">\n    <div class=\"modal-header\"><h2>Create HTTP Probe</h2></div>\n    <div class=\"modal-body\">\n\n      <fieldset>\n        <div class=\"control-group name\">\n          <label class=\"control-label\">Probe Name</label>\n          <div class=\"controls\">\n            <input type=\"text\" name=\"name\">\n          </div>\n        </div>\n\n        <div class=\"control-group url\">\n          <label class=\"control-label\">URL</label>\n          <div class=\"controls\">\n            <div class=\"input-append\">\n              <select class=\"protocol\" name=\"protocol\">\n                <option value=\"http\">http://</option>\n                <option value=\"https\">https://</option>\n              </select>\n              <input type=\"text\" name=\"url\" class=\"input-xlarge\">\n            </div>\n          </div>\n        </div>\n\n      </fieldset>\n\n      <hr>\n\n      <fieldset>\n        <div class=\"control-group\">\n          <label class=\"control-label\"></label>\n          <a data-toggle=\"collapse\" data-target=\".advanced-options\">Advanced Options</a>\n        </div>\n\n        <div class=\"collapse advanced-options\">\n          <div class=\"control-group username\">\n            <label class=\"control-label\">Username</label>\n            <div class=\"controls\">\n              <input name=\"username\" type=\"text\" class=\"input large\">\n            </div>\n          </div>\n\n          <div class=\"control-group password\">\n            <label class=\"control-label\">Password</label>\n            <div class=\"controls\">\n              <input name=\"password\" type=\"text\" class=\"input large\">\n            </div>\n          </div>\n\n          <div class=\"control-group interval\">\n            <label class=\"control-label\">Check Interval</label>\n            <div class=\"controls\">\n              <div class=\"input-append\">\n                <input name=\"interval\" type=\"text\" class=\"input span1\" placeholder=\"90\">\n                <span class=\"add-on\">seconds</span>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"control-group max-response-time\">\n            <label class=\"control-label\">Maximum Response Time</label>\n            <div class=\"controls\">\n              <div class=\"input-append\">\n                <input name=\"max-response-time\" type=\"text\" class=\"input span1\">\n                <span class=\"add-on\">ms</span>\n              </div>\n            </div>\n          </div>\n\n        </div>\n\n      </fieldset>\n    </div> <!-- modal-body -->\n    <div class=\"modal-footer\">\n      <div class=\"actions\">\n        <a class=\"btn\" data-dismiss=\"modal\">Cancel</a>\n        <button class=\"btn btn-primary\">Create Probe</button>\n      </div>\n    </div>\n  </form>\n</div>";
  });

},{"handlebars-runtime":136}],142:[function(require,module,exports){
var Handlebars = require('handlebars-runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"probe-icmp-config\">\n<form>\n  <div class=\"modal-header\"><h2>Create ICMP Probe</h2></div>\n  <div class=\"modal-body\">\n      <div class=\"control-group host\">\n        <div class=\"control-label\">Host</div>\n        <div class=\"controls\">\n          <div class=\"input-append\"> \n            <input type=\"text\" name=\"host\" class=\"input input-large\">\n            <p class=\"help-inline\">Required</p>\n            <p class=\"help-block\">Hostname or IP address to probe.</p>\n          </div>\n        </div>\n      </div>\n\n      <hr>\n\n      <div class=\"control-group name\">\n        <div class=\"control-label\">Name</div>\n        <div class=\"controls\">\n          <div class=\"input-append\"> \n            <input type=\"text\" name=\"name\" class=\"input input-large\">\n            <p class=\"help-inline\">Required</p>\n            <p class=\"help-block\">Name of probe</p>\n          </div>\n        </div>\n      </div>\n  </div>\n  <div class=\"modal-footer\">\n    <a class=\"btn\" data-dismiss=\"modal\">Cancel</a>\n    <button class=\"btn btn-primary\" type=\"submit\">Create Probe</button>\n  </div>\n  </form>\n</div>";
  });

},{"handlebars-runtime":136}]},{},[1])
;