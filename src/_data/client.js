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
        mapLink: "https://www.google.com/maps/place/Kaesberg+Chiropractic+Clinic+PC/@38.5123722,-89.9777572,16z/data=!4m15!1m8!3m7!1s0x887602ec14c2930b:0xd373cdd193eaa488!2s100+Mascoutah+Ave,+Belleville,+IL+62220!3b1!8m2!3d38.5123722!4d-89.9777572!16s%2Fg%2F11crs9vg0b!3m5!1s0x887602ec3ffc59bd:0x2133a8168820f7a0!8m2!3d38.5123754!4d-89.9777929!16s%2Fg%2F1tgcsn0f?entry=ttu&g_ep=EgoyMDI2MDYwOS4wIKXMDSoASAFQAw%3D%3D",
    },
    address2: {
        lineOne: "3131 State St.",
        lineTwo: "Second Address Line",
        city: "East St. Louis",
        state: "IL",
        zip: "62205",
        country: "US",
        mapLink: "https://www.google.com/maps/place/Kaesberg+Chiropractic+Clinic/@38.6130654,-90.1236139,17z/data=!4m15!1m8!3m7!1s0x87d8ad07d0faaaab:0x3b2e06827e7fd4ec!2s3131+State+St,+East+St+Louis,+IL+62205!3b1!8m2!3d38.6130654!4d-90.121039!16s%2Fg%2F11rg67q5k1!3m5!1s0x87d8ad07da03be61:0xce318600f56f7d4c!8m2!3d38.6130655!4d-90.121039!16s%2Fg%2F1vbl83j8?entry=ttu&g_ep=EgoyMDI2MDYwOS4wIKXMDSoASAFQAw%3D%3D",
    },
    socials: {
        facebook: "https://www.facebook.com/KaesbergChiropractic/",
    },
    //! Make sure you include the file protocol (e.g. https://) and that NO TRAILING SLASH is included
    domain: "https://www.americanspinecenter.com",
    // Passing the isProduction variable for use in HTML templates
    isProduction: process.env.ELEVENTY_ENV === "PROD",
};
