package com.example.gds.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

@Entity
public class Serie implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotBlank
	private String titulo;

	@NotBlank
	private String status;

	private int episAssistidos;
	private int totalEpis;
	private int nota;

	public Long getId() {
		return id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getEpisAssistidos() {
		return episAssistidos;
	}

	public void setEpisAssistidos(int episAssistidos) {
		this.episAssistidos = episAssistidos;
	}

	public int getTotalEpis() {
		return totalEpis;
	}

	public void setTotalEpis(int totalEpis) {
		this.totalEpis = totalEpis;
	}

	public int getNota() {
		return nota;
	}

	public void setNota(int nota) {
		this.nota = nota;
	}

}
