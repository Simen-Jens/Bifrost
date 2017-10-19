package orient;

import tools.JavaScriptVAR;

/**
 * Created by Simen on 14.10.2017.
 */
public final class OrientBean{
    public void config(String h, String u, String p){
        OrientAgent.config(h, u, p);
    }

    public String query(String dbn, String q){
        return OrientAgent.query(dbn, q);
    }
}
