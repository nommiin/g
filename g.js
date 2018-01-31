g = {
    p: {
        p: 0,
        i: "var localvarname = 512; function math(t, a, b) {if (t == 0) {return a + b;} else {return a - b;}}",
        f: function() {
            for(g.p.p = 0; g.p.p < g.p.i.length; g.p.p++) {
                for(t in g.t) {
                    if (g.p.i.substring(g.p.p, g.p.p + t.length) == t) {
                        g.p.p += t.length;
                        g.t[t]();
                        console.log("Found Token: " + t);
                    }
                }
            }
        },
        _se: function(c, a="") {
            // SEEK
            let s = 1;
            while (g.p.i[g.p.p++] != c) {
                if (g.p.i[g.p.p] == a) {
                    s++;
                } else if (g.p.i[g.p.p] == c) {
                    if (--s > 0&& g.p.p++);
                }

                if (g.p.p > g.p.i.length) {
                    console.log("End of stream error, could not find character '" + c + "'")
                }
            }
            console.log("Found character in stream: '" + c + "' at position " + g.p.p);
            return g.p.p;
        },
        _sk: function(c) {
            // SEEK
            while (g.p.i[g.p.p++] == c) {
                if (g.p.p > g.p.i.length) {
                    console.log("End of stream error, seems as if the rest are '" + c + "' characters!");
                }
            }
            console.log("Skipped '" + c + "' in stream until position " + g.p.p);
            return g.p.p;
        }

    },
    t: {
        "var": function() {
            let h = g.p.p;
            let t = g.p._se("=");
            let n = g.p.i.substring(h, t - 1).trim();

            h = t;
            t = g.p._se(";");
            let v = g.p.i.substring(h, t - 1).trim();

            g.v.p[n] = new g.v.b(n, v);
            
        },
        "function": function() {
            let h = g.p.p;
            let t = g.p._se("(");
            let n = g.p.i.substring(h, t - 1).trim();

            h = t;
            t = g.p._se(")");
            let p = g.p.i.substring(h, t - 1).trim();
            
            h = g.p._se("{", "}");
            t = g.p._se("}", "{");
            let c = g.p.i.substring(h, t - 1);

            g.f.p[n] = new g.f.b(n, p, c);
        }
    },
    v: {
        b: function(n, v) {
            this.n = n;
            this.v = v;
        },
        p: {}
    },
    f: {
        b: function(n, p, c) {
            this.n = n;
            this.p = p;
            this.c = c;
        },
        p: {}
    }
}

g.p.f();
console.log("Variables: " + JSON.stringify(g.v.p));
console.log("Functions: " + JSON.stringify(g.f.p));