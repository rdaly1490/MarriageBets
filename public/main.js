$( document ).ready(function() {
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 15 // Creates a dropdown of 15 years to control year
	});

	$('#submit-form').on('submit', function(e) {
		e.preventDefault();
		console.log('submitting...');
		// if (isValid())
		// TODO: make an isValid function that checks all form data before $.POST

		var vals = $('input');
		var inputData = {}
		vals.each(function(index, item) {
			if (item.type === 'text') {
				inputData[item.id] = $(this).val();
			}
		});
		var formData = {
			userName: (inputData.user_first_name + ' ' + inputData.user_last_name).toLowerCase(),
			friendName: (inputData.friend_first_name + ' ' + inputData.friend_last_name).toLowerCase(),
			date: inputData.date
		};

		$.post('/bets', formData, function(data) {
			console.log('Success, bet placed');
		})
		.fail(function(err) {
			console.log(err.responseJSON.message);
		});
	});

	$('#search-form').on('submit', function(e) {
		e.preventDefault();
		var query = $('#search-query').val().toLowerCase();
		$.get('/bets', {userName: query}, function(data) {
			console.log('successful find', data);
		})
		.fail(function(err) {
			console.log(err.responseJSON.message);
		});
		// make api call and .done => {jQuery.render(<h1>blah</h1>)}
		// http://code.tutsplus.com/tutorials/quick-tip-an-introduction-to-jquery-templating--net-10535
	});
});
