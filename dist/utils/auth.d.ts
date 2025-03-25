export declare const auth: {
    handler: (request: Request) => Promise<Response>;
    api: import("better-auth").InferAPI<{
        ok: {
            <C extends [({
                body?: undefined;
                method?: "GET" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            } | undefined)?]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    ok: boolean;
                };
            } : {
                ok: boolean;
            }>;
            options: {
                method: "GET";
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                ok: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                    isAction: false;
                };
            } & {
                use: any[];
            };
            path: "/ok";
        };
        error: {
            <C extends [({
                body?: undefined;
                method?: "GET" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            } | undefined)?]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: Response;
            } : Response>;
            options: {
                method: "GET";
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "text/html": {
                                        schema: {
                                            type: "string";
                                        };
                                    };
                                };
                            };
                        };
                    };
                    isAction: false;
                };
            } & {
                use: any[];
            };
            path: "/error";
        };
        signInSocial: {
            <C extends [{
                body: {
                    provider: "apple" | "discord" | "facebook" | "github" | "google" | "microsoft" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "vk";
                    scopes?: string[] | undefined;
                    idToken?: {
                        token: string;
                        accessToken?: string | undefined;
                        refreshToken?: string | undefined;
                        expiresAt?: number | undefined;
                        nonce?: string | undefined;
                    } | undefined;
                    callbackURL?: string | undefined;
                    requestSignUp?: boolean | undefined;
                    errorCallbackURL?: string | undefined;
                    newUserCallbackURL?: string | undefined;
                    disableRedirect?: boolean | undefined;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    redirect: boolean;
                    token: string;
                    url: undefined;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                } | {
                    url: string;
                    redirect: boolean;
                };
            } : {
                redirect: boolean;
                token: string;
                url: undefined;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } | {
                url: string;
                redirect: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    newUserCallbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    errorCallbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    provider: import("better-auth").ZodEnum<["github", ...("apple" | "discord" | "facebook" | "github" | "google" | "microsoft" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "vk")[]]>;
                    disableRedirect: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                    idToken: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                        token: import("better-auth").ZodString;
                        nonce: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        accessToken: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        refreshToken: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        expiresAt: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                    }, "strip", import("better-auth").ZodTypeAny, {
                        token: string;
                        accessToken?: string | undefined;
                        refreshToken?: string | undefined;
                        expiresAt?: number | undefined;
                        nonce?: string | undefined;
                    }, {
                        token: string;
                        accessToken?: string | undefined;
                        refreshToken?: string | undefined;
                        expiresAt?: number | undefined;
                        nonce?: string | undefined;
                    }>>;
                    scopes: import("better-auth").ZodOptional<import("better-auth").ZodArray<import("better-auth").ZodString, "many">>;
                    requestSignUp: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    provider: "apple" | "discord" | "facebook" | "github" | "google" | "microsoft" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "vk";
                    scopes?: string[] | undefined;
                    idToken?: {
                        token: string;
                        accessToken?: string | undefined;
                        refreshToken?: string | undefined;
                        expiresAt?: number | undefined;
                        nonce?: string | undefined;
                    } | undefined;
                    callbackURL?: string | undefined;
                    requestSignUp?: boolean | undefined;
                    errorCallbackURL?: string | undefined;
                    newUserCallbackURL?: string | undefined;
                    disableRedirect?: boolean | undefined;
                }, {
                    provider: "apple" | "discord" | "facebook" | "github" | "google" | "microsoft" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "vk";
                    scopes?: string[] | undefined;
                    idToken?: {
                        token: string;
                        accessToken?: string | undefined;
                        refreshToken?: string | undefined;
                        expiresAt?: number | undefined;
                        nonce?: string | undefined;
                    } | undefined;
                    callbackURL?: string | undefined;
                    requestSignUp?: boolean | undefined;
                    errorCallbackURL?: string | undefined;
                    newUserCallbackURL?: string | undefined;
                    disableRedirect?: boolean | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                session: {
                                                    type: string;
                                                };
                                                user: {
                                                    type: string;
                                                };
                                                url: {
                                                    type: string;
                                                };
                                                redirect: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-in/social";
        };
        callbackOAuth: {
            <C extends [{
                method: "GET" | "POST";
                params: {
                    id: string;
                };
                body?: {
                    state?: string | undefined;
                    code?: string | undefined;
                    device_id?: string | undefined;
                    error?: string | undefined;
                    error_description?: string | undefined;
                } | undefined;
                query?: {
                    state?: string | undefined;
                    code?: string | undefined;
                    device_id?: string | undefined;
                    error?: string | undefined;
                    error_description?: string | undefined;
                } | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: void;
            } : void>;
            options: {
                method: ("GET" | "POST")[];
                body: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                    code: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    error: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    device_id: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    error_description: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    state: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    state?: string | undefined;
                    code?: string | undefined;
                    device_id?: string | undefined;
                    error?: string | undefined;
                    error_description?: string | undefined;
                }, {
                    state?: string | undefined;
                    code?: string | undefined;
                    device_id?: string | undefined;
                    error?: string | undefined;
                    error_description?: string | undefined;
                }>>;
                query: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                    code: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    error: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    device_id: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    error_description: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    state: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    state?: string | undefined;
                    code?: string | undefined;
                    device_id?: string | undefined;
                    error?: string | undefined;
                    error_description?: string | undefined;
                }, {
                    state?: string | undefined;
                    code?: string | undefined;
                    device_id?: string | undefined;
                    error?: string | undefined;
                    error_description?: string | undefined;
                }>>;
                metadata: {
                    isAction: false;
                };
            } & {
                use: any[];
            };
            path: "/callback/:id";
        };
        getSession: {
            <C extends [{
                headers: HeadersInit;
                body?: undefined;
                method?: "GET" | undefined;
                query?: {
                    disableCookieCache?: string | boolean | undefined;
                    disableRefresh?: string | boolean | undefined;
                } | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    session: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined | undefined;
                        userAgent?: string | null | undefined | undefined;
                    } & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined | undefined;
                        userAgent?: string | null | undefined | undefined;
                        impersonatedBy?: string | null | undefined;
                    };
                    user: {
                        id: string;
                        name: string;
                        email: string;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                        image?: string | null | undefined | undefined;
                        vehicles?: string[] | null | undefined;
                        deliveries?: string[] | null | undefined;
                    } & {
                        id: string;
                        name: string;
                        email: string;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                        image?: string | null | undefined | undefined;
                        phoneNumber?: string | null | undefined;
                        phoneNumberVerified?: boolean | null | undefined;
                        vehicles?: string[] | null | undefined;
                        deliveries?: string[] | null | undefined;
                    } & {
                        id: string;
                        name: string;
                        email: string;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                        image?: string | null | undefined | undefined;
                        banned: boolean | null | undefined;
                        role?: string | null | undefined;
                        banExpires?: Date | null | undefined;
                        banReason?: string | null | undefined;
                        vehicles?: string[] | null | undefined;
                        deliveries?: string[] | null | undefined;
                    };
                } | null;
            } : {
                session: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined | undefined;
                    userAgent?: string | null | undefined | undefined;
                } & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined | undefined;
                    userAgent?: string | null | undefined | undefined;
                    impersonatedBy?: string | null | undefined;
                };
                user: {
                    id: string;
                    name: string;
                    email: string;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    image?: string | null | undefined | undefined;
                    vehicles?: string[] | null | undefined;
                    deliveries?: string[] | null | undefined;
                } & {
                    id: string;
                    name: string;
                    email: string;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    image?: string | null | undefined | undefined;
                    phoneNumber?: string | null | undefined;
                    phoneNumberVerified?: boolean | null | undefined;
                    vehicles?: string[] | null | undefined;
                    deliveries?: string[] | null | undefined;
                } & {
                    id: string;
                    name: string;
                    email: string;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    image?: string | null | undefined | undefined;
                    banned: boolean | null | undefined;
                    role?: string | null | undefined;
                    banExpires?: Date | null | undefined;
                    banReason?: string | null | undefined;
                    vehicles?: string[] | null | undefined;
                    deliveries?: string[] | null | undefined;
                };
            } | null>;
            options: {
                method: "GET";
                query: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                    disableCookieCache: import("better-auth").ZodOptional<import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodBoolean, import("better-auth").ZodEffects<import("better-auth").ZodString, boolean, string>]>>>;
                    disableRefresh: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodBoolean, import("better-auth").ZodEffects<import("better-auth").ZodString, boolean, string>]>>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    disableCookieCache?: boolean | undefined;
                    disableRefresh?: boolean | undefined;
                }, {
                    disableCookieCache?: string | boolean | undefined;
                    disableRefresh?: string | boolean | undefined;
                }>>;
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                session: {
                                                    type: string;
                                                    properties: {
                                                        token: {
                                                            type: string;
                                                        };
                                                        userId: {
                                                            type: string;
                                                        };
                                                        expiresAt: {
                                                            type: string;
                                                        };
                                                    };
                                                };
                                                user: {
                                                    type: string;
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/get-session";
        };
        signOut: {
            <C extends [{
                headers: HeadersInit;
                body?: undefined;
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    success: boolean;
                };
            } : {
                success: boolean;
            }>;
            options: {
                method: "POST";
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-out";
        };
        signUpEmail: {
            <C extends [{
                body: ({
                    name: string;
                    email: string;
                    password: string;
                } & ({} | ({} & {
                    phoneNumber?: string | null | undefined;
                }) | ({} & {}))) & {} & {
                    vehicles?: string[] | null | undefined;
                    deliveries?: string[] | null | undefined;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    token: null;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                } | {
                    token: string;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                };
            } : {
                token: null;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } | {
                token: string;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodAny>;
                metadata: {
                    $Infer: {
                        body: ({
                            name: string;
                            email: string;
                            password: string;
                        } & ({} | ({} & {
                            phoneNumber?: string | null | undefined;
                        }) | ({} & {}))) & {} & {
                            vehicles?: string[] | null | undefined;
                            deliveries?: string[] | null | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            email: {
                                                type: string;
                                                description: string;
                                            };
                                            password: {
                                                type: string;
                                                description: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                email: {
                                                    type: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                image: {
                                                    type: string;
                                                    description: string;
                                                };
                                                emailVerified: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-up/email";
        };
        signInEmail: {
            <C extends [{
                body: {
                    password: string;
                    email: string;
                    callbackURL?: string | undefined;
                    rememberMe?: boolean | undefined;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    redirect: boolean;
                    token: string;
                    url: string | undefined;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                };
            } : {
                redirect: boolean;
                token: string;
                url: string | undefined;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    email: import("better-auth").ZodString;
                    password: import("better-auth").ZodString;
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    rememberMe: import("better-auth").ZodOptional<import("better-auth").ZodDefault<import("better-auth").ZodBoolean>>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    password: string;
                    email: string;
                    callbackURL?: string | undefined;
                    rememberMe?: boolean | undefined;
                }, {
                    password: string;
                    email: string;
                    callbackURL?: string | undefined;
                    rememberMe?: boolean | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    type: string;
                                                };
                                                url: {
                                                    type: string;
                                                };
                                                redirect: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-in/email";
        };
        forgetPassword: {
            <C extends [{
                body: {
                    email: string;
                    redirectTo?: string | undefined;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    email: import("better-auth").ZodString;
                    redirectTo: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    email: string;
                    redirectTo?: string | undefined;
                }, {
                    email: string;
                    redirectTo?: string | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/forget-password";
        };
        resetPassword: {
            <C extends [{
                body: {
                    newPassword: string;
                    token?: string | undefined;
                };
                method?: "POST" | undefined;
                query?: {
                    token?: string | undefined;
                } | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                query: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                    token: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    token?: string | undefined;
                }, {
                    token?: string | undefined;
                }>>;
                body: import("better-auth").ZodObject<{
                    newPassword: import("better-auth").ZodString;
                    token: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    newPassword: string;
                    token?: string | undefined;
                }, {
                    newPassword: string;
                    token?: string | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/reset-password";
        };
        verifyEmail: {
            <C extends [{
                query: {
                    token: string;
                    callbackURL?: string | undefined;
                };
                body?: undefined;
                method?: "GET" | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: void | {
                    status: boolean;
                    user: {
                        id: any;
                        email: any;
                        name: any;
                        image: any;
                        emailVerified: any;
                        createdAt: any;
                        updatedAt: any;
                    };
                } | {
                    status: boolean;
                    user: null;
                };
            } : void | {
                status: boolean;
                user: {
                    id: any;
                    email: any;
                    name: any;
                    image: any;
                    emailVerified: any;
                    createdAt: any;
                    updatedAt: any;
                };
            } | {
                status: boolean;
                user: null;
            }>;
            options: {
                method: "GET";
                query: import("better-auth").ZodObject<{
                    token: import("better-auth").ZodString;
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    token: string;
                    callbackURL?: string | undefined;
                }, {
                    token: string;
                    callbackURL?: string | undefined;
                }>;
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<void>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/verify-email";
        };
        sendVerificationEmail: {
            <C extends [{
                body: {
                    email: string;
                    callbackURL?: string | undefined;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    email: import("better-auth").ZodString;
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    email: string;
                    callbackURL?: string | undefined;
                }, {
                    email: string;
                    callbackURL?: string | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            email: {
                                                type: string;
                                                description: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/send-verification-email";
        };
        changeEmail: {
            <C extends [{
                body: {
                    newEmail: string;
                    callbackURL?: string | undefined;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    newEmail: import("better-auth").ZodString;
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    newEmail: string;
                    callbackURL?: string | undefined;
                }, {
                    newEmail: string;
                    callbackURL?: string | undefined;
                }>;
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/change-email";
        };
        changePassword: {
            <C extends [{
                body: {
                    newPassword: string;
                    currentPassword: string;
                    revokeOtherSessions?: boolean | undefined;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    token: string | null;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                };
            } : {
                token: string | null;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    newPassword: import("better-auth").ZodString;
                    currentPassword: import("better-auth").ZodString;
                    revokeOtherSessions: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    newPassword: string;
                    currentPassword: string;
                    revokeOtherSessions?: boolean | undefined;
                }, {
                    newPassword: string;
                    currentPassword: string;
                    revokeOtherSessions?: boolean | undefined;
                }>;
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    description: string;
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/change-password";
        };
        setPassword: {
            <C extends [{
                body: {
                    newPassword: string;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    newPassword: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    newPassword: string;
                }, {
                    newPassword: string;
                }>;
                metadata: {
                    SERVER_ONLY: true;
                };
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
            } & {
                use: any[];
            };
            path: "/set-password";
        };
        updateUser: {
            <C extends [{
                body: Partial<import("better-auth").Prettify<(({} | ({} & {
                    phoneNumber?: string | null | undefined;
                }) | ({} & {})) & {}) & {
                    vehicles?: string[] | null | undefined;
                    deliveries?: string[] | null | undefined;
                } & {
                    name?: string;
                    image?: string | null;
                }>>;
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodAny>;
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    $Infer: {
                        body: Partial<import("better-auth").Prettify<(({} | ({} & {
                            phoneNumber?: string | null | undefined;
                        }) | ({} & {})) & {}) & {
                            vehicles?: string[] | null | undefined;
                            deliveries?: string[] | null | undefined;
                        } & {
                            name?: string;
                            image?: string | null;
                        }>>;
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/update-user";
        };
        deleteUser: {
            <C extends [{
                body: {
                    password?: string | undefined;
                    token?: string | undefined;
                    callbackURL?: string | undefined;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    success: boolean;
                    message: string;
                };
            } : {
                success: boolean;
                message: string;
            }>;
            options: {
                method: "POST";
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                body: import("better-auth").ZodObject<{
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    password: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    token: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    password?: string | undefined;
                    token?: string | undefined;
                    callbackURL?: string | undefined;
                }, {
                    password?: string | undefined;
                    token?: string | undefined;
                    callbackURL?: string | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/delete-user";
        };
        forgetPasswordCallback: {
            <C extends [{
                query: {
                    callbackURL: string;
                };
                params: {
                    token: string;
                };
                body?: undefined;
                method?: "GET" | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: never;
            } : never>;
            options: {
                method: "GET";
                query: import("better-auth").ZodObject<{
                    callbackURL: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    callbackURL: string;
                }, {
                    callbackURL: string;
                }>;
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<void>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/reset-password/:token";
        };
        listSessions: {
            <C extends [{
                headers: HeadersInit;
                body?: undefined;
                method?: "GET" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: import("better-auth").Prettify<{
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined | undefined;
                    userAgent?: string | null | undefined | undefined;
                } & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined | undefined;
                    userAgent?: string | null | undefined | undefined;
                    impersonatedBy?: string | null | undefined;
                }>[];
            } : import("better-auth").Prettify<{
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
                impersonatedBy?: string | null | undefined;
            }>[]>;
            options: {
                method: "GET";
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                type: string;
                                                properties: {
                                                    token: {
                                                        type: string;
                                                    };
                                                    userId: {
                                                        type: string;
                                                    };
                                                    expiresAt: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/list-sessions";
        };
        revokeSession: {
            <C extends [{
                body: {
                    token: string;
                };
                headers: HeadersInit;
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    token: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    token: string;
                }, {
                    token: string;
                }>;
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            token: {
                                                type: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/revoke-session";
        };
        revokeSessions: {
            <C extends [{
                headers: HeadersInit;
                body?: undefined;
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/revoke-sessions";
        };
        revokeOtherSessions: {
            <C extends [{
                headers: HeadersInit;
                body?: undefined;
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                requireHeaders: true;
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/revoke-other-sessions";
        };
        linkSocialAccount: {
            <C extends [{
                body: {
                    provider: "apple" | "discord" | "facebook" | "github" | "google" | "microsoft" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "vk";
                    callbackURL?: string | undefined;
                };
                headers: HeadersInit;
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    url: string;
                    redirect: boolean;
                };
            } : {
                url: string;
                redirect: boolean;
            }>;
            options: {
                method: "POST";
                requireHeaders: true;
                body: import("better-auth").ZodObject<{
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    provider: import("better-auth").ZodEnum<["github", ...("apple" | "discord" | "facebook" | "github" | "google" | "microsoft" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "vk")[]]>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    provider: "apple" | "discord" | "facebook" | "github" | "google" | "microsoft" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "vk";
                    callbackURL?: string | undefined;
                }, {
                    provider: "apple" | "discord" | "facebook" | "github" | "google" | "microsoft" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "vk";
                    callbackURL?: string | undefined;
                }>;
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                url: {
                                                    type: string;
                                                };
                                                redirect: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/link-social";
        };
        listUserAccounts: {
            <C extends [({
                body?: undefined;
                method?: "GET" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            } | undefined)?]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    id: string;
                    provider: string;
                    createdAt: Date;
                    updatedAt: Date;
                    accountId: string;
                    scopes: string[];
                }[];
            } : {
                id: string;
                provider: string;
                createdAt: Date;
                updatedAt: Date;
                accountId: string;
                scopes: string[];
            }[]>;
            options: {
                method: "GET";
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                type: string;
                                                properties: {
                                                    id: {
                                                        type: string;
                                                    };
                                                    provider: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/list-accounts";
        };
        deleteUserCallback: {
            <C extends [{
                query: {
                    token: string;
                    callbackURL?: string | undefined;
                };
                body?: undefined;
                method?: "GET" | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    success: boolean;
                    message: string;
                };
            } : {
                success: boolean;
                message: string;
            }>;
            options: {
                method: "GET";
                query: import("better-auth").ZodObject<{
                    token: import("better-auth").ZodString;
                    callbackURL: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    token: string;
                    callbackURL?: string | undefined;
                }, {
                    token: string;
                    callbackURL?: string | undefined;
                }>;
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<void>)[];
            } & {
                use: any[];
            };
            path: "/delete-user/callback";
        };
        unlinkAccount: {
            <C extends [{
                body: {
                    providerId: string;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    providerId: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    providerId: string;
                }, {
                    providerId: string;
                }>;
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
            } & {
                use: any[];
            };
            path: "/unlink-account";
        };
    } & {
        signInPhoneNumber: {
            <C extends [{
                body: {
                    password: string;
                    phoneNumber: string;
                    rememberMe?: boolean | undefined;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    token: string;
                    user: import("better-auth/plugins").UserWithPhoneNumber;
                };
            } : {
                token: string;
                user: import("better-auth/plugins").UserWithPhoneNumber;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    phoneNumber: import("better-auth").ZodString;
                    password: import("better-auth").ZodString;
                    rememberMe: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    password: string;
                    phoneNumber: string;
                    rememberMe?: boolean | undefined;
                }, {
                    password: string;
                    phoneNumber: string;
                    rememberMe?: boolean | undefined;
                }>;
                metadata: {
                    openapi: {
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                                session: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            400: {
                                description: string;
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-in/phone-number";
        };
        sendPhoneNumberOTP: {
            <C extends [{
                body: {
                    phoneNumber: string;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    code: string;
                };
            } : {
                code: string;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    phoneNumber: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    phoneNumber: string;
                }, {
                    phoneNumber: string;
                }>;
                metadata: {
                    openapi: {
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/phone-number/send-otp";
        };
        verifyPhoneNumber: {
            <C extends [{
                body: {
                    code: string;
                    phoneNumber: string;
                    disableSession?: boolean | undefined;
                    updatePhoneNumber?: boolean | undefined;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    status: boolean;
                    token: string;
                    user: import("better-auth/plugins").UserWithPhoneNumber;
                } | {
                    status: boolean;
                    token: null;
                    user: import("better-auth/plugins").UserWithPhoneNumber;
                } | null;
            } : {
                status: boolean;
                token: string;
                user: import("better-auth/plugins").UserWithPhoneNumber;
            } | {
                status: boolean;
                token: null;
                user: import("better-auth/plugins").UserWithPhoneNumber;
            } | null>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    phoneNumber: import("better-auth").ZodString;
                    code: import("better-auth").ZodString;
                    disableSession: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                    updatePhoneNumber: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    code: string;
                    phoneNumber: string;
                    disableSession?: boolean | undefined;
                    updatePhoneNumber?: boolean | undefined;
                }, {
                    code: string;
                    phoneNumber: string;
                    disableSession?: boolean | undefined;
                    updatePhoneNumber?: boolean | undefined;
                }>;
                metadata: {
                    openapi: {
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                                session: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            400: {
                                description: string;
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/phone-number/verify";
        };
        forgetPasswordPhoneNumber: {
            <C extends [{
                body: {
                    phoneNumber: string;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    phoneNumber: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    phoneNumber: string;
                }, {
                    phoneNumber: string;
                }>;
            } & {
                use: any[];
            };
            path: "/phone-number/forget-password";
        };
        resetPasswordPhoneNumber: {
            <C extends [{
                body: {
                    newPassword: string;
                    otp: string;
                    phoneNumber: string;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    otp: import("better-auth").ZodString;
                    phoneNumber: import("better-auth").ZodString;
                    newPassword: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    newPassword: string;
                    otp: string;
                    phoneNumber: string;
                }, {
                    newPassword: string;
                    otp: string;
                    phoneNumber: string;
                }>;
            } & {
                use: any[];
            };
            path: "/phone-number/reset-password";
        };
    } & {
        setRole: {
            <C extends [{
                body: {
                    userId: string;
                    role: string;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    user: import("better-auth/plugins").UserWithRole;
                };
            } : {
                user: import("better-auth/plugins").UserWithRole;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodString;
                    role: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    userId: string;
                    role: string;
                }, {
                    userId: string;
                    role: string;
                }>;
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    adminOptions: import("better-auth/plugins").AdminOptions;
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                    roles: {
                        admin: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                        user: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                    } & {
                        [key: string]: import("better-auth/plugins/access").Role;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/set-role";
        };
        createUser: {
            <C extends [{
                body: {
                    password: string;
                    name: string;
                    email: string;
                    role: string;
                    data?: Record<string, any> | undefined;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    user: import("better-auth/plugins").UserWithRole;
                };
            } : {
                user: import("better-auth/plugins").UserWithRole;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    email: import("better-auth").ZodString;
                    password: import("better-auth").ZodString;
                    name: import("better-auth").ZodString;
                    role: import("better-auth").ZodString;
                    data: import("better-auth").ZodOptional<import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodAny>>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    password: string;
                    name: string;
                    email: string;
                    role: string;
                    data?: Record<string, any> | undefined;
                }, {
                    password: string;
                    name: string;
                    email: string;
                    role: string;
                    data?: Record<string, any> | undefined;
                }>;
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    adminOptions: import("better-auth/plugins").AdminOptions;
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                    roles: {
                        admin: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                        user: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                    } & {
                        [key: string]: import("better-auth/plugins/access").Role;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/create-user";
        };
        listUsers: {
            <C extends [{
                query: {
                    searchValue?: string | undefined;
                    searchField?: "name" | "email" | undefined;
                    searchOperator?: "contains" | "starts_with" | "ends_with" | undefined;
                    limit?: string | number | undefined;
                    offset?: string | number | undefined;
                    sortBy?: string | undefined;
                    sortDirection?: "asc" | "desc" | undefined;
                    filterField?: string | undefined;
                    filterValue?: string | number | boolean | undefined;
                    filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | undefined;
                };
                body?: undefined;
                method?: "GET" | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    users: import("better-auth/plugins").UserWithRole[];
                    total: number;
                    limit: number | undefined;
                    offset: number | undefined;
                } | {
                    users: never[];
                    total: number;
                };
            } : {
                users: import("better-auth/plugins").UserWithRole[];
                total: number;
                limit: number | undefined;
                offset: number | undefined;
            } | {
                users: never[];
                total: number;
            }>;
            options: {
                method: "GET";
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    adminOptions: import("better-auth/plugins").AdminOptions;
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                    roles: {
                        admin: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                        user: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                    } & {
                        [key: string]: import("better-auth/plugins/access").Role;
                    };
                }>)[];
                query: import("better-auth").ZodObject<{
                    searchValue: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    searchField: import("better-auth").ZodOptional<import("better-auth").ZodEnum<["email", "name"]>>;
                    searchOperator: import("better-auth").ZodOptional<import("better-auth").ZodEnum<["contains", "starts_with", "ends_with"]>>;
                    limit: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>>;
                    offset: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>>;
                    sortBy: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    sortDirection: import("better-auth").ZodOptional<import("better-auth").ZodEnum<["asc", "desc"]>>;
                    filterField: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    filterValue: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>, import("better-auth").ZodBoolean]>>;
                    filterOperator: import("better-auth").ZodOptional<import("better-auth").ZodEnum<["eq", "ne", "lt", "lte", "gt", "gte"]>>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    searchValue?: string | undefined;
                    searchField?: "name" | "email" | undefined;
                    searchOperator?: "contains" | "starts_with" | "ends_with" | undefined;
                    limit?: string | number | undefined;
                    offset?: string | number | undefined;
                    sortBy?: string | undefined;
                    sortDirection?: "asc" | "desc" | undefined;
                    filterField?: string | undefined;
                    filterValue?: string | number | boolean | undefined;
                    filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | undefined;
                }, {
                    searchValue?: string | undefined;
                    searchField?: "name" | "email" | undefined;
                    searchOperator?: "contains" | "starts_with" | "ends_with" | undefined;
                    limit?: string | number | undefined;
                    offset?: string | number | undefined;
                    sortBy?: string | undefined;
                    sortDirection?: "asc" | "desc" | undefined;
                    filterField?: string | undefined;
                    filterValue?: string | number | boolean | undefined;
                    filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | undefined;
                }>;
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                users: {
                                                    type: string;
                                                    items: {
                                                        $ref: string;
                                                    };
                                                };
                                                total: {
                                                    type: string;
                                                };
                                                limit: {
                                                    type: string[];
                                                };
                                                offset: {
                                                    type: string[];
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/list-users";
        };
        listUserSessions: {
            <C extends [{
                body: {
                    userId: string;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    sessions: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    }[];
                };
            } : {
                sessions: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                }[];
            }>;
            options: {
                method: "POST";
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    adminOptions: import("better-auth/plugins").AdminOptions;
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                    roles: {
                        admin: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                        user: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                    } & {
                        [key: string]: import("better-auth/plugins/access").Role;
                    };
                }>)[];
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    userId: string;
                }, {
                    userId: string;
                }>;
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                sessions: {
                                                    type: string;
                                                    items: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/list-user-sessions";
        };
        unbanUser: {
            <C extends [{
                body: {
                    userId: string;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    user: any;
                };
            } : {
                user: any;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    userId: string;
                }, {
                    userId: string;
                }>;
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    adminOptions: import("better-auth/plugins").AdminOptions;
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                    roles: {
                        admin: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                        user: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                    } & {
                        [key: string]: import("better-auth/plugins/access").Role;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/unban-user";
        };
        banUser: {
            <C extends [{
                body: {
                    userId: string;
                    banReason?: string | undefined;
                    banExpiresIn?: number | undefined;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    user: any;
                };
            } : {
                user: any;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodString;
                    banReason: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    banExpiresIn: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    userId: string;
                    banReason?: string | undefined;
                    banExpiresIn?: number | undefined;
                }, {
                    userId: string;
                    banReason?: string | undefined;
                    banExpiresIn?: number | undefined;
                }>;
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    adminOptions: import("better-auth/plugins").AdminOptions;
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                    roles: {
                        admin: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                        user: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                    } & {
                        [key: string]: import("better-auth/plugins/access").Role;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/ban-user";
        };
        impersonateUser: {
            <C extends [{
                body: {
                    userId: string;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    session: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: {
                        id: string;
                        name: string;
                        email: string;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                        image?: string | null | undefined;
                    };
                };
            } : {
                session: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: {
                    id: string;
                    name: string;
                    email: string;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    image?: string | null | undefined;
                };
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    userId: string;
                }, {
                    userId: string;
                }>;
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    adminOptions: import("better-auth/plugins").AdminOptions;
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                    roles: {
                        admin: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                        user: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                    } & {
                        [key: string]: import("better-auth/plugins/access").Role;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                session: {
                                                    $ref: string;
                                                };
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/impersonate-user";
        };
        stopImpersonating: {
            <C extends [({
                body?: undefined;
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            } | undefined)?]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    session: import("better-auth").Session & Record<string, any>;
                    user: import("better-auth").User & Record<string, any>;
                };
            } : {
                session: import("better-auth").Session & Record<string, any>;
                user: import("better-auth").User & Record<string, any>;
            }>;
            options: {
                method: "POST";
            } & {
                use: any[];
            };
            path: "/admin/stop-impersonating";
        };
        revokeUserSession: {
            <C extends [{
                body: {
                    sessionToken: string;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    success: boolean;
                };
            } : {
                success: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    sessionToken: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    sessionToken: string;
                }, {
                    sessionToken: string;
                }>;
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    adminOptions: import("better-auth/plugins").AdminOptions;
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                    roles: {
                        admin: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                        user: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                    } & {
                        [key: string]: import("better-auth/plugins/access").Role;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/revoke-user-session";
        };
        revokeUserSessions: {
            <C extends [{
                body: {
                    userId: string;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    success: boolean;
                };
            } : {
                success: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    userId: string;
                }, {
                    userId: string;
                }>;
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    adminOptions: import("better-auth/plugins").AdminOptions;
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                    roles: {
                        admin: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                        user: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                    } & {
                        [key: string]: import("better-auth/plugins/access").Role;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/revoke-user-sessions";
        };
        removeUser: {
            <C extends [{
                body: {
                    userId: string;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    success: boolean;
                };
            } : {
                success: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    userId: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    userId: string;
                }, {
                    userId: string;
                }>;
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    adminOptions: import("better-auth/plugins").AdminOptions;
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                    roles: {
                        admin: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                        user: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                    } & {
                        [key: string]: import("better-auth/plugins/access").Role;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/remove-user";
        };
        setUserPassword: {
            <C extends [{
                body: {
                    userId: string;
                    newPassword: string;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    newPassword: import("better-auth").ZodString;
                    userId: import("better-auth").ZodString;
                }, "strip", import("better-auth").ZodTypeAny, {
                    userId: string;
                    newPassword: string;
                }, {
                    userId: string;
                    newPassword: string;
                }>;
                use: ((inputContext: {
                    body?: any;
                    query?: Record<string, any> | undefined;
                    request?: Request | undefined;
                    headers?: Headers | undefined;
                    asResponse?: boolean | undefined;
                    returnHeaders?: boolean | undefined;
                    use?: import("better-auth").Middleware[] | undefined;
                }) => Promise<{
                    adminOptions: import("better-auth/plugins").AdminOptions;
                    session: {
                        user: import("better-auth/plugins").UserWithRole;
                        session: import("better-auth").Session;
                    };
                    roles: {
                        admin: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                        user: {
                            authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>[key] | {
                                actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                    readonly session: readonly ["list", "revoke", "delete"];
                                }>[key];
                                connector: "OR" | "AND";
                            } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                            statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            }>;
                        };
                    } & {
                        [key: string]: import("better-auth/plugins/access").Role;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/set-user-password";
        };
        userHasPermission: {
            <C extends [{
                body: {
                    permission: {
                        readonly user?: ("list" | "create" | "delete" | "set-role" | "ban" | "impersonate" | "set-password")[] | undefined;
                        readonly session?: ("list" | "delete" | "revoke")[] | undefined;
                    };
                    userId?: string;
                    role?: string;
                };
                method?: "POST" | undefined;
                query?: Record<string, any> | undefined;
                params?: Record<string, any> | undefined;
                request?: Request | undefined;
                headers?: HeadersInit | undefined;
                asResponse?: boolean | undefined;
                returnHeaders?: boolean | undefined;
                use?: import("better-auth").Middleware[] | undefined;
                path?: string | undefined;
            }]>(...inputCtx: C): Promise<C extends [{
                asResponse: true;
            }] ? Response : C extends [{
                returnHeaders: true;
            }] ? {
                headers: Headers;
                response: {
                    error: null;
                    success: boolean;
                };
            } : {
                error: null;
                success: boolean;
            }>;
            options: {
                method: "POST";
                body: import("better-auth").ZodObject<{
                    permission: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString, "many">>;
                    userId: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    role: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                }, "strip", import("better-auth").ZodTypeAny, {
                    permission: Record<string, string[]>;
                    userId?: string | undefined;
                    role?: string | undefined;
                }, {
                    permission: Record<string, string[]>;
                    userId?: string | undefined;
                    role?: string | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            permission: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                error: {
                                                    type: string;
                                                };
                                                success: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                    $Infer: {
                        body: {
                            permission: {
                                readonly user?: ("list" | "create" | "delete" | "set-role" | "ban" | "impersonate" | "set-password")[] | undefined;
                                readonly session?: ("list" | "delete" | "revoke")[] | undefined;
                            };
                            userId?: string;
                            role?: string;
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/has-permission";
        };
    }>;
    options: {
        database: (options: import("better-auth").BetterAuthOptions) => {
            id: string;
            create<T extends Record<string, any>, R = T>(data: {
                model: string;
                data: T;
                select?: string[];
            }): Promise<any>;
            findOne<T>(data: {
                model: string;
                where: import("better-auth").Where[];
                select?: string[];
            }): Promise<any>;
            findMany<T>(data: {
                model: string;
                where?: import("better-auth").Where[];
                limit?: number;
                sortBy?: {
                    field: string;
                    direction: "asc" | "desc";
                };
                offset?: number;
            }): Promise<any[]>;
            count(data: {
                model: string;
                where?: import("better-auth").Where[];
            }): Promise<any>;
            update<T>(data: {
                model: string;
                where: import("better-auth").Where[];
                update: Record<string, any>;
            }): Promise<any>;
            updateMany(data: {
                model: string;
                where: import("better-auth").Where[];
                update: Record<string, any>;
            }): Promise<number>;
            delete<T>(data: {
                model: string;
                where: import("better-auth").Where[];
            }): Promise<void>;
            deleteMany(data: {
                model: string;
                where: import("better-auth").Where[];
            }): Promise<number>;
            options: import("better-auth/adapters/prisma").PrismaConfig;
        };
        trustedOrigins: string[];
        user: {
            modelName: string;
            additionalFields: {
                vehicles: {
                    type: "string[]";
                    required: false;
                };
                deliveries: {
                    type: "string[]";
                    required: false;
                };
            };
        };
        plugins: ({
            id: "phone-number";
            endpoints: {
                signInPhoneNumber: {
                    <C extends [{
                        body: {
                            password: string;
                            phoneNumber: string;
                            rememberMe?: boolean | undefined;
                        };
                        method?: "POST" | undefined;
                        query?: Record<string, any> | undefined;
                        params?: Record<string, any> | undefined;
                        request?: Request | undefined;
                        headers?: HeadersInit | undefined;
                        asResponse?: boolean | undefined;
                        returnHeaders?: boolean | undefined;
                        use?: import("better-auth").Middleware[] | undefined;
                        path?: string | undefined;
                    }]>(...inputCtx: C): Promise<C extends [{
                        asResponse: true;
                    }] ? Response : C extends [{
                        returnHeaders: true;
                    }] ? {
                        headers: Headers;
                        response: {
                            token: string;
                            user: import("better-auth/plugins").UserWithPhoneNumber;
                        };
                    } : {
                        token: string;
                        user: import("better-auth/plugins").UserWithPhoneNumber;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            phoneNumber: import("better-auth").ZodString;
                            password: import("better-auth").ZodString;
                            rememberMe: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                        }, "strip", import("better-auth").ZodTypeAny, {
                            password: string;
                            phoneNumber: string;
                            rememberMe?: boolean | undefined;
                        }, {
                            password: string;
                            phoneNumber: string;
                            rememberMe?: boolean | undefined;
                        }>;
                        metadata: {
                            openapi: {
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        user: {
                                                            $ref: string;
                                                        };
                                                        session: {
                                                            $ref: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    400: {
                                        description: string;
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/sign-in/phone-number";
                };
                sendPhoneNumberOTP: {
                    <C extends [{
                        body: {
                            phoneNumber: string;
                        };
                        method?: "POST" | undefined;
                        query?: Record<string, any> | undefined;
                        params?: Record<string, any> | undefined;
                        request?: Request | undefined;
                        headers?: HeadersInit | undefined;
                        asResponse?: boolean | undefined;
                        returnHeaders?: boolean | undefined;
                        use?: import("better-auth").Middleware[] | undefined;
                        path?: string | undefined;
                    }]>(...inputCtx: C): Promise<C extends [{
                        asResponse: true;
                    }] ? Response : C extends [{
                        returnHeaders: true;
                    }] ? {
                        headers: Headers;
                        response: {
                            code: string;
                        };
                    } : {
                        code: string;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            phoneNumber: import("better-auth").ZodString;
                        }, "strip", import("better-auth").ZodTypeAny, {
                            phoneNumber: string;
                        }, {
                            phoneNumber: string;
                        }>;
                        metadata: {
                            openapi: {
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        message: {
                                                            type: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/phone-number/send-otp";
                };
                verifyPhoneNumber: {
                    <C extends [{
                        body: {
                            code: string;
                            phoneNumber: string;
                            disableSession?: boolean | undefined;
                            updatePhoneNumber?: boolean | undefined;
                        };
                        method?: "POST" | undefined;
                        query?: Record<string, any> | undefined;
                        params?: Record<string, any> | undefined;
                        request?: Request | undefined;
                        headers?: HeadersInit | undefined;
                        asResponse?: boolean | undefined;
                        returnHeaders?: boolean | undefined;
                        use?: import("better-auth").Middleware[] | undefined;
                        path?: string | undefined;
                    }]>(...inputCtx: C): Promise<C extends [{
                        asResponse: true;
                    }] ? Response : C extends [{
                        returnHeaders: true;
                    }] ? {
                        headers: Headers;
                        response: {
                            status: boolean;
                            token: string;
                            user: import("better-auth/plugins").UserWithPhoneNumber;
                        } | {
                            status: boolean;
                            token: null;
                            user: import("better-auth/plugins").UserWithPhoneNumber;
                        } | null;
                    } : {
                        status: boolean;
                        token: string;
                        user: import("better-auth/plugins").UserWithPhoneNumber;
                    } | {
                        status: boolean;
                        token: null;
                        user: import("better-auth/plugins").UserWithPhoneNumber;
                    } | null>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            phoneNumber: import("better-auth").ZodString;
                            code: import("better-auth").ZodString;
                            disableSession: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                            updatePhoneNumber: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                        }, "strip", import("better-auth").ZodTypeAny, {
                            code: string;
                            phoneNumber: string;
                            disableSession?: boolean | undefined;
                            updatePhoneNumber?: boolean | undefined;
                        }, {
                            code: string;
                            phoneNumber: string;
                            disableSession?: boolean | undefined;
                            updatePhoneNumber?: boolean | undefined;
                        }>;
                        metadata: {
                            openapi: {
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        user: {
                                                            $ref: string;
                                                        };
                                                        session: {
                                                            $ref: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    400: {
                                        description: string;
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/phone-number/verify";
                };
                forgetPasswordPhoneNumber: {
                    <C extends [{
                        body: {
                            phoneNumber: string;
                        };
                        method?: "POST" | undefined;
                        query?: Record<string, any> | undefined;
                        params?: Record<string, any> | undefined;
                        request?: Request | undefined;
                        headers?: HeadersInit | undefined;
                        asResponse?: boolean | undefined;
                        returnHeaders?: boolean | undefined;
                        use?: import("better-auth").Middleware[] | undefined;
                        path?: string | undefined;
                    }]>(...inputCtx: C): Promise<C extends [{
                        asResponse: true;
                    }] ? Response : C extends [{
                        returnHeaders: true;
                    }] ? {
                        headers: Headers;
                        response: {
                            status: boolean;
                        };
                    } : {
                        status: boolean;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            phoneNumber: import("better-auth").ZodString;
                        }, "strip", import("better-auth").ZodTypeAny, {
                            phoneNumber: string;
                        }, {
                            phoneNumber: string;
                        }>;
                    } & {
                        use: any[];
                    };
                    path: "/phone-number/forget-password";
                };
                resetPasswordPhoneNumber: {
                    <C extends [{
                        body: {
                            newPassword: string;
                            otp: string;
                            phoneNumber: string;
                        };
                        method?: "POST" | undefined;
                        query?: Record<string, any> | undefined;
                        params?: Record<string, any> | undefined;
                        request?: Request | undefined;
                        headers?: HeadersInit | undefined;
                        asResponse?: boolean | undefined;
                        returnHeaders?: boolean | undefined;
                        use?: import("better-auth").Middleware[] | undefined;
                        path?: string | undefined;
                    }]>(...inputCtx: C): Promise<C extends [{
                        asResponse: true;
                    }] ? Response : C extends [{
                        returnHeaders: true;
                    }] ? {
                        headers: Headers;
                        response: {
                            status: boolean;
                        };
                    } : {
                        status: boolean;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            otp: import("better-auth").ZodString;
                            phoneNumber: import("better-auth").ZodString;
                            newPassword: import("better-auth").ZodString;
                        }, "strip", import("better-auth").ZodTypeAny, {
                            newPassword: string;
                            otp: string;
                            phoneNumber: string;
                        }, {
                            newPassword: string;
                            otp: string;
                            phoneNumber: string;
                        }>;
                    } & {
                        use: any[];
                    };
                    path: "/phone-number/reset-password";
                };
            };
            schema: {
                user: {
                    fields: {
                        phoneNumber: {
                            type: "string";
                            required: false;
                            unique: true;
                            sortable: true;
                            returned: true;
                        };
                        phoneNumberVerified: {
                            type: "boolean";
                            required: false;
                            returned: true;
                            input: false;
                        };
                    };
                };
            };
            $ERROR_CODES: {
                readonly INVALID_PHONE_NUMBER: "Invalid phone number";
                readonly INVALID_PHONE_NUMBER_OR_PASSWORD: "Invalid phone number or password";
                readonly UNEXPECTED_ERROR: "Unexpected error";
                readonly OTP_NOT_FOUND: "OTP not found";
                readonly OTP_EXPIRED: "OTP expired";
                readonly INVALID_OTP: "Invalid OTP";
            };
        } | {
            id: "admin";
            init(ctx: import("better-auth").AuthContext): {
                options: {
                    databaseHooks: {
                        user: {
                            create: {
                                before(user: {
                                    id: string;
                                    name: string;
                                    email: string;
                                    emailVerified: boolean;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    image?: string | null | undefined;
                                }): Promise<{
                                    data: {
                                        id: string;
                                        name: string;
                                        email: string;
                                        emailVerified: boolean;
                                        createdAt: Date;
                                        updatedAt: Date;
                                        image?: string | null | undefined;
                                        role: string;
                                    };
                                }>;
                            };
                        };
                        session: {
                            create: {
                                before(session: {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    userId: string;
                                    expiresAt: Date;
                                    token: string;
                                    ipAddress?: string | null | undefined;
                                    userAgent?: string | null | undefined;
                                }): Promise<false | undefined>;
                            };
                        };
                    };
                };
            };
            hooks: {
                after: {
                    matcher(context: import("better-auth").HookEndpointContext): boolean;
                    handler: (inputContext: {
                        body?: any;
                        query?: Record<string, any> | undefined;
                        request?: Request | undefined;
                        headers?: Headers | undefined;
                        asResponse?: boolean | undefined;
                        returnHeaders?: boolean | undefined;
                        use?: import("better-auth").Middleware[] | undefined;
                    }) => Promise<import("better-auth/plugins").SessionWithImpersonatedBy[] | undefined>;
                }[];
            };
            endpoints: {
                setRole: {
                    <C extends [{
                        body: {
                            userId: string;
                            role: string;
                        };
                        method?: "POST" | undefined;
                        query?: Record<string, any> | undefined;
                        params?: Record<string, any> | undefined;
                        request?: Request | undefined;
                        headers?: HeadersInit | undefined;
                        asResponse?: boolean | undefined;
                        returnHeaders?: boolean | undefined;
                        use?: import("better-auth").Middleware[] | undefined;
                        path?: string | undefined;
                    }]>(...inputCtx: C): Promise<C extends [{
                        asResponse: true;
                    }] ? Response : C extends [{
                        returnHeaders: true;
                    }] ? {
                        headers: Headers;
                        response: {
                            user: import("better-auth/plugins").UserWithRole;
                        };
                    } : {
                        user: import("better-auth/plugins").UserWithRole;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            userId: import("better-auth").ZodString;
                            role: import("better-auth").ZodString;
                        }, "strip", import("better-auth").ZodTypeAny, {
                            userId: string;
                            role: string;
                        }, {
                            userId: string;
                            role: string;
                        }>;
                        use: ((inputContext: {
                            body?: any;
                            query?: Record<string, any> | undefined;
                            request?: Request | undefined;
                            headers?: Headers | undefined;
                            asResponse?: boolean | undefined;
                            returnHeaders?: boolean | undefined;
                            use?: import("better-auth").Middleware[] | undefined;
                        }) => Promise<{
                            adminOptions: import("better-auth/plugins").AdminOptions;
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                            roles: {
                                admin: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                                user: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                            } & {
                                [key: string]: import("better-auth/plugins/access").Role;
                            };
                        }>)[];
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        user: {
                                                            $ref: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/set-role";
                };
                createUser: {
                    <C extends [{
                        body: {
                            password: string;
                            name: string;
                            email: string;
                            role: string;
                            data?: Record<string, any> | undefined;
                        };
                        method?: "POST" | undefined;
                        query?: Record<string, any> | undefined;
                        params?: Record<string, any> | undefined;
                        request?: Request | undefined;
                        headers?: HeadersInit | undefined;
                        asResponse?: boolean | undefined;
                        returnHeaders?: boolean | undefined;
                        use?: import("better-auth").Middleware[] | undefined;
                        path?: string | undefined;
                    }]>(...inputCtx: C): Promise<C extends [{
                        asResponse: true;
                    }] ? Response : C extends [{
                        returnHeaders: true;
                    }] ? {
                        headers: Headers;
                        response: {
                            user: import("better-auth/plugins").UserWithRole;
                        };
                    } : {
                        user: import("better-auth/plugins").UserWithRole;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            email: import("better-auth").ZodString;
                            password: import("better-auth").ZodString;
                            name: import("better-auth").ZodString;
                            role: import("better-auth").ZodString;
                            data: import("better-auth").ZodOptional<import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodAny>>;
                        }, "strip", import("better-auth").ZodTypeAny, {
                            password: string;
                            name: string;
                            email: string;
                            role: string;
                            data?: Record<string, any> | undefined;
                        }, {
                            password: string;
                            name: string;
                            email: string;
                            role: string;
                            data?: Record<string, any> | undefined;
                        }>;
                        use: ((inputContext: {
                            body?: any;
                            query?: Record<string, any> | undefined;
                            request?: Request | undefined;
                            headers?: Headers | undefined;
                            asResponse?: boolean | undefined;
                            returnHeaders?: boolean | undefined;
                            use?: import("better-auth").Middleware[] | undefined;
                        }) => Promise<{
                            adminOptions: import("better-auth/plugins").AdminOptions;
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                            roles: {
                                admin: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                                user: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                            } & {
                                [key: string]: import("better-auth/plugins/access").Role;
                            };
                        }>)[];
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        user: {
                                                            $ref: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/create-user";
                };
                listUsers: {
                    <C extends [{
                        query: {
                            searchValue?: string | undefined;
                            searchField?: "name" | "email" | undefined;
                            searchOperator?: "contains" | "starts_with" | "ends_with" | undefined;
                            limit?: string | number | undefined;
                            offset?: string | number | undefined;
                            sortBy?: string | undefined;
                            sortDirection?: "asc" | "desc" | undefined;
                            filterField?: string | undefined;
                            filterValue?: string | number | boolean | undefined;
                            filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | undefined;
                        };
                        body?: undefined;
                        method?: "GET" | undefined;
                        params?: Record<string, any> | undefined;
                        request?: Request | undefined;
                        headers?: HeadersInit | undefined;
                        asResponse?: boolean | undefined;
                        returnHeaders?: boolean | undefined;
                        use?: import("better-auth").Middleware[] | undefined;
                        path?: string | undefined;
                    }]>(...inputCtx: C): Promise<C extends [{
                        asResponse: true;
                    }] ? Response : C extends [{
                        returnHeaders: true;
                    }] ? {
                        headers: Headers;
                        response: {
                            users: import("better-auth/plugins").UserWithRole[];
                            total: number;
                            limit: number | undefined;
                            offset: number | undefined;
                        } | {
                            users: never[];
                            total: number;
                        };
                    } : {
                        users: import("better-auth/plugins").UserWithRole[];
                        total: number;
                        limit: number | undefined;
                        offset: number | undefined;
                    } | {
                        users: never[];
                        total: number;
                    }>;
                    options: {
                        method: "GET";
                        use: ((inputContext: {
                            body?: any;
                            query?: Record<string, any> | undefined;
                            request?: Request | undefined;
                            headers?: Headers | undefined;
                            asResponse?: boolean | undefined;
                            returnHeaders?: boolean | undefined;
                            use?: import("better-auth").Middleware[] | undefined;
                        }) => Promise<{
                            adminOptions: import("better-auth/plugins").AdminOptions;
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                            roles: {
                                admin: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                                user: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                            } & {
                                [key: string]: import("better-auth/plugins/access").Role;
                            };
                        }>)[];
                        query: import("better-auth").ZodObject<{
                            searchValue: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                            searchField: import("better-auth").ZodOptional<import("better-auth").ZodEnum<["email", "name"]>>;
                            searchOperator: import("better-auth").ZodOptional<import("better-auth").ZodEnum<["contains", "starts_with", "ends_with"]>>;
                            limit: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>>;
                            offset: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>>;
                            sortBy: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                            sortDirection: import("better-auth").ZodOptional<import("better-auth").ZodEnum<["asc", "desc"]>>;
                            filterField: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                            filterValue: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>, import("better-auth").ZodBoolean]>>;
                            filterOperator: import("better-auth").ZodOptional<import("better-auth").ZodEnum<["eq", "ne", "lt", "lte", "gt", "gte"]>>;
                        }, "strip", import("better-auth").ZodTypeAny, {
                            searchValue?: string | undefined;
                            searchField?: "name" | "email" | undefined;
                            searchOperator?: "contains" | "starts_with" | "ends_with" | undefined;
                            limit?: string | number | undefined;
                            offset?: string | number | undefined;
                            sortBy?: string | undefined;
                            sortDirection?: "asc" | "desc" | undefined;
                            filterField?: string | undefined;
                            filterValue?: string | number | boolean | undefined;
                            filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | undefined;
                        }, {
                            searchValue?: string | undefined;
                            searchField?: "name" | "email" | undefined;
                            searchOperator?: "contains" | "starts_with" | "ends_with" | undefined;
                            limit?: string | number | undefined;
                            offset?: string | number | undefined;
                            sortBy?: string | undefined;
                            sortDirection?: "asc" | "desc" | undefined;
                            filterField?: string | undefined;
                            filterValue?: string | number | boolean | undefined;
                            filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | undefined;
                        }>;
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        users: {
                                                            type: string;
                                                            items: {
                                                                $ref: string;
                                                            };
                                                        };
                                                        total: {
                                                            type: string;
                                                        };
                                                        limit: {
                                                            type: string[];
                                                        };
                                                        offset: {
                                                            type: string[];
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/list-users";
                };
                listUserSessions: {
                    <C extends [{
                        body: {
                            userId: string;
                        };
                        method?: "POST" | undefined;
                        query?: Record<string, any> | undefined;
                        params?: Record<string, any> | undefined;
                        request?: Request | undefined;
                        headers?: HeadersInit | undefined;
                        asResponse?: boolean | undefined;
                        returnHeaders?: boolean | undefined;
                        use?: import("better-auth").Middleware[] | undefined;
                        path?: string | undefined;
                    }]>(...inputCtx: C): Promise<C extends [{
                        asResponse: true;
                    }] ? Response : C extends [{
                        returnHeaders: true;
                    }] ? {
                        headers: Headers;
                        response: {
                            sessions: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            }[];
                        };
                    } : {
                        sessions: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        }[];
                    }>;
                    options: {
                        method: "POST";
                        use: ((inputContext: {
                            body?: any;
                            query?: Record<string, any> | undefined;
                            request?: Request | undefined;
                            headers?: Headers | undefined;
                            asResponse?: boolean | undefined;
                            returnHeaders?: boolean | undefined;
                            use?: import("better-auth").Middleware[] | undefined;
                        }) => Promise<{
                            adminOptions: import("better-auth/plugins").AdminOptions;
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                            roles: {
                                admin: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                                user: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                            } & {
                                [key: string]: import("better-auth/plugins/access").Role;
                            };
                        }>)[];
                        body: import("better-auth").ZodObject<{
                            userId: import("better-auth").ZodString;
                        }, "strip", import("better-auth").ZodTypeAny, {
                            userId: string;
                        }, {
                            userId: string;
                        }>;
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        sessions: {
                                                            type: string;
                                                            items: {
                                                                $ref: string;
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/list-user-sessions";
                };
                unbanUser: {
                    <C extends [{
                        body: {
                            userId: string;
                        };
                        method?: "POST" | undefined;
                        query?: Record<string, any> | undefined;
                        params?: Record<string, any> | undefined;
                        request?: Request | undefined;
                        headers?: HeadersInit | undefined;
                        asResponse?: boolean | undefined;
                        returnHeaders?: boolean | undefined;
                        use?: import("better-auth").Middleware[] | undefined;
                        path?: string | undefined;
                    }]>(...inputCtx: C): Promise<C extends [{
                        asResponse: true;
                    }] ? Response : C extends [{
                        returnHeaders: true;
                    }] ? {
                        headers: Headers;
                        response: {
                            user: any;
                        };
                    } : {
                        user: any;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            userId: import("better-auth").ZodString;
                        }, "strip", import("better-auth").ZodTypeAny, {
                            userId: string;
                        }, {
                            userId: string;
                        }>;
                        use: ((inputContext: {
                            body?: any;
                            query?: Record<string, any> | undefined;
                            request?: Request | undefined;
                            headers?: Headers | undefined;
                            asResponse?: boolean | undefined;
                            returnHeaders?: boolean | undefined;
                            use?: import("better-auth").Middleware[] | undefined;
                        }) => Promise<{
                            adminOptions: import("better-auth/plugins").AdminOptions;
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                            roles: {
                                admin: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                                user: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                            } & {
                                [key: string]: import("better-auth/plugins/access").Role;
                            };
                        }>)[];
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        user: {
                                                            $ref: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/unban-user";
                };
                banUser: {
                    <C extends [{
                        body: {
                            userId: string;
                            banReason?: string | undefined;
                            banExpiresIn?: number | undefined;
                        };
                        method?: "POST" | undefined;
                        query?: Record<string, any> | undefined;
                        params?: Record<string, any> | undefined;
                        request?: Request | undefined;
                        headers?: HeadersInit | undefined;
                        asResponse?: boolean | undefined;
                        returnHeaders?: boolean | undefined;
                        use?: import("better-auth").Middleware[] | undefined;
                        path?: string | undefined;
                    }]>(...inputCtx: C): Promise<C extends [{
                        asResponse: true;
                    }] ? Response : C extends [{
                        returnHeaders: true;
                    }] ? {
                        headers: Headers;
                        response: {
                            user: any;
                        };
                    } : {
                        user: any;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            userId: import("better-auth").ZodString;
                            banReason: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                            banExpiresIn: import("better-auth").ZodOptional<import("better-auth").ZodNumber>;
                        }, "strip", import("better-auth").ZodTypeAny, {
                            userId: string;
                            banReason?: string | undefined;
                            banExpiresIn?: number | undefined;
                        }, {
                            userId: string;
                            banReason?: string | undefined;
                            banExpiresIn?: number | undefined;
                        }>;
                        use: ((inputContext: {
                            body?: any;
                            query?: Record<string, any> | undefined;
                            request?: Request | undefined;
                            headers?: Headers | undefined;
                            asResponse?: boolean | undefined;
                            returnHeaders?: boolean | undefined;
                            use?: import("better-auth").Middleware[] | undefined;
                        }) => Promise<{
                            adminOptions: import("better-auth/plugins").AdminOptions;
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                            roles: {
                                admin: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                                user: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                            } & {
                                [key: string]: import("better-auth/plugins/access").Role;
                            };
                        }>)[];
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        user: {
                                                            $ref: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/ban-user";
                };
                impersonateUser: {
                    <C extends [{
                        body: {
                            userId: string;
                        };
                        method?: "POST" | undefined;
                        query?: Record<string, any> | undefined;
                        params?: Record<string, any> | undefined;
                        request?: Request | undefined;
                        headers?: HeadersInit | undefined;
                        asResponse?: boolean | undefined;
                        returnHeaders?: boolean | undefined;
                        use?: import("better-auth").Middleware[] | undefined;
                        path?: string | undefined;
                    }]>(...inputCtx: C): Promise<C extends [{
                        asResponse: true;
                    }] ? Response : C extends [{
                        returnHeaders: true;
                    }] ? {
                        headers: Headers;
                        response: {
                            session: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: {
                                id: string;
                                name: string;
                                email: string;
                                emailVerified: boolean;
                                createdAt: Date;
                                updatedAt: Date;
                                image?: string | null | undefined;
                            };
                        };
                    } : {
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            userId: import("better-auth").ZodString;
                        }, "strip", import("better-auth").ZodTypeAny, {
                            userId: string;
                        }, {
                            userId: string;
                        }>;
                        use: ((inputContext: {
                            body?: any;
                            query?: Record<string, any> | undefined;
                            request?: Request | undefined;
                            headers?: Headers | undefined;
                            asResponse?: boolean | undefined;
                            returnHeaders?: boolean | undefined;
                            use?: import("better-auth").Middleware[] | undefined;
                        }) => Promise<{
                            adminOptions: import("better-auth/plugins").AdminOptions;
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                            roles: {
                                admin: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                                user: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                            } & {
                                [key: string]: import("better-auth/plugins/access").Role;
                            };
                        }>)[];
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        session: {
                                                            $ref: string;
                                                        };
                                                        user: {
                                                            $ref: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/impersonate-user";
                };
                stopImpersonating: {
                    <C extends [({
                        body?: undefined;
                        method?: "POST" | undefined;
                        query?: Record<string, any> | undefined;
                        params?: Record<string, any> | undefined;
                        request?: Request | undefined;
                        headers?: HeadersInit | undefined;
                        asResponse?: boolean | undefined;
                        returnHeaders?: boolean | undefined;
                        use?: import("better-auth").Middleware[] | undefined;
                        path?: string | undefined;
                    } | undefined)?]>(...inputCtx: C): Promise<C extends [{
                        asResponse: true;
                    }] ? Response : C extends [{
                        returnHeaders: true;
                    }] ? {
                        headers: Headers;
                        response: {
                            session: import("better-auth").Session & Record<string, any>;
                            user: import("better-auth").User & Record<string, any>;
                        };
                    } : {
                        session: import("better-auth").Session & Record<string, any>;
                        user: import("better-auth").User & Record<string, any>;
                    }>;
                    options: {
                        method: "POST";
                    } & {
                        use: any[];
                    };
                    path: "/admin/stop-impersonating";
                };
                revokeUserSession: {
                    <C extends [{
                        body: {
                            sessionToken: string;
                        };
                        method?: "POST" | undefined;
                        query?: Record<string, any> | undefined;
                        params?: Record<string, any> | undefined;
                        request?: Request | undefined;
                        headers?: HeadersInit | undefined;
                        asResponse?: boolean | undefined;
                        returnHeaders?: boolean | undefined;
                        use?: import("better-auth").Middleware[] | undefined;
                        path?: string | undefined;
                    }]>(...inputCtx: C): Promise<C extends [{
                        asResponse: true;
                    }] ? Response : C extends [{
                        returnHeaders: true;
                    }] ? {
                        headers: Headers;
                        response: {
                            success: boolean;
                        };
                    } : {
                        success: boolean;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            sessionToken: import("better-auth").ZodString;
                        }, "strip", import("better-auth").ZodTypeAny, {
                            sessionToken: string;
                        }, {
                            sessionToken: string;
                        }>;
                        use: ((inputContext: {
                            body?: any;
                            query?: Record<string, any> | undefined;
                            request?: Request | undefined;
                            headers?: Headers | undefined;
                            asResponse?: boolean | undefined;
                            returnHeaders?: boolean | undefined;
                            use?: import("better-auth").Middleware[] | undefined;
                        }) => Promise<{
                            adminOptions: import("better-auth/plugins").AdminOptions;
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                            roles: {
                                admin: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                                user: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                            } & {
                                [key: string]: import("better-auth/plugins/access").Role;
                            };
                        }>)[];
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        success: {
                                                            type: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/revoke-user-session";
                };
                revokeUserSessions: {
                    <C extends [{
                        body: {
                            userId: string;
                        };
                        method?: "POST" | undefined;
                        query?: Record<string, any> | undefined;
                        params?: Record<string, any> | undefined;
                        request?: Request | undefined;
                        headers?: HeadersInit | undefined;
                        asResponse?: boolean | undefined;
                        returnHeaders?: boolean | undefined;
                        use?: import("better-auth").Middleware[] | undefined;
                        path?: string | undefined;
                    }]>(...inputCtx: C): Promise<C extends [{
                        asResponse: true;
                    }] ? Response : C extends [{
                        returnHeaders: true;
                    }] ? {
                        headers: Headers;
                        response: {
                            success: boolean;
                        };
                    } : {
                        success: boolean;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            userId: import("better-auth").ZodString;
                        }, "strip", import("better-auth").ZodTypeAny, {
                            userId: string;
                        }, {
                            userId: string;
                        }>;
                        use: ((inputContext: {
                            body?: any;
                            query?: Record<string, any> | undefined;
                            request?: Request | undefined;
                            headers?: Headers | undefined;
                            asResponse?: boolean | undefined;
                            returnHeaders?: boolean | undefined;
                            use?: import("better-auth").Middleware[] | undefined;
                        }) => Promise<{
                            adminOptions: import("better-auth/plugins").AdminOptions;
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                            roles: {
                                admin: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                                user: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                            } & {
                                [key: string]: import("better-auth/plugins/access").Role;
                            };
                        }>)[];
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        success: {
                                                            type: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/revoke-user-sessions";
                };
                removeUser: {
                    <C extends [{
                        body: {
                            userId: string;
                        };
                        method?: "POST" | undefined;
                        query?: Record<string, any> | undefined;
                        params?: Record<string, any> | undefined;
                        request?: Request | undefined;
                        headers?: HeadersInit | undefined;
                        asResponse?: boolean | undefined;
                        returnHeaders?: boolean | undefined;
                        use?: import("better-auth").Middleware[] | undefined;
                        path?: string | undefined;
                    }]>(...inputCtx: C): Promise<C extends [{
                        asResponse: true;
                    }] ? Response : C extends [{
                        returnHeaders: true;
                    }] ? {
                        headers: Headers;
                        response: {
                            success: boolean;
                        };
                    } : {
                        success: boolean;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            userId: import("better-auth").ZodString;
                        }, "strip", import("better-auth").ZodTypeAny, {
                            userId: string;
                        }, {
                            userId: string;
                        }>;
                        use: ((inputContext: {
                            body?: any;
                            query?: Record<string, any> | undefined;
                            request?: Request | undefined;
                            headers?: Headers | undefined;
                            asResponse?: boolean | undefined;
                            returnHeaders?: boolean | undefined;
                            use?: import("better-auth").Middleware[] | undefined;
                        }) => Promise<{
                            adminOptions: import("better-auth/plugins").AdminOptions;
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                            roles: {
                                admin: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                                user: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                            } & {
                                [key: string]: import("better-auth/plugins/access").Role;
                            };
                        }>)[];
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        success: {
                                                            type: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/remove-user";
                };
                setUserPassword: {
                    <C extends [{
                        body: {
                            userId: string;
                            newPassword: string;
                        };
                        method?: "POST" | undefined;
                        query?: Record<string, any> | undefined;
                        params?: Record<string, any> | undefined;
                        request?: Request | undefined;
                        headers?: HeadersInit | undefined;
                        asResponse?: boolean | undefined;
                        returnHeaders?: boolean | undefined;
                        use?: import("better-auth").Middleware[] | undefined;
                        path?: string | undefined;
                    }]>(...inputCtx: C): Promise<C extends [{
                        asResponse: true;
                    }] ? Response : C extends [{
                        returnHeaders: true;
                    }] ? {
                        headers: Headers;
                        response: {
                            status: boolean;
                        };
                    } : {
                        status: boolean;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            newPassword: import("better-auth").ZodString;
                            userId: import("better-auth").ZodString;
                        }, "strip", import("better-auth").ZodTypeAny, {
                            userId: string;
                            newPassword: string;
                        }, {
                            userId: string;
                            newPassword: string;
                        }>;
                        use: ((inputContext: {
                            body?: any;
                            query?: Record<string, any> | undefined;
                            request?: Request | undefined;
                            headers?: Headers | undefined;
                            asResponse?: boolean | undefined;
                            returnHeaders?: boolean | undefined;
                            use?: import("better-auth").Middleware[] | undefined;
                        }) => Promise<{
                            adminOptions: import("better-auth/plugins").AdminOptions;
                            session: {
                                user: import("better-auth/plugins").UserWithRole;
                                session: import("better-auth").Session;
                            };
                            roles: {
                                admin: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                                user: {
                                    authorize<K extends "session" | "user">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>[key] | {
                                        actions: import("better-auth/plugins/access").Subset<"session" | "user", {
                                            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                            readonly session: readonly ["list", "revoke", "delete"];
                                        }>[key];
                                        connector: "OR" | "AND";
                                    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthortizeResponse;
                                    statements: import("better-auth/plugins/access").Subset<"session" | "user", {
                                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password"];
                                        readonly session: readonly ["list", "revoke", "delete"];
                                    }>;
                                };
                            } & {
                                [key: string]: import("better-auth/plugins/access").Role;
                            };
                        }>)[];
                        metadata: {
                            openapi: {
                                operationId: string;
                                summary: string;
                                description: string;
                                responses: {
                                    200: {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        status: {
                                                            type: string;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/set-user-password";
                };
                userHasPermission: {
                    <C extends [{
                        body: {
                            permission: {
                                readonly user?: ("list" | "create" | "delete" | "set-role" | "ban" | "impersonate" | "set-password")[] | undefined;
                                readonly session?: ("list" | "delete" | "revoke")[] | undefined;
                            };
                            userId?: string;
                            role?: string;
                        };
                        method?: "POST" | undefined;
                        query?: Record<string, any> | undefined;
                        params?: Record<string, any> | undefined;
                        request?: Request | undefined;
                        headers?: HeadersInit | undefined;
                        asResponse?: boolean | undefined;
                        returnHeaders?: boolean | undefined;
                        use?: import("better-auth").Middleware[] | undefined;
                        path?: string | undefined;
                    }]>(...inputCtx: C): Promise<C extends [{
                        asResponse: true;
                    }] ? Response : C extends [{
                        returnHeaders: true;
                    }] ? {
                        headers: Headers;
                        response: {
                            error: null;
                            success: boolean;
                        };
                    } : {
                        error: null;
                        success: boolean;
                    }>;
                    options: {
                        method: "POST";
                        body: import("better-auth").ZodObject<{
                            permission: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString, "many">>;
                            userId: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                            role: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        }, "strip", import("better-auth").ZodTypeAny, {
                            permission: Record<string, string[]>;
                            userId?: string | undefined;
                            role?: string | undefined;
                        }, {
                            permission: Record<string, string[]>;
                            userId?: string | undefined;
                            role?: string | undefined;
                        }>;
                        metadata: {
                            openapi: {
                                description: string;
                                requestBody: {
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    permission: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                                responses: {
                                    "200": {
                                        description: string;
                                        content: {
                                            "application/json": {
                                                schema: {
                                                    type: "object";
                                                    properties: {
                                                        error: {
                                                            type: string;
                                                        };
                                                        success: {
                                                            type: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            $Infer: {
                                body: {
                                    permission: {
                                        readonly user?: ("list" | "create" | "delete" | "set-role" | "ban" | "impersonate" | "set-password")[] | undefined;
                                        readonly session?: ("list" | "delete" | "revoke")[] | undefined;
                                    };
                                    userId?: string;
                                    role?: string;
                                };
                            };
                        };
                    } & {
                        use: any[];
                    };
                    path: "/admin/has-permission";
                };
            };
            $ERROR_CODES: {
                readonly FAILED_TO_CREATE_USER: "Failed to create user";
                readonly USER_ALREADY_EXISTS: "User already exists";
                readonly YOU_CANNOT_BAN_YOURSELF: "You cannot ban yourself";
                readonly YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE: "You are not allowed to change users role";
                readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS: "You are not allowed to create users";
                readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS: "You are not allowed to list users";
                readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS: "You are not allowed to list users sessions";
                readonly YOU_ARE_NOT_ALLOWED_TO_BAN_USERS: "You are not allowed to ban users";
                readonly YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS: "You are not allowed to impersonate users";
                readonly YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS: "You are not allowed to revoke users sessions";
                readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS: "You are not allowed to delete users";
                readonly YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD: "You are not allowed to set users password";
            };
            schema: {
                user: {
                    fields: {
                        role: {
                            type: "string";
                            required: false;
                            input: false;
                        };
                        banned: {
                            type: "boolean";
                            defaultValue: false;
                            required: false;
                            input: false;
                        };
                        banReason: {
                            type: "string";
                            required: false;
                            input: false;
                        };
                        banExpires: {
                            type: "date";
                            required: false;
                            input: false;
                        };
                    };
                };
                session: {
                    fields: {
                        impersonatedBy: {
                            type: "string";
                            required: false;
                        };
                    };
                };
            };
        } | {
            id: "expo";
            init: (ctx: import("better-auth").AuthContext) => {
                options: {
                    trustedOrigins: string[];
                };
            };
            onRequest(request: Request, ctx: import("better-auth").AuthContext): Promise<{
                request: Request;
            } | undefined>;
            hooks: {
                after: {
                    matcher(context: import("better-auth").HookEndpointContext): boolean;
                    handler: (inputContext: {
                        body?: any;
                        query?: Record<string, any> | undefined;
                        request?: Request | undefined;
                        headers?: Headers | undefined;
                        asResponse?: boolean | undefined;
                        returnHeaders?: boolean | undefined;
                        use?: import("better-auth").Middleware[] | undefined;
                    }) => Promise<void>;
                }[];
            };
        })[];
    };
    $context: Promise<import("better-auth").AuthContext>;
    $Infer: {
        Session: {
            session: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
                impersonatedBy?: string | null | undefined;
            };
            user: {
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                createdAt: Date;
                updatedAt: Date;
                image?: string | null | undefined | undefined;
                vehicles?: string[] | null | undefined;
                deliveries?: string[] | null | undefined;
                phoneNumber?: string | null | undefined;
                phoneNumberVerified?: boolean | null | undefined;
                banned: boolean | null | undefined;
                role?: string | null | undefined;
                banExpires?: Date | null | undefined;
                banReason?: string | null | undefined;
            };
        };
    };
    $ERROR_CODES: {
        readonly FAILED_TO_CREATE_USER: "Failed to create user";
        readonly USER_ALREADY_EXISTS: "User already exists";
        readonly YOU_CANNOT_BAN_YOURSELF: "You cannot ban yourself";
        readonly YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE: "You are not allowed to change users role";
        readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS: "You are not allowed to create users";
        readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS: "You are not allowed to list users";
        readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS: "You are not allowed to list users sessions";
        readonly YOU_ARE_NOT_ALLOWED_TO_BAN_USERS: "You are not allowed to ban users";
        readonly YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS: "You are not allowed to impersonate users";
        readonly YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS: "You are not allowed to revoke users sessions";
        readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS: "You are not allowed to delete users";
        readonly YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD: "You are not allowed to set users password";
    } & {
        readonly INVALID_PHONE_NUMBER: "Invalid phone number";
        readonly INVALID_PHONE_NUMBER_OR_PASSWORD: "Invalid phone number or password";
        readonly UNEXPECTED_ERROR: "Unexpected error";
        readonly OTP_NOT_FOUND: "OTP not found";
        readonly OTP_EXPIRED: "OTP expired";
        readonly INVALID_OTP: "Invalid OTP";
    } & {
        USER_NOT_FOUND: string;
        FAILED_TO_CREATE_USER: string;
        FAILED_TO_CREATE_SESSION: string;
        FAILED_TO_UPDATE_USER: string;
        FAILED_TO_GET_SESSION: string;
        INVALID_PASSWORD: string;
        INVALID_EMAIL: string;
        INVALID_EMAIL_OR_PASSWORD: string;
        SOCIAL_ACCOUNT_ALREADY_LINKED: string;
        PROVIDER_NOT_FOUND: string;
        INVALID_TOKEN: string;
        ID_TOKEN_NOT_SUPPORTED: string;
        FAILED_TO_GET_USER_INFO: string;
        USER_EMAIL_NOT_FOUND: string;
        EMAIL_NOT_VERIFIED: string;
        PASSWORD_TOO_SHORT: string;
        PASSWORD_TOO_LONG: string;
        USER_ALREADY_EXISTS: string;
        EMAIL_CAN_NOT_BE_UPDATED: string;
        CREDENTIAL_ACCOUNT_NOT_FOUND: string;
        SESSION_EXPIRED: string;
        FAILED_TO_UNLINK_LAST_ACCOUNT: string;
        ACCOUNT_NOT_FOUND: string;
    };
};
//# sourceMappingURL=auth.d.ts.map