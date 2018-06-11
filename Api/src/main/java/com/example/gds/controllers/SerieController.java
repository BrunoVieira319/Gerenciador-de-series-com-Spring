package com.example.gds.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.gds.models.Serie;
import com.example.gds.repository.SeriesRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SerieController {

	@Autowired
	private SeriesRepository sr;

	@GetMapping("/series")
	public List<Serie> getSeries() {
		return sr.findAll();
	}

	@PostMapping("/series")
	public Serie postSerie(@Valid @RequestBody Serie serie) {
		return sr.save(serie);
	}

	@DeleteMapping("/series/{id}")
	public ResponseEntity<?> deleteSerie(@PathVariable(value = "id") Long serieId) {
		sr.deleteById(serieId);
		return ResponseEntity.ok().build();
	}

	@PutMapping("/series")
	public ResponseEntity<?> updateSerie(@RequestBody Serie updateSerie) {
		Optional<Serie> serieOp = sr.findById(updateSerie.getId());
		Serie serie = serieOp.get();
		serie.setTitulo(updateSerie.getTitulo());
		serie.setNota(updateSerie.getNota());
		serie.setStatus(updateSerie.getStatus());
		serie.setEpisAssistidos(updateSerie.getEpisAssistidos());
		serie.setTotalEpis(updateSerie.getTotalEpis());

		sr.save(serie);

		return ResponseEntity.ok().build();
	}
}
