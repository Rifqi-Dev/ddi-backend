import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";

const authRoutes = new Elysia({ prefix: "/auth" })
  .use(
    jwt({
      name: "jwt",
      secret: "verysecretkey",
      exp: "1d",
    })
  ).post('/', async ({ set, body, jwt }) => {
    const { username, password } = body

    const userLogin = {
      username: "administrator",
      role: "SA",
      password: '$2b$10$QOG29o8l1PRbLs5KZ6Lo9uLFZtqxsFwbQwZFm7V60IuhMm88pgbrK' //administrator
    }

    if (username !== userLogin.username) {
      set.status = 404
      return {
        message: "User not found"
      }
    }

    if (!await Bun.password.verifySync(password, userLogin.password)) {
      set.status = 400
      return {
        message: "Invalid password"
      }
    }

    const token = await jwt.sign({
      username: userLogin.username,
      role: userLogin.role
    })


    return {
      message: "Login Success",
      token: token
    }
  }, {
    body: t.Object({
      username: t.String(),
      password: t.String()
    }),
    response: {
      200: t.Object({
        message: t.String(),
        token: t.String()
      }),
      400: t.Object({
        message: t.String(),

      }),
      404: t.Object({
        message: t.String(),

      }),
      500: t.Object({
        message: t.String(),

      }),
    }
  })

export default authRoutes;