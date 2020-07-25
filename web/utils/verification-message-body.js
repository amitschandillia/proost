import dotenv from 'dotenv';
import mainTheme from '../themes/main-theme';

const verificationMessageBody = (verificationURL) => {
  return (`
    <div
        style="background: ${mainTheme.palette.email.background};
            border: 1px solid ${mainTheme.palette.email.text};
            color:${mainTheme.palette.email.text};
            font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif;
            font-size: 16px;
            line-height: 1.2;
            padding: 30px;
            max-width: 100%"
    >
        <div
            style="text-align: center;
                margin-top: -20px"
        >
            <a
                target="_blank"
                href="${process.env.BASE_URL}"
            >
                <img
                    src="${process.env.BASE_URL}/_f/brand/favicons/android-chrome-192x192.png"
                    alt="${process.env.BRAND_NAME} logo"
                    width="100"
                    height="100"
                />
            </a>
        </div>
        <hr
            style="margin: 32px 0"
        />
        <h1
            style="text-align: center;
                font-weight: 500;
                line-height: 1.2;
                word-break: break-word;
                font-size: 48px;
                mso-line-height-alt: 60px"
        >
            EMAIL VERIFICATION
        </h1>
        <p>
            You've received this message because your email address has been submitted for registration with <strong>${process.env.BRAND_NAME}</strong>. Please confirm your participation and verify yourself by clicking below:
        </p>
        <div
            style="padding: 16px"
            align="center"
        >
            <a
                href="${verificationURL}"
                target="_blank"
                style="-webkit-text-size-adjust: none;
                display: inline-block;
                color: #ffffff;
                background-color: ${mainTheme.palette.email.text};
                border-radius: 4px;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border: 1px solid ${mainTheme.palette.email.text};
                padding: 5px;
                text-align: center;
                mso-border-alt: none;
                word-break: keep-all;
                text-decoration: none"
            >
                <span
                    style="padding-left: 20px;
                        padding-right: 20px;
                        display: inline-block;
                        line-height: 2;
                        mso-line-height-alt: 32px"
                >
                    CLICK TO VERIFY
                </span>
            </a>
        </div>
        <p
            style="margin-bottom: 16px"
        >
            Should clicking the above not work for you, please follow this link:
        </p>
        <p align="left">
            <a
                href="${verificationURL}"
            >
                ${verificationURL}
            </a>
        </p>
        <sub
            style="line-height: 0"
        >
            If it wasn't you who submitted this email address or if you did it by mistake, we apologize. Just ignore this message and do not click above. You won't receive any further communication from us.
        </sub>
    </div>
    <div
        style="background: ${mainTheme.palette.email.text};
            border: 1px solid ${mainTheme.palette.email.text};
            color:${mainTheme.palette.email.background};
            font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif;
            font-size: 16px;
            line-height: 1.2;
            padding: 30px;
            max-width: 100%"
    >
        <h2
            style="font-size: 16px;
                text-align: center"
        >
            STAY CONNECTED
        </h2>
        <div
            style="text-align: center"
        >
            <span>
                <a
                    href="https://www.facebook.com/${process.env.FACEBOOK_NAME}"
                    target="_blank"
                >
                    <img
                        src="${process.env.BASE_URL}/_f/images/email/facebook.png"
                        alt="${process.env.BRAND_NAME} on Facebook"
                        width="64"
                        height="64"
                    />
                </a>
            </span>
            <span
                style="margin: 0 10px"
            ></span>
            <span>
                <a
                    href="https://www.twitter.com/${process.env.TWITTER_NAME}"
                    target="_blank"
                >
                    <img
                        src="${process.env.BASE_URL}/_f/images/email/twitter.png"
                        alt="${process.env.BRAND_NAME} on Twitter"
                        width="64"
                        height="64"
                    />
                </a>
            </span>
        </div>
        <div
            style="text-align: center;
                margin-top: 64px"
        >
            <p>
                You can read our privacy policy
                <a
                    target="_blank"
                    href="${process.env.BASE_URL}/privacy"
                    style="color: ${mainTheme.palette.email.background}"
                >here</a>.
            </p>
        </div>
        <div
            style="text-align: center;
                margin-top: -8px;"
        >
            <sub
                style="line-height: 0"
            >
                © 2019-${new Date().getFullYear()}
                <a
                    target="_blank"
                    href="${process.env.BASE_URL}"
                    style="color: ${mainTheme.palette.email.background}"
                >${process.env.BRAND_NAME}</a>. All rights reserved.
            </sub>
        </div>
    </div>
  `);
};

export default verificationMessageBody;
