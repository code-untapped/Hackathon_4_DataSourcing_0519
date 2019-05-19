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
	url = server + 'peopleDataSource';
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
			tableContent += '"firstName": "' + element.first_name + '",';
			tableContent += '"lastName": "' + element.last_name + '",';
			tableContent += '"affiliation": "' + element.affiliation_name + '",';
			tableContent += '"birthplace": "' + element.birthplace + '"';
			// tableContent += '"fundingRounds": "funding"';
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
				{
					"render": function (data, type) {
						let ranNumber = Math.floor(Math.random() * 80) + 1;
						let menOrWomen = Math.floor(Math.random() * 2) + 1;
						
						ranNumber = ranNumber.toString();
						menOrWomen === 1 ? menOrWomen = 'women' : menOrWomen = 'men';		 
						
						return `<img src= 'https://randomuser.me/api/portraits/med/${menOrWomen}/${ranNumber}.jpg' >`;
					}
				},
				{ data: 'firstName' },
				{ data: 'lastName' },
				{ data: 'affiliation' },
				{ data: 'birthplace' }

				// { data: 'fundingRounds'},

			]
		} );
 
	}).fail ( function() {
		$('#dataRecords').html('<p> Records could not be loaded </p>');
	});
}

loadRecords(url);


function loadFundingRecords(url) {
	var version_no = new Date();
	//url = 'http://localhost:3000/fundingDataSource';
	url = server + 'fundingDataSource';
    url += '?login=' + login;
	url += '&version=' + version_no;
	$.getJSON( url )
	.done( function(data) {

		var size = data.length;
		//window.alert(size)
		//window.alert(JSON.stringify(data));

		tableContent = '[';
		$.each(data, function(index, element) {
			console.log('here', element)
			
			// name: "Fund VI"
			// object_id: "f:4032"
			// raised_amount: "1250000000"
			// raised_currency: "USD"

			tableContent += '{';
			tableContent += '"name": "' + element.name + '",';
			tableContent += '"raised_amount": "' + element.raised_amount + '",';
			tableContent += '"raised_currency": "' + element.raised_currency + '"';
			if ( index < size -1 ) {
				tableContent += '},';
			} else {
				tableContent += '}';
			}
		});
		tableContent += ']';
		var tableData = JSON.parse(tableContent);

		if ( $.fn.dataTable.isDataTable( '#fundingDataRecords' ) ) {
			table = $('#fundingDataRecords').DataTable();
			table.destroy();
		}

		$('#fundingDataRecords').DataTable( {
			data: tableData,
			autoWidth: false,
			//scrollY : '400px',
			//scrollCollapse: true,
			//paging: false,
			columns: [
				{ data: 'name' },
				{ data: 'raised_amount' },
				{ data: 'raised_currency' }
			]
		} );
 
	}).fail ( function() {
		$('#fundingDataRecords').html('<p> Records could not be loaded </p>');
	});
}

loadFundingRecords(url);


$newItemButton.on('click', function(e) {
    e.preventDefault();
    loadRecords(url);    
});

$fundingButton.on('click', function(e) {
    e.preventDefault();
    loadFundingRecords(url);    
});