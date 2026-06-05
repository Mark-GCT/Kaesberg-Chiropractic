module.exports = {
    name: "Kaesberg Chiropractic",
    email: "kaesbergcc@yahoo.com",
    phoneForTel: "618-233-6824",
    phoneFormatted: "(618) 233-6824",
    phoneForTel2: "618-875-7246",
    phoneFormatted2: "(618) 875-7246",
    fax: "618-233-6825",
    faxFormatted: "(618) 233-6825",
    address: {
        lineOne: "100 Mascoutah Ave.",
        lineTwo: "Second Address Line",
        city: "Belleville",
        state: "IL",
        zip: "62221",
        country: "US",
        mapLink: "https://maps.app.goo.gl/AjdJpTF2tKgm12iJ9",
    },
    address2: {
        lineOne: "3131 State St.",
        lineTwo: "Second Address Line",
        city: "East St. Louis",
        state: "IL",
        zip: "62205",
        country: "US",
        mapLink: "https://maps.app.goo.gl/rxi6BsqqZEfwdeGE8",
    },
    socials: {
        facebook: "https://www.facebook.com/KaesbergChiropractic/",
    },
    //! Make sure you include the file protocol (e.g. https://) and that NO TRAILING SLASH is included
    domain: "https://www.americanspinecenter.com",
    // Passing the isProduction variable for use in HTML templates
    isProduction: process.env.ELEVENTY_ENV === "PROD",
};
