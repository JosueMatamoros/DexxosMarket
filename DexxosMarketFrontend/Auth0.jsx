// Auth0
import { Auth0Provider } from '@auth0/auth0-react';

const auth0Config = {
    domain: 'dev-bkoy6hvnh3rrigrp.us.auth0.com',
    clientId: '78NcYqK2W0S37YbxKS65sgk0l8huxq7K',
    clientSecret: 'MfiyICwYrByyYg8LqXD4Z8oskuHvkkr5SUZOj1og4g1d3eHFW3rv9qc0cNygSRKE', // Corregido aquÃ­
    audience: 'https://dev-bkoy6hvnh3rrigrp.us.auth0.com/api/v2/',
    redirectUri: 'http://localhost:5173/login',
};

export default auth0Config;