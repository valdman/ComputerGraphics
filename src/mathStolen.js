const Bxy = [ 
    [ 0, 60 ],
    [ 30, 0 ],
    [ 60, 60 ],
    [ 90, 0 ],
    [ 120, 60 ],
    [ 150, 0 ],
    [ 180, 60 ],
    [ 210, 0 ]
];
const x = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

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

export function generateSplineData() {
    let N, x,y;
    let res = []
    for (let p = 2; p <= 8; p = p + 0.01)
    {
        x = 0; y = 0;
        for (let i = 0; i < 8; i++)
        {
            N = RecurMetod(i, 3, p);
            x = x + Bxy[i][0] * N;
            y = y + Bxy[i][1] * N;                   
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
                x: t * -100 + 200,
                y: RecurMetod(i, 3, t) * -100
            })
        }
    }
    return res;
}