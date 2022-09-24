import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'

export default withIronSessionApiRoute(
    async function loginRoute(req, res) {
        if (!req.body.login) throw new Error("Please provide login")
        if (!req.body.password) throw new Error("Plase provide password")
        
        // Check login and password
        if (req.body.login !== process.env.ADMIN_LOGIN) throw new Error("Login or password is incorrect")
        if (req.body.password !== process.env.ADMIN_PASSWORD) throw new Error("Login or password is incorrect")

        // Authorize user
        req.session.user = {
            isAdmin: true,
        };
        await req.session.save();
        res.send({ ok: true });
    }, sessionOptions
);
