//calculate knots. ex: [0, 0, 0, 0, 1, 2, 3, 4, 4, 4, 4] on k=4, n=6
export const knotGenerator = (k, n) => (i) => {
    if(1 <= i && i <= k) {
        return 0
    }
    if(k+1 <= i && i <= n+1) {
        return i-k
    }
    if(n+2 <= i && i <= n+k+1) {
        return n-k+2
    }
}

export const N = (k, n) => (i) => (t) => {  
    const knot = knotGenerator(k, n);
    const nApplied = (iNew) => N(k-1, n)(iNew)(t);
    if(t <= knot(i) || t >= knot(i + n)) {
        return 0;
    }
    //1 or 0 indicates whether we need that segment or not
    if(k === 1) {
        return (knot(i) <= t && t >= knot(i+1)) ? 1 : 0;
    }
    const first = ( nApplied(i) * ((t - knot(i)) / (knot(i+k-1) - knot(i))) )|| 0;
    const second = ( nApplied(i+1) * ((-t + knot(i+k)) / (knot(i+k) - knot(i+1))) ) || 0;

    const finiteFirst = Number.isFinite(first) ? first : NaN;
    const finiteSecond = Number.isFinite(second) ? second : NaN;
    if(!Number.isFinite(first) && !Number.isFinite(second)) {
        throw new Error(`both components of Cox are nonsense. Mean ${first} ${second}`);
    }
    const result = finiteFirst || 0 + finiteSecond || 0;
    console.log(`N(${k}, ${n}, ${i}}) = ${result}`)
    return result;
}

export const pGen = (k, n) => (t) => {
    const knots = knotGenerator(k,n);
    const nn = N(k, n);

    let ans = 0;
    for (let i = 1; i <= n+1; ++i) {
        ans += knots(i) * nn(i)(t);
    }

    return ans;
}

window.math = module.exports;
