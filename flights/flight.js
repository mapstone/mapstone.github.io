
var PLACES_SHORT = {
	"HKG":"Hong Kong Intl",
	"IST":"Istanbul",
	"PDX":"Portland"
}


var PLACES_SHORT2 = {
	"SFO":"San Francisco International",
	"SIN":"Singapore Changi",
	"SLC":"Salt Lake City",
	"TPE":"Taipei Taiwan Taoyuan",
	"YVR":"Vancouver International",
	"ZRH":"Zurich",
	"CDG":"Paris Charles de Gaulle",
	"HND":"Tokyo Haneda",
	"ICN":"Seoul Incheon Int'l"
}

var TOP30 = {
	"ATL":"Atlanta",
	"PEK":"Beijing",
	"DXB":"Dubai",
	"LAX":"Los Angeles",
	"HND":"Tokyo",
	"ORD":"Chicago",
	"LHR":"London",
	"HKG":"Hong Kong",
	"PVG":"Shanghai",
	"CDG":"Paris",
	"AMS":"Amsterdam",
	"DEL":"Delhi",
	"CAN":"Guangzhou",
	"FRA":"Frankfurt",
	"DFW":"Dallas",
	"ICN":"Seoul",
	"IST":"Istanbul",
	"CGK":"Jakarta",
	"SIN":"Singapore",
	"DEN":"Denver",
	"BKK":"Bangkok",
	"JFK":"New York",
	"KUL":"Kuala Lumpur",
	"MAD":"Madrid",
	"SFO":"San Francisco",
	"CTU":"Chengdu",
	"BCN":"Barcelona",
	"BOM":"Mumbai",
	"SEA":"Seattle",
	"LAS":"Las Vegas"
}

var PLACES = {
"BOM":"Mumbai",
"ADD":"Addis Ababa",
"AMS":"Amsterdam",
"AUH":"Abu Dhabi International",
"BKK":"Bangkok Suvarnabhumi",
"BOS":"Boston Logan International",
"CAN":"Guangzhou",
"SHA":"Shanghai",
"TAO":"Qingdao",
"WUH":"Wuhan",
"DFW":"Dallas Fort Worth International",
"DOH":"Hamad International",
"DUB":"Dublin",
"DXB":"Dubai",
"HAN":"Hanoi",
"HKG":"Hong Kong Intl",
"IST":"Istanbul",
"KUL":"Kuala Lumpur International",
"LAX":"Los Angeles International",
"MNL":"Manila Ninoy Aquino",
"PEN":"Penang",
"SEA":"Seattle / Tacoma International",
"SFO":"San Francisco International",
"SIN":"Singapore Changi",
"SLC":"Salt Lake City",
"TPE":"Taipei Taiwan Taoyuan",
"YVR":"Vancouver International",
"ZRH":"Zurich",
"CDG":"Paris Charles de Gaulle",
"HND":"Tokyo Haneda",
"IAD":"Washington Dulles",
"ICN":"Seoul Incheon Int'l",
"JFK":"New York John F. Kennedy",
"KIX":"Osaka Kansai International",
"LHR":"London Heathrow",
"NRT":"Tokyo Narita",
"ORD":"Chicago O'Hare International",
"PEK":"Beijing Capital",
"PVG":"Shanghai Pu Dong",
"LIS":"Lisbon",
"PDX":"Portland",
"MAN":"Manchester",
"BCN":"Barcelona",
"YYC":"Calgary",
"VIE":"Vienna",
"YYZ":"Toronto Pearson International",
"MAD":"Madrid",
"MUC":"Munich",
"DEN":"Denver",
"HEL":"Helsinki",
"ARN":"Stockholm Arlanda",
"OSL":"Oslo",
"FRA":"Frankfurt am Main",
"LAS":"Las Vegas Mccarran",
"CLT":"Charlotte Douglas",
"ATL":"Atlanta Hartsfield-Jackson",
"MEX":"Mexico City",
"CMN":"Casablanca Mohamed V.",
"MXP":"Milan Malpensa",
"WAW":"Warsaw",
"BRU":"Brussels",
"DUS":"Dusseldorf International",
"DAL":"Dallas Love Field",
"KEF":"Reykjavik Keflavik",
"EWR":"New York Newark",
"BHX":"Birmingham",
"CPH":"Copenhagen",
"MIA":"Miami",
"OPO":"Porto",
"YUL":"Montreal Pierre Elliott Trudeau",
"SAW":"Istanbul Sabiha",
"FCO":"Rome Fiumicino",
"LGW":"London Gatwick",
"ORY":"Paris Orly",
"GDL":"Guadalajara",
"SVO":"Moscow Sheremetyevo",
"MSP":"Minneapolis",
"DTW":"Detroit Wayne County",
"SAN":"San Diego International",
"BWN":"Bandar Seri Begawan",
"DEL":"New Delhi",
"SUB":"Surabaya",
"AMM":"Amman Queen Alia",
"CGK":"Soekarno-Hatta",
}

function sortMap(map) {
    var sortable = [];
		for (var key in map) {
		    sortable.push([key, map[key]]);
		}

		sortable.sort(function(a, b) {
		    return a[1] - b[1];
		});
		return sortable
}

function sleep(time) {

    var start = new Date();
    var now;

    while (true) {
        now = new Date();
        if (now - start >= time) {
            break;
        }
    }
}

function exampleRequest() {
	var request = {
		"inboundDate": {},
		"cabinClass": 'economy',
		"children": 0,
		"infants": 0,
		"country": 'US',
		"currency": 'USD',
		"locale": 'en-US',
		"originPlace": 'SFO-sky',
		"destinationPlace": 'LHR-sky',
		"outboundDate": '2019-10-01',
		"adults": 1
	}
	makeFlightRequest(request, flightResponse)
}

function strToMap(str) {
	var map = {}
	var lines = str.split('\n')
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i]
		var splitLoc = line.indexOf(':')
		if(splitLoc == -1) continue
		var key = line.substring(0, splitLoc).trim()
		var value = line.substring(splitLoc + 1).trim()
		map[key] = value
	}
	return map
}

function getSkyScannerKey(details) {
	var headersStr = details.getAllResponseHeaders()
	var headersMap = strToMap(headersStr)
	var location = headersMap['location']
	var parts = location.split('/')
	return parts[parts.length - 1]
}

function makeFlightRequest(requestData, onDone) {
	var connectSettings = {
		"async": true,
		"crossDomain": true,
		"url": "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0",
		"method": "POST",
		"headers": {
			"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
			"x-rapidapi-key": "127ed445famsh1ce584fe128e132p11afafjsna54927726153",
			"content-type": "application/x-www-form-urlencoded"
		},
		"data": requestData
	}

	$.ajax(connectSettings)
	.done(function (_p1, _p2, details) {
		var key = getSkyScannerKey(details)
		// console.log('session key', key)
		var url = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/${key}`
		var getSettings = {
			"async": true,
			"crossDomain": true,
			"url": url,
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
				"x-rapidapi-key": "127ed445famsh1ce584fe128e132p11afafjsna54927726153"
			}
		}

		$.ajax(getSettings)
		.done(function (response) {
			onDone(response)
		})	
		.fail(function(xhr, err) {
			console.log('fail on get query...')
		})
	})
	.fail(function(xhr, err) {
		var whatWentWrong = xhr['responseJSON']['ValidationErrors'][0]['Message']
		console.log(requestData['destinationPlace'])
		console.log(whatWentWrong)
	})
}