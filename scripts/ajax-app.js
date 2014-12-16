$(function() {

	var $friends = $('#friends');
	var $name = $('#name');
	var $age = $('#age');

	var friendTemplate = $('#friend-template').html();

	function addFriend(friend) {
		$friends.append(Mustache.render(friendTemplate, friend));
	}

	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/granadier/friends',
		success: function(friends) {
			$.each(friends, function(i, friend) {
				addFriend(friend);
				console.log('friends loaded successfully');
			})
		},
		error: function() {
			console.log("error loading friends");
		}
	});

	$('#add-friend').on('click', function() {

		var friend = {
			name: $name.val(),
			age: $age.val()
		};

		$.ajax({
			type: 'POST',
			url: 'http://rest.learncode.academy/api/granadier/friends',
			data: friend,
			success: function(newFriend) {
				addFriend(newFriend);
				console.log('friend added successfully');
			},
			error: function() {
				console.log('error saving friend');
			}
		});
	});

	$friends.delegate('.remove', 'click', function() {

		var $li = $(this).closest('li');

		$.ajax({
			type: 'DELETE',
			url: 'http://rest.learncode.academy/api/granadier/friends/' + $(this).attr('data-id'),
			success: function() {
				$li.fadeOut(300, function() {
					$(this).remove();
				});
				console.log('friend deleted successfully');
			}
		});
	});

	$friends.delegate('.editFriend', 'click', function() {
		var $li = $(this).closest('li');
		$li.find('input.name').val($li.find('span.name').html());
		$li.find('input.age').val($li.find('span.age').html());
		$li.addClass('edit');
	});

	$friends.delegate('.cancelEdit', 'click', function() {
		var $li = $(this).closest('li').removeClass('edit');
	});

	$friends.delegate('.saveEdit', 'click', function() {
		var $li = $(this).closest('li');

		var friend = {
			name: $li.find('input.name').val(),
			age: $li.find('input.age').val()
		};

		$.ajax({
			type: 'PUT',
			url: 'http://rest.learncode.academy/api/granadier/friends/' + $li.attr('data-id'),
			data: friend,
			success: function(newFriend) {
				$li.find('span.name').html(friend.name);
				$li.find('span.age').html(friend.age);
				$li.removeClass('edit');

				console.log('friend edited successfully');
			},
			error: function() {
				console.log('error saving friend');
			}
		});
	});
});
