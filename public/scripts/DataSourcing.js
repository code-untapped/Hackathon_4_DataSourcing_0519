var url;
var login, group, msg;

var server = 'http://35.189.104.97:3000/'

if (window.localStorage) {
    login = localStorage.login;
}

$newItemButton = $('#sourceDataButton');

$('#welcomeBanner').html('\n Welcome ' + login );
$('body').append('<div id="reload"></div>');

function loadRecords(url) {
	var version_no = new Date();
	//url = 'http://localhost:3000/dataSource';
	url = server + 'dataSource';
    url += '?login=' + login;
	url += '&version=' + version_no;
	$.getJSON( url )
	.done( function(data) {

		var size = data.length;
		//window.alert(size)
		//window.alert(JSON.stringify(data));

		tableContent = '[';
		$.each(data, function(index, element) {

			tableContent += '{';
			tableContent += '"firstName": "' + element.first_name + '",';
			tableContent += '"lastName": "' + element.last_name + '",';
			tableContent += '"affiliation": "' + element.affiliation_name + '"';
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
				{ data: 'firstName' },
				{ data: 'lastName' },
				{ data: 'affiliation' }
			]
		} );
 
	}).fail ( function() {
		$('#dataRecords').html('<p> Records could not be loaded </p>');
	});
}

loadRecords(url);

$newItemButton.on('click', function(e) {
    e.preventDefault();
    loadRecords(url);    
});