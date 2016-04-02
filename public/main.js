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
		var formData = {}
		vals.each(function(index, item) {
			if (item.type === 'text') {
				formData[item.id] = $(this).val();
			}
		});
		console.log(formData);

		$.post('http://localhost:3000/bets', {userName: 'Rob', friendName: 'Rob2', date: '1/1/1900'}, function(data) {
			console.log('Success, bet placed');
		})
		.fail(function(err) {
			console.log(err.responseJSON.message);
		})
		// POST formData
	});

	$('#search-form').on('submit', function(e) {
		e.preventDefault();
		console.log('searching...');
		$.get('http://localhost:3000/bets', {userName: 'Rob'}, function(data) {
			console.log('successful find');
		})
		.fail(function(err) {
			console.log(err.responseJSON.message);
		});
		// make api call and .done => {jQuery.render(<h1>blah</h1>)}
		// http://code.tutsplus.com/tutorials/quick-tip-an-introduction-to-jquery-templating--net-10535
	});
});
