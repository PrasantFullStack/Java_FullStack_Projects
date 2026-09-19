package com.leadyfy_os_backend.leadyfy_os_backend;

import com.leadyfy_os_backend.leadyfy_os_backend.entity.Client;
import com.leadyfy_os_backend.leadyfy_os_backend.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;

import static org.junit.jupiter.api.Assertions.*;

class EntityModelTest {

  @Test
  void clientCompanyNameUsesRequiredDatabaseColumnName() throws NoSuchFieldException {
    Field companyNameField = Client.class.getDeclaredField("companyName");
    Column column = companyNameField.getAnnotation(Column.class);

    assertNotNull(column, "companyName should have a @Column annotation");
    assertEquals("company_name", column.name(), "The database column name must be company_name");
    assertEquals("company_name", column.name());
  }

  @Test
  void userUsesUsersTableAndRoleEnum() throws NoSuchFieldException {
    assertNotNull(User.class.getAnnotation(Table.class));
    assertEquals("users", User.class.getAnnotation(Table.class).name());

    Field roleField = User.class.getDeclaredField("role");
    assertNotNull(roleField.getType().getEnumConstants(), "role should be an enum");
  }
}
