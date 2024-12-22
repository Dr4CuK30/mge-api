import { DataSource } from 'typeorm';

export const dataSourceFactory = async (options) => {
  try {
    const dataSource = await new DataSource(options).initialize();
    console.log('Database connection established');
    return dataSource;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
