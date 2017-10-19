package tools;

import io.purplejs.core.json.JsonGenerator;
import io.purplejs.core.json.JsonSerializable;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


/**
 * Created by Simen on 14.10.2017.
 *
 * deprecated because of JSON.parse()
 */
public final class JavaScriptVAR implements JsonSerializable {
    private JSONArray object;

    public JavaScriptVAR(JSONArray object){
        this.object = object;
    }

    private void serObject(final JsonGenerator gen, JSONObject object){
        gen.map();
        String[] it = JSONObject.getNames(object);

        for(String name : it){
            try {
                if (object.get(name) instanceof JSONArray) {
                    serArray(gen);
                } else {
                    gen.value(name, object.get(name));
                }
            } catch (JSONException ex){
                ex.printStackTrace();
            }
        }
        gen.end();
    }

    private void serArray(final JsonGenerator gen){
        gen.array();
        for (int i = 0; i < object.length(); i++){
            try {
                if (object.get(i) instanceof JSONObject) {
                    serObject(gen, object.getJSONObject(i));
                } else {
                    gen.value(object.get(i));
                }
            } catch (JSONException ex){
                ex.printStackTrace();
            }
        }
        gen.end();
    }

    @Override
    public void serialize( final JsonGenerator gen ) {
        serArray(gen);
    }
}
