package com.example.gds.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.gds.models.Serie;

@org.springframework.stereotype.Repository
public interface SeriesRepository extends JpaRepository<Serie, Long> {

}
