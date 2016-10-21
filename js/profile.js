/**
 * Created by Davis on 10/31/14.
 */

jQuery(document).ready(function ($) {
    validation();
    normalActions();
});

function normalActions(){
    $('.rename-coll').click(function(){
        var name = $(this).attr('name');
        var collect = $(this).attr('collection');
        $('.collection-id').val(collect);
        $('.collection-rename').val(name);
        $('.background').show();
        $('.rename-collection').show();
    })
    $('.delete-coll').click(function(){
        var collect = $(this).attr('collection');
        $('.delete-coll-id').val(collect);
        $('.background').show();
        $('.delete-collection').show();
    })
    $('.header-select').change(function () {
        $('.header-image').attr('src', '/images/components/header-' + $(this).val() + '.png');
    });
    $('.footer-select').change(function () {
        $('.footer-image').attr('src', '/images/components/footer-' + $(this).val() + '.jpg');
    });
    $('.color-input').blur(function () {
        $(this).parent().children('.fa-circle').css('color', '#' + $(this).val());
    });
    $('body').on('blur','.color-input',function(){
        $(this).parent().children('.fa-circle').css('color', '#' + $(this).val());
    });
    $('.tab-pane').addClass('active');
    $('.contentHolder').perfectScrollbar();
    $('.tab-pane').removeClass('active');
    $('.tab-pane.in').addClass('active');
    $('.user-add').click(function () {
        $('.background').show();
        $('.user-add-container').show();
    });
    $('.user-edit').click(function () {
        var name = $(this).attr('user');
        var uid = $(this).attr('uid');
        var level = $(this).attr('level');
        $('.theName').html('<b>' + name + '</b>');
        $('.uid').val(uid);
        $('.edit-level option[value="' + level + '"]').attr('selected', 'selected');
        $('.background').show();
        $('.user-edit-container').show();
    });
    $('.file-add').click(function () {
        var type = $(this).attr('file');
        $('.file-name').text(type);
        $('.file-type').val(type);
        $('.background').show();
        $('.file-load').show();
    });
    $('.source-form').submit(function (e) {
        e.preventDefault();
        var query = $('.source-find').val();
        $('.source-table tr').hide();
        $('.first').show();
        if (query == '')
            $('.source-table tr').show();
        else
            $('.source-table tr[values*="' + query.toLowerCase() + '"]').show();
    });
    $('.saved-edit').click(function () {
        var id = $(this).attr('saved');
        var name = $(this).attr('saveName');
        $('.saved-id-input').val(id);
        $('.saved-name-input').val(name);
        $('.background').show();
        $('.saved-this-search').show();
    });
}

function validation(){
    Validation.initValidation();
    jQuery.validator.addMethod("exists", function (value, element, param) {
        var status;
        $.ajax({
            url: param,
            data: 'name=' + value,
            async: false,
            dataType: 'json',
            success: function (j) {
                if (j != '0') {
                    status = true;
                } else
                    status = false;
            }
        });
        return status;
    }, $.format("That email is not available."));
    jQuery.validator.addMethod("accept", function (value, element, param) {
        return value.match(new RegExp(param));
    }, $.format("You have used an invalid character for this type."));

    jQuery.validator.addClassRules('portal', {
        required: false,
        accept: "[0-9a-fA-F\-\.]*",
        exists: "/validation/community-name.php"
    });
    jQuery.validator.addClassRules('color-input', {
        maxlength: 6,
        minlength: 6,
        required: false,
        accept: "[0-9a-fA-F]*"
    });
    jQuery.validator.addClassRules('sign-up', {
        required: true,
        email:true,
        exists: "/validation/user-email.php"
    });
    jQuery.validator.addClassRules('sign-up-password', {
        minlength: 6
    });
    //jQuery.validator.addClassRules('sign-up-checkbox', {
    //    required: true
    //});

    $('.summer-text').summernote({
        height: 200,                 // set editor height

        onImageUpload: function(files, editor, welEditable) {
            sendFile(files[0], editor, welEditable);
        },

        minHeight: null,             // set minimum height of editor
        maxHeight: null,             // set maximum height of editor

        focus: false,                 // set focus to editable area after initializing summernote
        toolbar: [
            //[groupname, [button list]]

            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['insert', ['link', 'hr', 'picture']],
            ['misc',['fullscreen','codeview']],
            ['help',['help']]
        ]
    });

    function sendFile(file, editor, welEditable) {
    	data = new FormData();
		data.append("file", file);
		$.ajax({
			data: data,
			type: "POST",
			url: "/php/sendfile.php",
			cache: false,
			contentType: false,
			processData: false,
			success: function(url) {
				editor.insertImage(welEditable, url);
			}
		});
    }
}

$(function () {
    if ($('.user-find').length) {
        $(".user-find").autocomplete({
            source: function (request, response) {
                $.getJSON("/php/user-autocomplete.php", { term: $('.user-find').val(), cid: $('.cid').val() },
                    response);
            },
            appendTo: '.autocomplete_append',
            focus: function (event, ui) {
                event.preventDefault();
                jQuery(this).val(ui.item[1]);
                return false;
            },
            select: function (event, ui) {
                event.preventDefault();
                jQuery(this).val(ui.item[1]);
                $('.user-id').val(ui.item[0]);
                return false;
            }
        }).data("ui-autocomplete")._renderItem = function (ul, item) {
            //alert(item);
            return $("<li></li>").data("ui-autocomplete-item", item).append("<a><b>" + decodeURIComponent(item[1]) + "</b></a>").appendTo(ul);
        };
    }
});
