package com.accedia.thearm;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.accedia.thearm.helpers.ApiHelper;

import org.json.JSONException;

import java.util.concurrent.ExecutionException;

public class RegisterActivity extends AppCompatActivity {

    private Button buttonRegister;
    private EditText editUsername;
    private EditText editEmail;
    private EditText editPassword;
    private EditText editDisplayName;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        buttonRegister = (Button) findViewById(R.id.button_register);
        editUsername = (EditText) findViewById(R.id.edit_register_username);
        editEmail = (EditText) findViewById(R.id.edit_register_email);
        editPassword = (EditText) findViewById(R.id.edit_register_password);
        editDisplayName = (EditText) findViewById(R.id.edit_register_display_name);

        buttonRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String username = editUsername.getText().toString();
                String email = editEmail.getText().toString();
                String password = editPassword.getText().toString();
                String displayName = editDisplayName.getText().toString();

                try {
                    if (ApiHelper.register(username, password, "", email, displayName)) {
                        Toast.makeText(RegisterActivity.this.getApplicationContext(), "Register successful.", Toast.LENGTH_SHORT).show();
                        finish();
                    } else {
                        Toast.makeText(RegisterActivity.this.getApplicationContext(), "Register failed.", Toast.LENGTH_SHORT).show();
                    }
                } catch (ExecutionException e) {
                    e.printStackTrace();
                    Toast.makeText(RegisterActivity.this.getApplicationContext(), "Register failed.", Toast.LENGTH_SHORT).show();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    Toast.makeText(RegisterActivity.this.getApplicationContext(), "Register failed.", Toast.LENGTH_SHORT).show();
                } catch (JSONException e) {
                    e.printStackTrace();
                    Toast.makeText(RegisterActivity.this.getApplicationContext(), "Register failed.", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}
