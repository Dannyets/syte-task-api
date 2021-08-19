export const errorMiddleware = (error, req, res, next) => {
    return res.status(500).json({ error });
}