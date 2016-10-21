/**
 * Created by Davis on 8/4/14.
 */
$(document).ready(function () {
    window.globals = window.globals || {};

    communityJS();
    componentJS();
    profileJS();
    collectionJS();
    handleSearchV1();
    resourceJS();
    tagAutocomplete();

    globals.showLogin = function(){
        $('.login-backing').show();
        $('.login-backing input[name="email"]').focus();
    };

    $('.back-hide').on('click', '.close', function () {
        $('.background').hide();
        $('.back-hide').hide();
    })
    $('.background').click(function () {
        $('.background').hide();
        $('.back-hide').hide();
    });
    $('.close-btn').click(function () {
        $('.background').hide();
        $('.back-hide').hide();
    });
    $('.clickable').click(function () {
        var _this = $(this);
        $(_this).parent().parent().find('.panel-body:first').toggle();
        $(_this).find('.clickable-icon').toggleClass('fa-plus fa-minus');
    });
    $('.non-click').click(function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
    });
    $('.btn-login').click(globals.showLogin);
    $('.icon-dropdown li').click(function () {
        var icon = $(this).attr('icon');
        var name = $(this).parent().attr('name');
        $('.' + name + '-btn').html('<i class="' + icon + '"></i> ' + icon);
        $('.' + name).val(icon);
    });
    $('.invis-hide').click(function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
    });
    $('body').click(function () {
        $('.invis-hide').hide();
        $('.body-hide').removeClass('active');
    });
    $('.login-backing').click(function () {
        $('.login-backing').hide();
    });
    $('.login-box button').click(function (e) {

        e.stopPropagation();
        e.stopImmediatePropagation();
    });
    $('.login-box').click(function (e) {

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    });
    $('.form-submit-button').click(function () {
        $('.submit-class').submit();
    });
    $('.form-submit-button1').click(function () {
        $('.submit-class1').submit();
    });
    $('.collapse').click(function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
    });
    $(document).on('submit', '.forgot-pw-form', function () {
        var email = $('.forgot-email').val();
        $.post("/forms/forgotPassword.php", {
            email: email
        }).done(function (data) {
            var obj = JSON.parse(data);
            var html;
            if (obj.status == 1) {
                html = '<div class="alert alert-success">';
                html += '<p>' + obj.message + '</p><br/>';
                html += '<form method="post" action="/forms/login.php">';
                html += '<input type="hidden" name="email" value="' + email + '"/>';
                html += '<div class="input-group">';
                html += '<input type="password" class="form-control" name="password" placeholder="Password from Email"/>';
                html += '<span class="input-group-btn">';
                html += '<button class="btn-u" type="submit">Login</button>';
                html += '</span>';
                html += '</div>';
                html += '</form>';
                html += '</div>';
            } else {
                html = '<div class="alert alert-danger">';
                html += '<p>' + obj.message + '</p><br/>';
                html += '<form class="forgot-pw-form">';
                html += '<div class="input-group">';
                html += '<input type="text" class="form-control forgot-email" name="query" placeholder="Account Email"/>';
                html += '<span class="input-group-btn">';
                html += '<button class="btn-u" type="submit">Reset</button>';
                html += '</span>';
                html += '</div>';
                html += '</form>';
                html += '</div>';
            }
            $('.forgot-pw-container').html(html);
        }, "json");
        return false;
    });

    $(".dropdown-toggle").dropdown();

    $(".resource-image-submit").click(function(){
        angular.element("#fields-panel").scope().save();
        $("#resource-image").submit();
    });

    $(".Resource_URL").blur(function(){
        var val = $(this).val();
        if(val.length > 0 && val.substr(0,4) != "http"){
            val = "http://" + val;
        }
        $(this).val(val);
        $(this).valid();
    });

    $(".nav-tabs-js li a").click(function(e){
        e.preventDefault();
        $(this).tab("show");
    });
});

function resourceJS() {
    $('.resource-find-form').submit(function (e) {
        e.preventDefault();
        $('.resource-load').html('<i class="fa fa-spin fa-spinner" style="font-size:26px;margin:0 auto"></i>');
        $('.resource-load').load('/php/resource-checker.php?name=' + $('.type-find').val());
    })
    $('.captcha-form').submit(function (e) {
        //console.log($('#recaptcha-accessible-status').text());
        var text = $('#g-recaptcha-response').val();
        if (text != '')
            return true;
        else
            return false;
    });
}

function profileJS() {
    $('.file-form').change(function () {
        var value = $(this).val();
        var splits = value.split('\\');
        var splits2 = splits[splits.length - 1].split('/');

        $(this).parent().parent().find('.file-placeholder').val(splits2[splits2.length - 1]);
    });
    $('body').on('blur', '.color-input', function () {
        $(this).parent().children('.fa-circle').css('color', '#' + $(this).val());
    });
    $('.edit-popup').click(function () {
        var id = $(this).attr('field');
        $('.field-edit').empty();
        $('.field-edit').load('/php/field-edit.php?id=' + id, function () {
            $('.background').show();
            $('.field-edit').show();
        });
    });
    $('.field-add-btn').click(function () {
        $('.background').show();
        $('.field-add').show();
    });
    $('.category-load-btn').click(function () {
        var cid = $(this).attr('cid');
        var type = $(this).attr('control');
        var category = $(this).attr('category');
        var subcategory = $(this).attr('subcategory');
        var x = $(this).attr('x');
        var y = $(this).attr('y');
        var id = $(this).attr('source');
        $('.category-form-load').empty();
        $('.category-form-load').load('/php/category-form.php?category=' + encodeURIComponent(category) + '&type=' + type + '&subcategory=' + encodeURIComponent(subcategory) + '&id=' + id + '&cid=' + cid + '&x=' + x + '&y=' + y, function () {
            $('.background').show();
            $('.category-form-load').show();
        });
    });
    $('.category-edit-btn').click(function () {
        var id = $(this).attr('data');
        $('.category-form-load').empty();
        $('.category-form-load').load('/php/category-form.php?type=edit&id=' + id, function () {
            $('.background').show();
            $('.category-form-load').show();
        });
    });
    $('.category-name-btn').click(function () {

        var type = $(this).attr('control');
        var category = encodeURIComponent($(this).attr('category'));
        var subcategory = encodeURIComponent($(this).attr('subcategory'));
        var cid = $(this).attr('cid');
        $('.category-form-load').empty();
        $('.category-form-load').load('/php/category-name.php?type=' + type + '&cid=' + cid + '&category=' + category + '&subcategory=' + subcategory, function () {
            $('.background').show();
            $('.category-form-load').show();
        });
    });
    $('.data-add').click(function () {
        var comp = $(this).attr('component');
        var cid = $(this).attr('community');
        $('.data-add-load').empty();
        $('.data-add-load').load('/php/data-load.php?comp=' + comp + '&cid=' + cid, function () {
            $('.background').show();
            $('.data-add-load').show();
        });
    });
    $('.data-edit').click(function () {
        var id = $(this).attr('data');
        $('.data-add-load').empty();
        $('.data-add-load').load('/php/data-edit-load.php?id=' + id, function () {
            $('.background').show();
            $('.data-add-load').show();
        });
    });
    $('.component-select-image').click(function () {
        var comp = $(this).attr('component');
        var cid = $(this).attr('community');
        $('.component-add-load').empty();
        $('.component-add-load').load('/php/component-load.php?comp=' + comp + '&cid=' + cid, function () {
            $('.component-select-container').hide();
            $('.component-add-load').show();
        });
    });
    $('.container-select-image').click(function () {
        var type = $(this).attr('type');
        var cid = $(this).attr('community');
        $('.container-add-load').empty();
        $('.container-add-load').load('/php/component-load-type.php?type=' + type + '&cid=' + cid, function () {
            $('.cont-select-container').hide();
            $('.container-add-load').show();
        });
    });
    $('.edit-container').click(function () {
        var id = $(this).attr('container');
        var cid = $(this).attr('community');
        $('.container-add-load').empty();
        $('.container-add-load').load('/php/component-load-type.php?id=' + id + '&cid=' + cid, function () {
            $('.background').show();
            $('.container-add-load').show();
        });
    });
    $('.data-add-load').on('click', '.icon-dropdown li', function () {
        var icon = $(this).attr('icon');
        var name = $(this).parent().attr('name');
        $('.' + name + '-btn').html('<i class="' + icon + '"></i> ' + icon);
        $('.' + name).val(icon);
    });
    $('.component-add-load').on('click', '.icon-dropdown li', function () {
        var icon = $(this).attr('icon');
        var name = $(this).parent().attr('name');
        $('.' + name + '-btn').html('<i class="' + icon + '"></i> ' + icon);
        $('.' + name).val(icon);
    });
    $('.component-add').click(function () {
        $('.background').show();
        $('.component-select-container').show();
    });
    $('.container-add').click(function () {
        $('.background').show();
        $('.cont-select-container').show();
    });
}

function componentJS() {
    var works_max = 200;
    //$('.works-img').each(function(){
    //    if($(this).height() > works_max)
    //        $(this).height(works_max);
    //    if($(this).width() > works_max)
    //        $(this).width(works_max);
    //});

    var maxHeight = 0;
    $('.easy-block-v3').each(function () {
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }
    });
    if (maxHeight < 30)
        maxHeight = 90;
    $('.easy-block-v3').height(maxHeight);
    //maxHeight = 0;
    //$('.works-img').each(function () {
    //    if ($(this).height() > maxHeight) {
    //        maxHeight = $(this).height();
    //    }
    //});
    //if (maxHeight < 100)
    //    maxHeight = 190;
    //$('.works-img').height(maxHeight);
    maxHeight = 0;
    $('.news-img').each(function () {
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }
    });
    if (maxHeight < 100)
        maxHeight = 190;
    $('.news-img').height(maxHeight);
    $('.data-link').click(function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var id = $(this).attr('data');
        $.get("/php/track-click.php", { id: id});
        window.location = href;
        return false;
    });
}

jQuery.fn.sortElements = (function () {

    var sort = [].sort;

    return function (comparator, getSortable) {

        getSortable = getSortable || function () {
            return this;
        };

        var placements = this.map(function () {

            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,

            // Since the element itself will change position, we have
            // to have some way of storing its original position in
            // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );

            return function () {

                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }

                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);

            };

        });

        return sort.call(this, comparator).each(function (i) {
            placements[i].call(getSortable.call(this));
        });

    };

})();

function collectionJS() {
    $('.ajax-new-collection').click(function () {
        var _this = $(this);
        $('#new-collection-ajax').attr('community', $(_this).attr('community'));
        $('#new-collection-ajax').attr('cid', $(_this).attr('cid'));
        $('#new-collection-ajax').attr('view', $(_this).attr('view'));
        $('#new-collection-ajax').attr('uuid', $(_this).attr('uuid'));
        $('.background').show();
        $('.new-collection-ajax').show();
    });
    $('#new-collection-ajax').submit(function () {
        var _this = $(this);
        var comm = $(_this).attr('community');
        var cid = $(_this).attr('cid');
        var nif = $(_this).attr('view');
        var uuid = $(_this).attr('uuid');
        $.post("/forms/collection-forms/create-collection.php", {
            name: $('.ajax-name').val(),
            transfer: $('.ajax-tranfer').val(),
            redirect: 'off'
        }).done(function (data) {
            var obj = JSON.parse(data);
            var elem;
            var html = '<tr><td><a href="/' + comm + '/account/collections/' + obj.id + '">' + obj.name + '</a></td><td class="' + obj.id + '-count">0</td>';
            $('.collection-tables').each(function(){
                elem = html + '<td><a href="javascript:void(0)" class="add-item" collection="' + obj.id + '" community="' + cid + '" view="' + nif + '" uuid="' + $(this).attr('uuid') + '"><i style="font-size: 16px;color:#00bb00" class="fa fa-plus-circle"></i></a></td></tr>';
                $(this).append(elem);
            });
            $('.background').hide();
            $('.new-collection-ajax').hide();
        }, "json");
        return false;
    });
    $('.collection-box table').on('click', '.add-item', function () {
        var _this = $(this);
        $('.update-' + $(_this).attr('uuid')).show();
        $.get("/forms/collection-forms/add-item.php", {
            community: $(_this).attr('community'),
            uuid: $(_this).attr('uuid'),
            view: $(_this).attr('view'),
            collection: $(_this).attr('collection')
        }).done(function (data) {
            $(_this).removeClass('add-item');
            $(_this).addClass('remove-item');
            $(_this).children('i').toggleClass('fa-times-circle fa-plus-circle');
            $(_this).children('i').css('color', '#bb0000');
            var obj = JSON.parse(data);
            $('.' + $(_this).attr('collection') + '-count').text(obj.num);
            $('.' + $(_this).attr('uuid') + '-image').show();
            $('.update-' + $(_this).attr('uuid')).hide();
            var parent = $(_this).closest('.coll-li').children('.collection-icon');
            $(parent).attr('title', 'In a Collection');
            $(parent).removeClass('icon-bg-gray');
            $(parent).addClass('icon-bg-green');
        }, "json");
    });
    $('.collection-box table').on('click', '.remove-item', function () {
        var _this = $(this);
        $.get("/forms/collection-forms/remove-item.php", {
            community: $(_this).attr('community'),
            uuid: $(_this).attr('uuid'),
            view: $(_this).attr('view'),
            collection: $(_this).attr('collection')
        }).done(function (data) {
            $(_this).removeClass('remove-item');
            $(_this).addClass('add-item');
            $(_this).children('i').toggleClass('fa-times-circle fa-plus-circle');
            $(_this).children('i').css('color', '#00bb00');
            var obj = JSON.parse(data);
            $('.' + $(_this).attr('collection') + '-count').text(obj.num);
            if (obj.inColl == 'true') {
                $('.' + $(_this).attr('uuid') + '-image').attr('title', 'In a Collection');
                $('.' + $(_this).attr('uuid') + '-image').removeClass('icon-bg-gray');
                $('.' + $(_this).attr('uuid') + '-image').addClass('icon-bg-green');
            } else {
                $('.' + $(_this).attr('uuid') + '-image').attr('title', 'Not in a Collection');
                $('.' + $(_this).attr('uuid') + '-image').removeClass('icon-bg-green');
                $('.' + $(_this).attr('uuid') + '-image').addClass('icon-bg-gray');
            }
        }, "json");
    });
    $('.manage-coll').click(function (e) {
        if (!$(this).parent().parent().parent().hasClass('active'))
            $('.btn-group').removeClass('active');
        $(this).parent().parent().parent().toggleClass('active');
        $(this).parent().parent().parent().toggleClass('open');
        e.stopPropagation();
        e.stopImmediatePropagation();
    });
    $('.collection-icon').click(function (e) {
        if (!$(this).parent().hasClass('active')) {
            $('.coll-li').removeClass('active');
            $(this).parent().addClass('active');
        } else {
            $(this).parent().removeClass('active');
        }
        e.stopPropagation();
        e.stopImmediatePropagation();
    });
}

function communityJS() {
    $('.showMoreColumns').click(function(){
        if($(this).hasClass('active')){
            $('.hidden-column.showing').hide();
            $(this).html('<i class="fa fa-plus"></i> Show More Columns</a>');
            $(this).removeClass('active');
        } else {
            $('.hidden-column.showing').show();
            $(this).html('<i class="fa fa-times"></i> Show Fewer Columns</a>');
            $(this).addClass('active');
        }
    });
    $('.multi-facets').submit(function(e){
        e.preventDefault();
        var url = $(this).attr('url');
        var facets = '';
        $('.facet-checkbox').each(function(){
            if($(this).is(':checked')){
                facets += '&facet[]='+$(this).attr('column')+':'+$(this).attr('facet');
            }
        });
        window.location = url+facets;
        return false;
    });
    $('.cite-this-btn').click(function (e) {
        $(this).parent().toggleClass('active');
        e.stopPropagation();
        e.stopImmediatePropagation();
    });
    $('.type-find-form').submit(function (e) {
        e.preventDefault();
        var query = $('.type-find').val();
        $('.type-table tr').hide();
        $('.first').show();
        if (query == '')
            $('.type-table tr').show();
        else
            $('.type-table tr[values*="' + query.toLowerCase() + '"]').show();
        $('.last').show();
    });
    $('.simple-toggle').click(function () {
        $('.background').show();
        $($(this).attr('modal')).show();
    });
    $('.sort-popular').click(function () {
        $('.inner-results').sortElements(function (a, b) {
            var contentA = parseInt($(a).attr('popularity'));
            var contentB = parseInt($(b).attr('popularity'));
            return (contentA < contentB) ? 1 : (contentA > contentB) ? -1 : 0;
        })
    });
    $('.circle-container').click(function (e) {
        if (!$(this).hasClass('active'))
            $('.circle-container').removeClass('active');
        $(this).toggleClass('active');
        e.stopPropagation();
        e.stopImmediatePropagation();
    });

    $('.circle-container').blur(function () {
        $('.circle-container').removeClass('active');
    });
    $('.no-propagation').click(function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
    })
    $('.save-search').click(function () {
        $('.background').show();
        $('.saved-this-search').show();
    });

    $('.snippet-edit').click(function () {
        var view = $(this).attr('view');
        var cid = $(this).attr('cid');
        $('.snippet-load').load('/php/snippet-load.php?view=' + view + '&cid=' + cid, function () {
            $('.background').show();
            $('.snippet-load').show();
        });
    });
    $('.fullrecord').click(function () {
        var view = $(this).attr('view');
        var uuid = $(this).attr('uuid');
        $('.record-load').load('/php/full-record.php?view=' + view + '&uuid=' + uuid, function () {
            $('.background').show();
            $('.record-load').show();
        });
    });
    $('.category-choose').click(function (e) {
        e.preventDefault();
        var parent = $(this).attr('parent');
        var child = $(this).attr('child');
        if ($(this).parent().hasClass('active')) {
            $('.inner-results').show();
            $('.inner-hidden-results').hide();
            $(this).parent().removeClass('active');
            $('.data-number').text($('.data-number').attr('data'));
            $('.source-number').text($('.source-number').attr('data'));
        } else {
            $('.inner-results').hide();
            $('.inner-results[parent="' + parent + '"][child="' + child + '"]').show();
            $('.category-li').removeClass('active');
            $('.data-number').text($(this).children('.category-number').text());
            $('.source-number').text($('.inner-results[parent="' + parent + '"][child="' + child + '"]').length);
            $(this).parent().addClass('active');
        }
    });
    $('.category-choose-comm').click(function (e) {
        e.preventDefault();
        var comm = $(this).attr('community');
        if ($(this).parent().hasClass('active')) {
            $('.inner-results').show();
            $('.inner-hidden-results').hide();
            $(this).parent().removeClass('active');
            $('.category-li-comm').removeClass('active');
            $('.data-number').text($('.data-number').attr('data'));
            $('.source-number').text($('.source-number').attr('data'));
        } else {
            $('.inner-results').hide();
            $('.inner-results[comms~="' + comm + '"]').show();
            $('.inner-hidden-results').hide();
            $('.category-li').removeClass('active');
            $('.category-li-comm').removeClass('active');
            $('.data-number').text($('.data-number').attr('data'));
            $('.source-number').text($('.source-number').attr('data'));
            $(this).parent().addClass('active');
        }
    });
    $('.column-search-form').submit(function () {
        var _this = $(this);
        var column = $(_this).attr('column');
        var value = $(_this).find('.form-control').val();
        var url = window.location.href.toString();
        window.location = url + '&filter[]=' + column + ':' + value;
        return false;
    });
    $('.column-search').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    });
    $('.sortin-column').click(function (e){
        window.location = $(this)[0].href;
    });
    $('.search-filter-btn').click(function () {
        $(this).parent().parent().parent().submit();
    });
    $('.search-header').click(function (e) {
        var _this = $(this);
        var box = $(_this).find('.column-search');
        if ($(box).is(':visible')) {
            $('.column-search').hide();
        } else {
            $('.column-search').hide();
            $(box).toggle();
        }
        e.stopPropagation();
        e.stopImmediatePropagation();
    });

    $('.page-search-form2').submit(function () {
        var community = $('.search-community').val();
        var category = $('.category-input').val();
        var subcategory = $('.subcategory-input').val();
        var source = $('.source-input').val();

        var stripped = $('.stripped-community').val();
        var url;

        var cat = '';
        if(category && category != '')
            cat = category;
        else
            cat = 'Any';

        if(stripped && stripped=='true')
            url = '/' + community + '/stripped/' + cat;
        else
            url = '/' + community + '/' + cat;
        if (subcategory && subcategory != '')
            url += '/' + subcategory;
        if (source && source != '')
            url += '/source/' + source;

        var display = $('#small-search-auto').val();
        var params = '';
        var query = $('#autoValues1').val();
        if (!query || query == '')
            params += 'q=' + display;
        else
            params += 'q=' + query + '&l=' + display;

        window.location = url + '/search?' + params;
        return false;
    });
    $('.page-search-form1').submit(function () {
        var community = $('.search-community').val();
        var category = $('.category-input').val();
        var subcategory = $('.subcategory-input').val();
        var source = $('.source-input').val();

        var stripped = $('.stripped-community').val();
        var url;

        if(stripped && stripped=='true')
            url = '/' + community + '/stripped/' + category;
        else
            url = '/' + community + '/' + category;
        if (subcategory && subcategory != '')
            url += '/' + subcategory;
        if (source && source != '')
            url += '/source/' + source;

        var display = $('#search-banner-input').val();
        var params = '';
        var query = $('#autoValues').val();
        if (!query || query == '')
            params += 'q=' + display;
        else
            params += 'q=' + query + '&l=' + display;

        window.location = url + '/search?' + params;
        return false;
    });
    $('.page-search-form').submit(function () {
        var search_type = $('.search-banner-type').val();
        var community = $('.search-community').val();
        if(search_type === undefined){
            if(community === "scicrunch") search_type = "mainpage";
            else if(community === "neuinfo") search_type = "neuinfo";
        }
        var query_param = search_type === "mainpage" ? "query=" : "q=";
        var category = $('input:radio[name=checkbox-inline]:checked').val();
        var display = $('#search-banner-input').val();
        var params = '';
        var query = $('#autoValues').val();
        if (!query || query == '')
            params += query_param + display;
        else
            params += query_param + query + '&l=' + display;
        var stripped = $('.stripped-community').val();
        var url;

        if(stripped && stripped=='true')
            url = '/' + community + '/stripped/' + category;
        else if(!community)
            url = '';
        else
            url = '/' + community + '/' + category;
        if(search_type === "mainpage") window.location = '/browse/search?' + params;
        else if(search_type === "neuinfo") window.location = '/neuinfo/data/search?' + params;
        else if(search_type === "resources-dashboard") window.location = "/scicrunch/Resources/search?" + params;
        else if(search_type === "data-dashboard") window.location = "/scicrunch/data/search?" + params;
        else window.location = url + '/search?' + params;
        return false;
    });
    $('.page-search-3').submit(function () {
        var category = $('select[name="category"]').val();
        var display = $('#search-block-input').val();
        var params = '';
        var query = $('#autoValues').val();
        if (!query || query == '')
            params += 'q=' + display;
        else
            params += 'q=' + query + '&l=' + display;
        var community = $('.search-community').val();
        var stripped = $('.stripped-community').val();
        var url;

        if(stripped && stripped=='true')
            url = '/' + community + '/stripped/' + category;
        else
            url = '/' + community + '/' + category;
        window.location = url + '/search?' + params;
        return false;
    });
    $('.edit-body-btn').click(function () {
        var id = $(this).attr('componentID');
        var type = $(this).attr('componentType')
        $('.component-add-load').empty();
        if (type == 'body') {
            $('.component-add-load').load('/php/single-body-component-load.php?id=' + id, function () {
                $('.background').show();
                $('.component-add-load').show();
            });
        } else if (type == 'other') {
            $('.component-add-load').load('/php/other-components-load.php?id=' + id, function () {
                $('.background').show();
                $('.component-add-load').show();
            });
        } else if (type == 'data') {
            $('.background').show();
            $('.custom-form').show();
        }
    });
    $('.add-data-btn').click(function () {
        var id = $(this).attr('componentID');
        var cid = $(this).attr('cid')
        $('.component-add-load').empty();
        $('.component-add-load').load('/php/data-load.php?comp=' + id + '&cid=' + cid, function () {
            $('.background').show();
            $('.component-add-load').show();
        });
    });
    $('.article-delete-btn').click(function () {
        $('.background').show();
        $('.article-delete').show();
    })
    $('.component-delete-btn').click(function () {
        var id = $(this).attr('componentID');
        var comm = $(this).attr('community');
        $('#component-delete-form').attr('action', '/forms/component-forms/body-component-delete.php?component=' + id + '&cid=' + comm);
        $('.background').show();
        $('.component-delete').show();
    })
    
   // Javascript to enable link to tab
	var hash = document.location.hash;
	var prefix = "tab_";
	if (hash) {
		$('a[href='+hash.replace(prefix,"")+']').tab('show');
	} 

	// Change hash for page-reload
	$('a').on('shown', function (e) {
		window.location.hash = e.target.hash.replace("#", "#" + prefix);
	});
}

$(function () {
    if ($(".searchbar").length) {
        $(".searchbar").autocomplete({
            source: function (request, response) {
                $.getJSON("/php/autocomplete.php", { term: $('.searchbar').val(), display: $('#autoValues').val() }, function(results){
                    results.sort(function(a,b){
                        if(a[1] === b[1]) return 0;
                        if(a[1] === "Resource") return 1;
                        if(b[1] === "Resource") return -1;
                        return 0;
                    });
                    response(results);
                });
            },
            appendTo: '.autocomplete_append',
            focus: function (event, ui) {
                event.preventDefault();
                jQuery(this).val(ui.item[6]);
                return false;
            },
            messages: {
                noResults: '',
                results: function () {
                }
            },
            select: function (event, ui) {
                event.preventDefault();
                jQuery(this).val(ui.item[6]);
                $('#autoValues').val(ui.item[8]);
                return false;
            }
        }).data("ui-autocomplete")._renderItem = function (ul, item) {
            //alert(item);
            return $("<li></li>").data("ui-autocomplete-item", item).append("<a><b>" + decodeURIComponent(item[0]) + "</b><div class='float'>" + item[1] + " " + "<a href='http://neurolex.com/wiki/" + item[2] + "' target='_blank'>" + item[2] + "&nbsp;&nbsp;<span style='color:#7207c0'>" + item[9] + "</span></div></a>").appendTo(ul);
        };
    }
});

$(function () {
    if ($('.small-search').length) {
        $(".small-search").autocomplete({
            source: function (request, response) {
                $.getJSON("/php/autocomplete.php", { term: $('#small-search-auto').val(), display: $('#autoValues1').val() }, function(results){
                    results.sort(function(a,b){
                        if(a[1] === b[1]) return 0;
                        if(a[1] === "Resource") return 1;
                        if(b[1] === "Resource") return -1;
                        return 0;
                    });
                    response(results);
                });
            },
            appendTo: '.autocomplete_append1',
            focus: function (event, ui) {
                event.preventDefault();
                jQuery(this).val(ui.item[6]);
                return false;
            },
            messages: {
                noResults: '',
                results: function () {
                }
            },
            select: function (event, ui) {
                event.preventDefault();
                jQuery(this).val(ui.item[6]);
                $('#autoValues1').val(ui.item[8]);
                return false;
            }
        }).data("ui-autocomplete")._renderItem = function (ul, item) {
            //alert(item);
            return $("<li></li>").data("ui-autocomplete-item", item).append("<a><b>" + decodeURIComponent(item[0]) + "</b><div class='float'>" + item[1] + " " + "<a href='http://neurolex.com/wiki/" + item[2] + "' target='_blank'>" + item[2] + "&nbsp;&nbsp;<span style='color:#7207c0'>" + item[9] + "</span></a>").appendTo(ul);
        };
    }
});

$(function () {
    if ($('.field-autocomplete').length) {
        $(".field-autocomplete").autocomplete({
            source: function (request, response) {
                $.getJSON("/php/autocomplete.field.php", { term: $(this.element).val(), display: $(this.element).parent().children('.autoValues').val(), category: $(this.element).attr('category') },
                    response);
            },
            appendTo: '.autocomplete_append',
            focus: function (event, ui) {
                event.preventDefault();
                var prev_val = $(this).val();
                prev_val = prev_val.substr(0, prev_val.lastIndexOf(","));
                var delim = ", ";
                if(prev_val.length === 0) delim = "";
                jQuery(this).val(prev_val + delim + ui.item.value);
                $(this).parent().children('.autoValues').val(ui.value);
                return false;
            },
            messages: {
                noResults: '',
                results: function () {
                }
            },
            select: function (event, ui) {
                event.preventDefault();
                var prev_val = $(this).val();
                prev_val = prev_val.substr(0, prev_val.lastIndexOf(","));
                var delim = ", ";
                if(prev_val.length === 0) delim = "";
                jQuery(this).val(prev_val + delim + ui.item.value);
                $(this).parent().children('.autoValues').val(ui.item.value);
                return false;
            }
        }).data("ui-autocomplete")._renderItem = function (ul, item) {
            //alert(item);
            return $("<li></li>").data("ui-autocomplete-item", item).append("<a><b>" + decodeURIComponent(item[0]) + "</b><div class='float'>" + item[1] + " " + "<a href='http://neurolex.com/wiki/" + item[2] + "' target='_blank'>" + item[2] + "&nbsp;&nbsp;<span style='color:#7207c0'>" + item[9] + "</span></div></a>").appendTo(ul);
        };
    }
});

var Validation = function () {

    return {

        //Validation
        initValidation: function () {
            $(".user-information-form").validate({
                // Rules for form validation
                rules: {
                    required: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    date: {
                        required: true,
                        date: true
                    },
                    min: {
                        required: true,
                        minlength: 5
                    },
                    range: {
                        required: true,
                        rangelength: [5, 10]
                    },
                    digits: {
                        required: true,
                        digits: true
                    },
                    number: {
                        required: true,
                        number: true
                    },
                    minVal: {
                        required: true,
                        min: 5
                    },
                    maxVal: {
                        required: true,
                        max: 100
                    },
                    rangeVal: {
                        required: true,
                        range: [5, 100]
                    },
                    url: {
                        url: true
                    }
                },

                // Messages for form validation
                messages: {
                    required: {
                        required: 'Please enter something'
                    },
                    email: {
                        required: 'Please enter your email address'
                    },
                    date: {
                        required: 'Please enter some date'
                    },
                    min: {
                        required: 'Please enter some text'
                    },
                    max: {
                        required: 'Please enter some text'
                    },
                    range: {
                        required: 'Please enter some text'
                    },
                    digits: {
                        required: 'Please enter some digits'
                    },
                    number: {
                        required: 'Please enter some number'
                    },
                    minVal: {
                        required: 'Please enter some value'
                    },
                    maxVal: {
                        required: 'Please enter some value'
                    },
                    rangeVal: {
                        required: 'Please enter some value'
                    },
                    url: {
                        url: 'Please enter a valid URL'
                    }
                },

                // Do not change code below
                errorPlacement: function (error, element) {
                    error.insertAfter(element.parent());
                }
            });
            $(".reg-page:not(.reg-page-style)").validate({
                // Rules for form validation
                rules: {
                    required: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    date: {
                        required: true,
                        date: true
                    },
                    min: {
                        required: true,
                        minlength: 5
                    },
                    range: {
                        required: true,
                        rangelength: [5, 10]
                    },
                    digits: {
                        required: true,
                        digits: true
                    },
                    number: {
                        required: true,
                        number: true
                    },
                    minVal: {
                        required: true,
                        min: 5
                    },
                    maxVal: {
                        required: true,
                        max: 100
                    },
                    rangeVal: {
                        required: true,
                        range: [5, 100]
                    },
                    url: {
                        url: true
                    }
                },

                // Messages for form validation
                messages: {
                    required: {
                        required: 'Please enter something'
                    },
                    email: {
                        required: 'Please enter your email address'
                    },
                    date: {
                        required: 'Please enter some date'
                    },
                    min: {
                        required: 'Please enter some text'
                    },
                    max: {
                        required: 'Please enter some text'
                    },
                    range: {
                        required: 'Please enter some text'
                    },
                    digits: {
                        required: 'Please enter some digits'
                    },
                    number: {
                        required: 'Please enter some number'
                    },
                    minVal: {
                        required: 'Please enter some value'
                    },
                    maxVal: {
                        required: 'Please enter some value'
                    },
                    rangeVal: {
                        required: 'Please enter some value'
                    },
                    url: {
                        url: 'Please enter a valid URL'
                    }
                },

                // Do not change code below
                errorPlacement: function (error, element) {
                    error.insertAfter(element.parent());
                }
            });
            $(".create-form").validate({
                // Rules for form validation
                rules: {
                    required: {
                        required: true
                    },
                    email: {
                        email: true
                    },
                    date: {
                        required: true,
                        date: true
                    },
                    min: {
                        required: true,
                        minlength: 5
                    },
                    range: {
                        required: true,
                        rangelength: [5, 10]
                    },
                    digits: {
                        required: true,
                        digits: true
                    },
                    number: {
                        required: true,
                        number: true
                    },
                    minVal: {
                        required: true,
                        min: 5
                    },
                    maxVal: {
                        required: true,
                        max: 100
                    },
                    rangeVal: {
                        required: true,
                        range: [5, 100]
                    },
                    url: {
                        url: true
                    }
                },

                // Messages for form validation
                messages: {
                    required: {
                        required: 'Please enter something'
                    },
                    email: {
                        required: 'Please enter your email address'
                    },
                    date: {
                        required: 'Please enter some date'
                    },
                    min: {
                        required: 'Please enter some text'
                    },
                    max: {
                        required: 'Please enter some text'
                    },
                    range: {
                        required: 'Please enter some text'
                    },
                    digits: {
                        required: 'Please enter some digits'
                    },
                    number: {
                        required: 'Please enter some number'
                    },
                    minVal: {
                        required: 'Please enter some value'
                    },
                    maxVal: {
                        required: 'Please enter some value'
                    },
                    rangeVal: {
                        required: 'Please enter some value'
                    },
                    url: {
                        url: 'Please enter a valid URL'
                    }
                },

                // Do not change code below
                errorPlacement: function (error, element) {
                    error.insertAfter(element.parent());
                }
            });
            $("#header-component-form").validate({
                // Rules for form validation
                rules: {
                    required: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    date: {
                        required: true,
                        date: true
                    },
                    min: {
                        required: true,
                        minlength: 5
                    },
                    range: {
                        required: true,
                        rangelength: [5, 10]
                    },
                    digits: {
                        required: true,
                        digits: true
                    },
                    number: {
                        required: true,
                        number: true
                    },
                    minVal: {
                        required: true,
                        min: 5
                    },
                    maxVal: {
                        required: true,
                        max: 100
                    },
                    rangeVal: {
                        required: true,
                        range: [5, 100]
                    },
                    url: {
                        url: true
                    }
                },

                // Messages for form validation
                messages: {
                    required: {
                        required: 'Please enter something'
                    },
                    email: {
                        required: 'Please enter your email address'
                    },
                    date: {
                        required: 'Please enter some date'
                    },
                    min: {
                        required: 'Please enter some text'
                    },
                    max: {
                        required: 'Please enter some text'
                    },
                    range: {
                        required: 'Please enter some text'
                    },
                    digits: {
                        required: 'Please enter some digits'
                    },
                    number: {
                        required: 'Please enter some number'
                    },
                    minVal: {
                        required: 'Please enter some value'
                    },
                    maxVal: {
                        required: 'Please enter some value'
                    },
                    rangeVal: {
                        required: 'Please enter some value'
                    },
                    url: {
                        url: 'Please enter a valid URL'
                    }
                },

                // Do not change code below
                errorPlacement: function (error, element) {
                    error.insertAfter(element.parent());
                }
            });
            $(".resource-form-validate").validate({
                // Rules for form validation
                rules: {
                    required: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    date: {
                        required: true,
                        date: true
                    },
                    min: {
                        required: true,
                        minlength: 5
                    },
                    range: {
                        required: true,
                        rangelength: [5, 10]
                    },
                    digits: {
                        required: true,
                        digits: true
                    },
                    number: {
                        required: true,
                        number: true
                    },
                    minVal: {
                        required: true,
                        min: 5
                    },
                    maxVal: {
                        required: true,
                        max: 100
                    },
                    rangeVal: {
                        required: true,
                        range: [5, 100]
                    },
                    Resource_URL: {
                        url: true
                    }
                },

                // Messages for form validation
                messages: {
                    required: {
                        required: 'Field cannot be empty'
                    },
                    email: {
                        required: 'Please enter your email address'
                    },
                    date: {
                        required: 'Please enter some date'
                    },
                    min: {
                        required: 'Please enter some text'
                    },
                    max: {
                        required: 'Please enter some text'
                    },
                    range: {
                        required: 'Please enter some text'
                    },
                    digits: {
                        required: 'Please enter some digits'
                    },
                    number: {
                        required: 'Please enter some number'
                    },
                    minVal: {
                        required: 'Please enter some value'
                    },
                    maxVal: {
                        required: 'Please enter some value'
                    },
                    rangeVal: {
                        required: 'Please enter some value'
                    },
                    url: {
                        url: 'Please enter a valid URL (ex. http://scicrunch.org)'
                    },
                    Resource_URL: {
                        url: 'Please enter a valid URL (ex. http://scicrunch.org)'
                    }
                },

                // Do not change code below
                errorPlacement: function (error, element) {
                    error.insertAfter(element.parent());
                }
            });
        }

    };
}();

function updateReview() {
    $('.resource-field').each(function () {
        var _this = $(this);
        var name = $(_this).attr('name');
        $('.review-' + name).val($(_this).val());
    });
    $('.form_class').submit(function (event) {
        event.preventDefault();
        if ($(".input_first").val() != "") {
            window.location = window.location.href.toString() + '&query=' + encodeURIComponent($(".input_first").val());
        }
    });
}

function updateLogin() {
    $('.note-load').load('/forms/updateLogin.php', function () {
        $('.notifications').html($('.note-load').html());
        setTimeout(function () {
            $('.notification-alert').fadeOut("slow");
        }, 3000);
    });
    setTimeout(updateLogin, 150000);
}

function handleSearchV1() {
    jQuery('.search-button').click(function () {
        jQuery('.search-open').slideDown();
    });

    jQuery('.search-close').click(function () {
        jQuery('.search-open').slideUp();
    });


}

function tagAutocomplete() {

}
