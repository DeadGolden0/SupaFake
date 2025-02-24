require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const faker = require('faker');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const AMOUNT_OF_USERS = parseInt(process.env.AMOUNT_OF_USERS, 10);

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function createUsers(batchSize = AMOUNT_OF_USERS) {
    for (let i = 0; i < batchSize; i++) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const email = `${lastName.toLowerCase()}.${firstName.toLowerCase()}@example.com`;
        const password = faker.internet.password(12);

        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            user_metadata: {
                first_name: firstName,
                last_name: lastName
            }
        });

        if (error) {
            console.error(`Erreur lors de la création de ${email}:`, error.message);
        } else {
            console.log(`Utilisateur créé: ${email}`);
        }
    }
}

createUsers();
