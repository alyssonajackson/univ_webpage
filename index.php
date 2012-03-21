<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http:2//www.w3.org/TR/html4/strict.dtd">
<html>
	<head>
		<title>HTML (single) Webpage</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
		<script type="text/javascript" src="js/jquery.js"></script>
		<link type="text/css" media="screen" rel="stylesheet" href="css/sty.css">
	</head>

	<body>

		<?php
			require_once('xmlstr_to_array.php');	
			$content = xmlstr_to_array(file_get_contents('xml/content.xml'));
		?>	
		
		<div id="header">
			<h1>Professor webpage sample</h1>
			<h3>University test</h3>
		</div>
	
		<div id="content">
		
			<div class="description">
				<img src="imgs/<?php echo $content['main_photo']; ?>" alt="<?php echo $content['main_photo']; ?>" />
				<div class="text"><?php echo $content['main_text']; ?></div>
			</div>
			<div class="clear"></div>			
			
			<?php foreach($content['text'] as $text) : ?>
				
				<div class="text">
				
					<?php if(isset($text['title'])) : ?>
						<h2><?php echo $text['title']; ?></h2>
					<?php endif; ?>
						
					<?php if(isset($text['content'])) : ?>
						<p><?php echo $text['content']; ?></p>
					<?php endif; ?>
					
					<div class="clear"></div>
					
					<?php if(isset($text['files']) && count($text['files'])) : ?>
						<?php if(isset($text['files']['description'])) : ?>
							<h4>&raquo; <?php echo $text['files']['description']; ?></h4>
							<div class="clear"></div>
						<?php endif; ?>
						<?php if(isset($text['files']['file'])) : ?>
							<ul>
								<?php foreach($text['files']['file'] as $file) : ?>
									<li><a href="<?php echo $file['link']; ?>"><?php echo $file['title']; ?></a></li>
								<?php endforeach; ?>
							</ul>
						<?php endif; ?>
					<?php endif; ?>
					
				</div>
			<?php endforeach; ?>
			
		</div>
		
	</body>

</html>