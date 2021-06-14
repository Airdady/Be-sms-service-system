const layout = (title, template) => `<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <style type="text/css">
        .ReadMsgBody {
            width: 100%;
            background-color: #ffffff;
        }

        .ExternalClass {
            width: 100%;
            background-color: #ffffff;
        }

        body {
            width: 100%;
            background-color: #E5E5E5;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            font-family: Helvetica Light, Helvetica, Arial, sans-serif;
            -webkit-text-size-adjust: none !important;
        }

        table {
            border-collapse: separate;
        }

        .btnx {
            display: inline-block;
            font-weight: 400;
            cursor: pointer;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            border: 1px solid transparent;
            padding: .375rem .75rem;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: .25rem;
            color: #fff;
            background-color: #002145;
            border-color: #002145;
            margin-top: .75rem;
            margin-bottom: 1.35rem;
            transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        }

        .mail-body {
            margin: 0 !important;
            padding: 0 !important;
        }


        /* MOBILE STYLES */
        @media screen and (max-width: 525px) {

            /* ALLOWS FOR FLUID TABLES */
            .wrapper {
                width: 100% !important;
                max-width: 100% !important;
            }

            /* ADJUSTS LAYOUT OF LOGO IMAGE */
            .logo img {
                margin: 0 auto !important;
            }

            /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */
            .mobile-hide {
                display: none !important;
            }

            .img-max {
                max-width: 100% !important;
                width: 100% !important;
                height: auto !important;
            }

            /* FULL-WIDTH TABLES */
            .responsive-table {
                width: 100% !important;
            }

            /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */
            .padding {
                padding: 0px 5% 0px 5% !important;
            }

            .padding-meta {
                padding: 30px 5% 0px 5% !important;
                text-align: center;
            }

            .no-padding {
                padding: 0 !important;
            }

            .section-padding {
                padding: 0px 15px 0px 15px !important;
            }

            /* ADJUST BUTTONS ON MOBILE */
            .mobile-button-container {
                margin: 0 auto;
                width: 100% !important;
            }

            .mobile-button {
                padding: 15px !important;
                border: 0 !important;
                font-size: 16px !important;
                display: block !important;
            }
        }

        table,
        td,
        b,
        a,
        strong,
        p,
        div {
            font-family: 'Helvetica Neue', Arial, 'sans-serif';
        }

        td.ctt {
            font: 16px/22px 'Helvetica Neue', Arial, 'sans-serif';
            text-align: left;
            padding: 50px 40px 0px 40px;
            color: #555555;
        }

        a {
            color: #1DBF73;
            text-decoration: none;
        }

        /* ANDROID CENTER FIX */
        div[style*="margin: 16px 0;"] {
            margin: 0 !important;
        }

        a.airdady-social-icon {
            display: inline-block;
            margin: 2px 5px;
        }

        .xtr {
            font: 16px/22px 'Helvetica Neue', Arial, 'sans-serif';
            text-align: left;
            color: #555555;
            padding: 40px 40px 0px 40px;
        }

        #ctn {
            padding-bottom: 10px;
            font-size: 16px;
            color: #62646A;
            line-height: 24px;
            font-family: 'proxima-nova', sans-serif;
        }

        #tm {
            font-weight: 500;
            color: #222325
        }

        #e-title {
            font-size: 18px;
            color: #0e0e0f;
            font-weight: 700;
            font-family: Helvetica Neue;
            line-height: 28px;
            vertical-align: top;
            text-align: center;
            padding: 35px 40px 0px 40px;
        }

        #logo {
            padding: 40px 40px 0px 40px;
        }
    </style>
</head>

<body class="mail-body">
    <table cellpadding="0" cellspacing="0" style="background-color:#e4ebf1;min-width:413px;min-width:320px"
        width="100%">
        <tbody>
            <tr>

                <td valign="top"
                    style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:14px;line-height:18px">
                    <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                            <tr>
                                <td bgcolor="#002145" height="150"
                                    style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:14px;line-height:18px">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>

                <td width="600"
                    style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:14px;line-height:18px">
                    <table align="center" cellpadding="0" cellspacing="0"
                        style="width:100%;max-width:600px;margin:0 auto" width="600">
                        <tbody>
                            <tr>
                                <td align="center" bgcolor="#002145"
                                    style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:14px;line-height:18px;padding:20px 15px 24px">
                                    <a href="#"
                                        style="font-family:Helvetica,Arial,Helvetica,sans-serif;font-size:14px;line-height:18px;font-weight:bold;color:#002145;text-decoration:none"
                                        target="_blank"
                                        >
                                        <img alt="Cloudinary Logo"
                                            src="https://user-images.githubusercontent.com/41104288/121805974-5ded0400-cc56-11eb-873f-cb167c010f97.png"
                                            width="150" class="CToWUd">
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td style="background: white;">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td align="center" id="e-title">
                                                <strong>${title}</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="1" style="padding:10px 10px 5px;">
                                                <p style="border-top:1px solid #e4e4e4;"></p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
    ${template}
    <tr>
    <td
        style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:14px;line-height:18px;padding:32px 40px">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td align="center"
                        style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:14px;line-height:18px;padding:0 0 10px;font:500 12px/17px Arial,Helvetica,sans-serif,Fira;color:#a7afb3">
                        © 2021 Airdady. All rights reserved.
                    </td>
                </tr>
                <tr>
                    <td align="center"
                        style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:14px;line-height:18px;font:500 12px/17px Arial,Helvetica,sans-serif,Fira;color:#002145">
                        <a href="#"
                            style="font-family:Helvetica,Arial,Helvetica,sans-serif;font-size:14px;line-height:18px;font-weight:bold;color:#002145;color:#002145;text-decoration:underline"
                            target="_blank"
                            >Contact
                            Us</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </td>
</tr>
</tbody>
</table>
</td>

<td valign="top"
style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:14px;line-height:18px">
<table cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
    <td bgcolor="#002145" height="150"
        style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:14px;line-height:18px">
    </td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</body>

</html>`;

export default layout;
