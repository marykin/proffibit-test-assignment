//casper.viewportSize = {width: 800, height: 600}
casper.test.begin('test1', 1, function (test) {
    casper.start('https://www.linkedin.com/', function () {
        casper.capture('screenshots/linkedin-' + (new Date()).getTime() + '-1.png');

        this.fillSelectors('form.login-form', {
            'input#login-email.login-email': 'marinka.mail777@gmail.com',
            'input#login-password.login-password': 'linkedinpassword'
        }, true);
    });

    casper.waitForSelector('.main-nav .nav-item:nth-child(2) a.nav-link', function () {
        test.assertTitle('Welcome! | LinkedIn');
        casper.capture('screenshots/linkedin-' + (new Date()).getTime() + '-2.png');
    });

    casper.then(function () {
        this.click('.main-nav .nav-item:nth-child(2) a.nav-link');
    });
    casper.then(function () {
            this.click('li:nth-child(1) .recommended-section-content + button');
            console.log("Clicking button #1");
        });

    casper.waitForSelector('.cancel', function () {
            casper.capture('screenshots/linkedin-' + (new Date()).getTime() + '-button-1.png');
            this.sendKeys('#li-dialog-aria-label', casper.page.event.key.Escape);
            console.log("Clicked button #1");
        });
    casper.waitForSelector('.recommended-section-content + button', function () {
        var numberOfButtons = casper.evaluate(function () {
            return document.querySelectorAll('.recommended-section-content + button').length + 1;
        });

        

        console.log("Number of buttons:");
        console.log(numberOfButtons);

        for (var i = 2; i < numberOfButtons; i++) {
            var f = function (n) {
                return function () {

                    console.log("Clicking button #" + n);
                    casper.click('li:nth-child(' + n + ') .recommended-section-content + button');

                    console.log("Clicked button #" + n);
                    casper.capture('screenshots/linkedin-' + (new Date()).getTime() + '-button-' + n + '.png');
                };
            };

            casper.then(f(i));
        }

        
    });
    casper.then(function (){
            console.log("Clicking button #21");
            this.click('#background-experience-container>div:nth-child(1)>div.entity-container + button');
            casper.capture('screenshots/linkedin-' + (new Date()).getTime() + '-button-21.png');
            console.log("Clicked button #21");
        })
    casper.run(function () {
        test.done();
    });
});