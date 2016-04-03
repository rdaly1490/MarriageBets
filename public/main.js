$( document ).ready(function() {
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 15 // Creates a dropdown of 15 years to control year
	});

	function checkIfLettersOnly(str) {
		if (/^[a-z]+$/i.test(str)) {
			return true;
		}
		return false;
	}

	function checkDate(date) {
		if (date !== '') {
			return true;
		}
		return false;
	}

	function isValid(obj) {
		var entries = [];
		var keys = Object.keys(obj);
		keys.forEach(function(item) {
			if (item !== 'search-query') {
				var value = $.trim(obj[item]);
				var goodString = item === 'date' ? checkDate(value) : checkIfLettersOnly(value); 
				entries.push({
					label: item,
					value: value,
					valid: goodString
				});
			}
		});
		return entries
	}

	$('#submit-form').on('submit', function(e) {
		e.preventDefault();

		var vals = $('input');
		var inputData = {}
		var inCorrectSubmission = false;
		vals.each(function(index, item) {
			if (item.type === 'text') {
				inputData[item.id] = $(this).val();
			}
		});

		isValid(inputData).forEach(function(item, index) {
			var newID = item.label + '_error';
			var target = $('#' + newID);
			if (!item.valid) {
				target.html('Invalid Input');
				inCorrectSubmission = true;
			} else {
				target.html('');
			}
		});

		if (!inCorrectSubmission) {
			console.log('submitting...');
			var formData = {
				userName: (inputData.user_first_name.trim() + ' ' + inputData.user_last_name.trim()).toLowerCase(),
				friendName: (inputData.friend_first_name.trim() + ' ' + inputData.friend_last_name.trim()).toLowerCase(),
				date: inputData.date
			};

			$.post('/bets', formData, function(data) {
				console.log('Success, bet placed');
			})
			.fail(function(err) {
				console.log(err.responseJSON.message);
			});
		}
	});

	$('#search-form').on('submit', function(e) {
		e.preventDefault();
		var query = $('#search-query').val().toLowerCase();
		$.get('/bets', {friendName: query}, function(data) {
			data.forEach(function(item) {
				$('#search-results').append('<tr><td>' + item.userName + '</td><td>' + item.friendName + '</td><td>' + item.date + '</td></tr>');
			});
			console.log('successful find', data);
		})
		.fail(function(err) {
			console.log(err.responseJSON.message);
		});
	});
});
