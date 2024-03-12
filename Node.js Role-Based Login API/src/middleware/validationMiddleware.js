import { z } from "zod";

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    username: z.string(),
    role: z.string().refine((role) => role === 'user' || role === 'admin', {
      message: 'Role must be either "user" or "admin"',
    }),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const validateRegistration = (req, res, next) => {
  try {
    registerSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

export const validateLogin = (req, res, next) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};
