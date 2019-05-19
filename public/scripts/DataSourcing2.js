var url;
var login, group, msg;

var server = 'http://35.246.115.207:3000/'

if (window.localStorage) {
    login = localStorage.login;
}

$newItemButton = $('#sourceDataButton');
$fundingButton = $('#fundingDataButton');

$('#welcomeBanner').html('\n Welcome ' + login );
$('body').append('<div id="reload"></div>');

function loadRecords(url) {
	var version_no = new Date();
	//url = 'http://localhost:3000/peopleDataSource';
	url = server + 'datasourceperformanceServer';
    url += '?login=' + login;
	url += '&version=' + version_no;
	$.getJSON( url )
	.done( function(data) {

		var size = data.length;
		//window.alert(size)
		//window.alert(JSON.stringify(data));

		tableContent = '[';
		$.each(data, function(index, element) {
			
			let ranNumber = Math.floor(Math.random() * 80) + 1;
			let menOrWomen = Math.floor(Math.random() * 2) + 1;
			
			ranNumber = ranNumber.toString();
			menOrWomen === 1 ? menOrWomen = 'women' : menOrWomen = 'men';
				 

			tableContent += '{';
			tableContent += '"id": "' + element.id + '",';
			tableContent += '"object_id": "' + element.object_id + '",';
			tableContent += '"milestone_at": "' + element.milestone_at + '",';
            tableContent += '"milestone_code": "' + element.milestone_code + '",';
            tableContent += '"description": "' + element.description + '",';
            tableContent += '"url": "' + element.url + '",';
            tableContent += '"source_description": "' + element.source_description + '",';
            tableContent += '"created": "' + element.created + '",';
            tableContent += '"updated": "' + element.updated + '"';
			
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
                { data: 'id' },
                { data: 'object_id' },
				{ data: 'milestone_at' },
				{ data: 'milestone_code' },
                { data: 'description' },
                { data: 'url' },
                { data: 'source_description' },
                { data: 'created' },
                { data: 'updated' }

				// { data: 'fundingRounds'},

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