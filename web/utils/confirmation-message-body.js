import dotenv from 'dotenv';
import mainTheme from '../themes/main-theme';

const confirmationMessageBody = (user) => {
  const verificationURL = 'https://www.google.com';
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
            REGISTRATION SUCCESSFUL
        </h1>
        <p>
            Hello ${user.firstName},
        </p>
        <p>
            You have successfully created an account with <strong>${process.env.BRAND_NAME}</strong> using this email address. Your username is:
        </p>
        <p
            style="font-weight: bold"
            align="center"
        >
            ${user.username}
        </p>
        <p
            style="margin-bottom: 16px"
        >
            Although you may continue to sign into your account with the above username and your secret password, do consider signing up using your Google, Facebook, or Twitter accounts to make the sign-in process smoother.
        </p>
        <p align="left">
            Sincerely,
        </p>
        <p align="left">
            ${process.env.BRAND_NAME}
        </p>
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

export default confirmationMessageBody;
