import argon2 from 'argon2';
import dotenv from 'dotenv';

dotenv.config();

const argonConfigs = {
  type: argon2.argon2id,
  memoryCost: 2 ** process.env.ARGON_MEMORY_COST_EXPONENT,
  timeCost: process.env.ARGON_TIME_COST,
  parallelism: process.env.ARGON_PARALLELISM,
  hashLength: process.env.ARGON_HASH_LENGTH,
};

export default argonConfigs;
