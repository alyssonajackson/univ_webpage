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

function mklink(item){
	var href = get_value(item, 'url');
	var text = get_value(item, 'title');
	return html_tag('a', text, {'href' : href});
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
		}
	});
	return true;
}

$(document).ready(function(){
	load_content();
});