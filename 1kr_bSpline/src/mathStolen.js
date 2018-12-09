export const Bxy = [ 
    [ 0, 40 ],
    [ 30, 20 ],
    [ 60, 40 ],
    [ 90, 20 ],
    [ 120, 40 ],
    [ 150, 20 ],
    [ 180, 40 ],
    [ 210, 20 ]
];
const x = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]

function RecurMetod(ind, k, par)
{
    if (k == 1)
    {
        if ((x[ind] <= par) && (par <= x[ind + 1]))
            return 1;
        else
            return 0;
    }
    if ((x[ind + k - 1] - x[ind])==0)
        return ((x[ind + k] - par) * RecurMetod(ind + 1, k - 1, par)) / (x[ind + k] - x[ind + 1]);
    if ((x[ind + k] - x[ind + 1]) == 0)
        return ((par - x[ind]) * RecurMetod(ind, k - 1, par)) / (x[ind + k - 1] - x[ind]);
    else
        return ((par - x[ind]) * RecurMetod(ind, k - 1, par)) / (x[ind + k - 1] - x[ind]) + ((x[ind + k] - par) * RecurMetod(ind + 1, k - 1, par)) / (x[ind + k] - x[ind + 1]);
}

export function generateSplineData(a = Bxy) {
    let N, x,y;
    let res = []
    for (let p = 2; p <= 8; p = p + 0.01)
    {
        x = 0; y = 0;
        for (let i = 0; i < 8; i++)
        {
            N = RecurMetod(i, 3, p);
            x = x + a[i][0] * N;
            y = y + a[i][1] * N;                   
        }
        res.push({x, y})
    }
    return res;
}

export function generateBasisData() {
    const res = [];
    for (let i = 0; i < 8; i++)
    {
        for (let t = 2; t <= 8; t += 0.01)
        {
            res.push({
                x: t,
                y: RecurMetod(i, 3, t)
            })
        }
    }
    return res;
}