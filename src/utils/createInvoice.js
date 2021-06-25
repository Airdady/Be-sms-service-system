//Import the library into your project
var easyinvoice = require('easyinvoice');
var fs = require('fs');

var data = {
	//"documentTitle": "RECEIPT", //Defaults to INVOICE
	//"locale": "de-DE", //Defaults to en-US, used for number formatting (see docs)
	currency: 'USD', //See documentation 'Locales and Currency' for more info
	taxNotation: 'vat', //or gst
	marginTop: 25,
	marginRight: 25,
	marginLeft: 25,
	marginBottom: 25,
	logo: 'https://res.cloudinary.com/airdady/image/upload/v1623567281/logo_text_iefaom.svg', //or base64
	background: 'https://public.easyinvoice.cloud/img/watermark-draft.jpg', //or base64 //img or pdf
	sender: {
		company: 'Sample Corp',
		address: 'Sample Street 123',
		zip: '1234 AB',
		city: 'Sampletown',
		country: 'Samplecountry',
	},
	client: {
		company: 'Client Corp',
		address: 'Clientstreet 456',
		zip: '4567 CD',
		city: 'Clientcity',
		country: 'Clientcountry',
	},
	invoiceNumber: '2021.0001',
	invoiceDate: '1.1.2021',
	products: [
		{
			quantity: '2',
			description: 'Test1',
			tax: 6,
			price: 33.87,
		}
	],
	bottomNotice: 'Kindly pay your invoice within 15 days.',
	//Used for translating the headers to your preferred language
	//Defaults to English. Below example is translated to Dutch
	// "translate": {
	//     "invoiceNumber": "Factuurnummer",
	//     "invoiceDate": "Factuurdatum",
	//     "products": "Producten",
	//     "quantity": "Aantal",
	//     "price": "Prijs",
	//     "subtotal": "Subtotaal",
	//     "total": "Totaal"
	// }
};

//Create your invoice! Easy!
easyinvoice.createInvoice(data, async (result) => {
	//The response will contain a base64 encoded PDF file
	await fs.writeFileSync('invoice.pdf', result.pdf, 'base64');
	console.log(result.pdf);
});
