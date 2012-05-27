function html_tag(tag, content, attributes){
	attr = '';
	if(attributes != undefined){
		$.each(attributes, function(i, val){
			attr += ' '+i+'="'+val+'"';
		});
	}
	return content || attr.indexOf('clear') >= 0 ? '<'+tag+attr+'>'+content+'</'+tag+'>' : '';
}

function get_value(item, tag){
	return item.find(tag+':first').text();
}

function get_attr(item, tag, attr){
    return attr != undefined ? item.find(tag+':first').attr(attr) : item.find(tag+':first').attr().map();
}

function mklink(item){
	var href = get_value(item, 'link');
	var text = get_value(item, 'title');
    var attr_type = get_attr(item, 'link', 'type');
    var target = (attr_type == 'newpage') ? {'target' : '_blank'} : {};
    var attributes = $.extend(target, {'href' : href});
	return html_tag('a', text, attributes);
}

function get_files(item){
	var files = item.find('files');
	var file_list = '';
	var description = get_value(files, 'description');

	if(description){
		file_list += html_tag('h4', '&raquo; '+description) + html_tag('div', '', {'class' : 'clear'})
	}
	
	if(files.length){
		file_list += '<ul>';
		files.find('file').each(function(){
			file_list += '<li>'+mklink($(this))+'</li>';
		});
		file_list += '</ul>';
	}
	return file_list;
}

function generate_html(item){
	var text_title = html_tag('h2', get_value(item, 'text_title'));
	var p_text = html_tag('p', get_value(item, 'content'));
	var file_list = get_files(item);
	return text_title + p_text + html_tag('div', '', {'class': 'clear'}) + file_list;
}

function generate_top_links_menu(xml_data){
    $(xml_data).find('top_links').each(function(){
        $(this).find('link').each(function(){
            var title = get_value($(this), 'title');
            var url = get_value($(this), 'url');
            var icon = get_value($(this), 'icon');
            url = (url.match(/^https?:\/\//) ? url : 'http://' + url);
            $('#top_links ul').append(html_tag('li', html_tag('a', title, {'href' : url, 'target' : '_blank'}), (icon ? {'class' : 'icon icon_' + icon} : undefined)));
        });
    });
}

function load_content(){
	$.ajax({
		url: 'xml/content.xml',
		type: 'GET',
		dataType: 'xml',
		success: function(xml_data){
			var content = $('#content');
			$(xml_data).find('text').each(function(){
				var html_content = generate_html($(this));
				content.append('<div class="text">'+html_content+'</div>');
			});
			var main_photo = get_value($(xml_data), 'main_photo');
			var main_text = get_value($(xml_data), 'main_text');
			if(main_photo){
				$('.description').append('<img src="'+ (!main_photo.match(/^https?:\/\//) ? 'imgs/' : '') + main_photo+'" alt="'+main_photo+'" />');
			}
			if(main_text){
				$('.description').append(html_tag('div', main_text, {'class' : 'text'}));
			}			

            generate_top_links_menu(xml_data);
            
		}
	});
	return true;
}

$(document).ready(function(){
	load_content();
});
