package com.example.ucord_personal_account_service.DTO.request;

import com.example.ucord_personal_account_service.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.sql.results.jdbc.internal.JdbcValuesResultSetImpl;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppealRequest {

    private String article;

    private String description;

    private Long userId;

    private Long tutorId;
}
