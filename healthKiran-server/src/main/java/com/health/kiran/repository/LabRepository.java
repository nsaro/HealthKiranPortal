package com.health.kiran.repository;

import com.health.kiran.model.City;
import com.health.kiran.model.Lab;
import com.health.kiran.model.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface LabRepository extends JpaRepository<Lab, Long>{

//    @Query("SELECT lab FROM Labs lab where lab.city = :city and lab.labTests.id in :testIds")
//    List<Lab> getAllLabsByCityAndTest(City city, List<Test> testIds);

    @Query("select lab from Labs lab  left join lab.labTests labTest where labTest.test in :tests and lab.city = :city")
    Set<Lab> getAllLabsByCityAndTest(City city, List<Test> tests);

}
