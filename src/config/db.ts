import { createConnection } from 'typeorm';

export const dbConnect = async () => {
    await createConnection();
    console.log('db connected');
};
