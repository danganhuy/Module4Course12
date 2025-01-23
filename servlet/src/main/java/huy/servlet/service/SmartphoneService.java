package huy.servlet.service;

import huy.servlet.model.Smartphone;
import huy.servlet.repository.ISmartphoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SmartphoneService implements ISmartphoneService {
    @Autowired
    private ISmartphoneRepository iSmartphoneRepository;

    @Override
    public Iterable<Smartphone> findAll() {
       return iSmartphoneRepository.findAll();
    }

    @Override
    public Optional<Smartphone> findById(Long id) {
       return iSmartphoneRepository.findById(id);
    }

    @Override
    public Smartphone save(Smartphone smartPhone) {
       return iSmartphoneRepository.save(smartPhone);
    }

    @Override
    public void remove(Long id) {
       iSmartphoneRepository.deleteById(id);
    }
}