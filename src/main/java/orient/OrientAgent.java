package orient;

import com.orientechnologies.orient.jdbc.OrientJdbcDriver;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import tools.JavaScriptVAR;

import java.sql.*;
import java.util.Properties;

/**
 * Created by Simen on 14.10.2017.
 */
public final class OrientAgent {

    private static String host;
    private static String uname;
    private static String pword;

    public static void config(String h, String u, String p){
        host = h;
        uname = u;
        pword = p;
    }

    public static String query(String databaseName, String q){
        try {
            DriverManager.registerDriver(new OrientJdbcDriver());
        } catch (SQLException ex){
            return ex.toString();
        }

        Properties info = new Properties();
        info.put("user", uname);
        info.put("password", pword);


        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        JSONArray conv = null;
        try {
            conn = DriverManager.getConnection("jdbc:orient:remote:" + host + "/" + databaseName, info);
            stmt = conn.createStatement();
            rs = stmt.executeQuery(q);
            try {
                conv = convertRS(rs);
            } catch (JSONException jex){
                return jex.toString();
            }
        } catch (SQLException ex){
            return ex.toString();
        } finally {
            try { if (rs != null) rs.close(); } catch (Exception e) {};
            try { if (stmt != null) stmt.close(); } catch (Exception e) {};
            try { if (conn != null) conn.close(); } catch (Exception e) {};
        }

        return conv.toString();
    }







    private static JSONArray convertRS( ResultSet rs )
            throws SQLException, JSONException
    {
        JSONArray json = new JSONArray();
        ResultSetMetaData rsmd = rs.getMetaData();

        while(rs.next()) {
            int numColumns = rsmd.getColumnCount();
            JSONObject obj = new JSONObject();

            for (int i=1; i<numColumns+1; i++) {
                String column_name = rsmd.getColumnName(i);

                if(rsmd.getColumnType(i)==java.sql.Types.ARRAY){
                    obj.put(column_name, rs.getArray(column_name));
                }
                else if(rsmd.getColumnType(i)==java.sql.Types.BIGINT){
                    obj.put(column_name, rs.getInt(column_name));
                }
                else if(rsmd.getColumnType(i)==java.sql.Types.BOOLEAN){
                    obj.put(column_name, rs.getBoolean(column_name));
                }
                else if(rsmd.getColumnType(i)==java.sql.Types.BLOB){
                    obj.put(column_name, rs.getBlob(column_name));
                }
                else if(rsmd.getColumnType(i)==java.sql.Types.DOUBLE){
                    obj.put(column_name, rs.getDouble(column_name));
                }
                else if(rsmd.getColumnType(i)==java.sql.Types.FLOAT){
                    obj.put(column_name, rs.getFloat(column_name));
                }
                else if(rsmd.getColumnType(i)==java.sql.Types.INTEGER){
                    obj.put(column_name, rs.getInt(column_name));
                }
                else if(rsmd.getColumnType(i)==java.sql.Types.NVARCHAR){
                    obj.put(column_name, rs.getNString(column_name));
                }
                else if(rsmd.getColumnType(i)==java.sql.Types.VARCHAR){
                    obj.put(column_name, rs.getString(column_name));
                }
                else if(rsmd.getColumnType(i)==java.sql.Types.TINYINT){
                    obj.put(column_name, rs.getInt(column_name));
                }
                else if(rsmd.getColumnType(i)==java.sql.Types.SMALLINT){
                    obj.put(column_name, rs.getInt(column_name));
                }
                else if(rsmd.getColumnType(i)==java.sql.Types.DATE){
                    obj.put(column_name, rs.getDate(column_name));
                }
                else if(rsmd.getColumnType(i)==java.sql.Types.TIMESTAMP){
                    obj.put(column_name, rs.getTimestamp(column_name));
                }
                else{
                    obj.put(column_name, rs.getObject(column_name));
                }
            }

            json.put(obj);
        }

        return json;
    }
}
