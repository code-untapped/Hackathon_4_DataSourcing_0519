var url;
var login, group, msg;

var server = 'http://35.246.115.207:3000/'

if (window.localStorage) {
    login = localStorage.login;
}

$newItemButton = $('#sourceDataButton');

$('#welcomeBanner').html('\n Welcome ' + login );
$('body').append('<div id="reload"></div>');

function loadRecords(url) {
	var version_no = new Date();
	//url = 'http://localhost:3000/FundingRounds';
	url = server + 'FundingRounds';
    url += '?login=' + login;
	url += '&version=' + version_no;
	$.getJSON( url )
	.done( function(data) {


			  


		var size = data.length;
		//window.alert(size)
		//window.alert(JSON.stringify(data));

		tableContent = '[';
		$.each(data, function(index, element) {
			let personPhoto = undefined;
			//results.picture.medium
			
			// $.ajax({
			// 	url: 'https://randomuser.me/api/',
			// 	dataType: 'jsonp',
			// 	success: function(data) {
			// 		console.log(JSON.stringify(data.results[0].picture.medium));
			// 	}
			// });

			$.ajax({
				url: 'https://randomuser.me/api/',
				dataType: 'json',
				success: function(data) {
				  console.log(data.results[0].picture.medium);
				}
			  });
				 

			tableContent += '{';
            tableContent += '"h1": "' + element.h1 + '",';
            tableContent += '"h2": "' + element.h2 + '"';
			// tableContent += '"lastName": "' + element.last_name + '",';
			// tableContent += '"affiliation": "' + element.affiliation_name + '",';
			// tableContent += '"birthplace": "' + element.birthplace + '",';
			// tableContent += '"picture": "hi"';
			if ( index < size -1 ) {
				tableContent += '},';
			} else {
				tableContent += '}';
			}
			console.log(tableContent)
		});
		tableContent += ']';
		var tableData = JSON.parse(tableContent);

		if ( $.fn.dataTable.isDataTable( '#dataRecords' ) ) {
			table = $('#dataRecords').DataTable();
			table.destroy();
		}

		$('#dataRecords').DataTable( {
			data: tableData,
			autoWidth: false,
			//scrollY : '400px',
			//scrollCollapse: true,
			//paging: false,
			columns: [
				{ data: 'h1' },
				{ data: 'h2' }
				// { data: 'affiliation' },
				// { data: 'birthplace' },
				// { data: 'picture' }
			]
		} );
 
	}).fail ( function() {
		$	('#dataRecords').html('<p> Records could not be loaded </p>');
	});
}

loadRecords(url);

$newItemButton.on('click', function(e) {
    e.preventDefault();
    loadRecords(url);    
});