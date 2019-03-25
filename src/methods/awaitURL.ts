import isReachable from 'is-reachable';

interface IawaitURLOptions {
    retries?:number;    //acceptable amount of attempts before erroring out - default, infinity.
    retryInterval?:number; //amount of milliseconds between each attempt - default 3000 (3 seconds)
    silent?:boolean; // do not console status out on each attempt, default true.
};

export async function awaitURL( url:string, options?:IawaitURLOptions ):Promise<boolean> {

    options = options || {};

    options.retries = options.retries === undefined ? Infinity : options.retries;
    options.retryInterval = options.retryInterval === undefined ? 3000 : options.retryInterval;
    options.silent = options.silent === undefined ? true : options.silent;

    return new Promise((resolve,reject) => {

        let attempts = 0;

        const i = setInterval( async _ => {

            if(attempts >= options.retries) {
                clearInterval(i);
                return reject(`URL inactive after ${attempts} attempts`);
            }
            attempts++;

            const alive = await isReachable(url);

            if(alive) {

                if(!options.silent)
                    console.log(`connected to ${url}`);

                clearInterval(i);
                resolve(true);

            } else {

                if(!options.silent)
                console.log(`failed to connect to ${url}, trying again in ${options.retryInterval}ms`);

            }

        }, options.retryInterval);

    });
}