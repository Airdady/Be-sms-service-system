import layout from './layout';
import Auth from '../../features/auth/auth.util';

const accountActivation = (user, req) => `
<tr>
  <td style="background: white;padding:1.5rem;">
      <span id="ctn">
          <p> Hi ${user.username},</p>
          <p style="font-weight: 300;">
              You've successfully created a Airdady account. To activate it, please
              click below to verify your email address.
          </p>
          <div style="display:flex;justify-content: center;">
              <a class="btnx" style="margin-left:auto;margin-right:auto;color:white" href="${req.protocol}://${req.headers.host}/auth/users/confirm/${Auth.createToken({ email: user.email })}"
                  target="_blank">Activate Account</a>
          </div>
          <p>Thanks,
              <br>
              <span id="tm">The Airdady Team</span>
          </p>
      </span>
  </td>
</tr>
`;

const passwordReset = (user, req) => {
	const resetLink = `${req.protocol}://${req.headers.host}/auth/password_reset/${Auth.createToken({ email: user.email })}`;
	return `
  <tr>
    <td style="background: white;padding:1.5rem;">
        <span id="ctn">
            <p> Hi ${user.username},</p>
            <p style="font-weight: 300;">
            To set up a new password to your Airdady account, click "Reset Your Password" below, or use this link:
            </p>
            <a href="${resetLink}" style="font-weight: 300;">
            ${resetLink}
            </a>
            <p style="font-weight: 300;">
            The link will expire in 24 hours. If nothing happens after clicking, copy, and paste the link in your browser.
            </p>
            <div style="display:flex;justify-content: center;">
                <a class="btnx" style="margin-left:auto;margin-right:auto;color:white" href="${resetLink}"
                    target="_blank">Activate Account</a>
            </div>
            <p>Thanks,
                <br>
                <span id="tm">The Airdady Team</span>
            </p>
        </span>
    </td>
  </tr>
`;
};

export default {
	accountActivation: (user, req) => layout('Welcome to Airdady', accountActivation(user, req)),
	passwordReset: (user, req) => layout('Reset Password Instructions', passwordReset(user, req)),
};
