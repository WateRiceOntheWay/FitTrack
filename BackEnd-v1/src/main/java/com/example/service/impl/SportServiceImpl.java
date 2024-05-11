package com.example.service.impl;

import com.example.exception.SportTypeNotFoundException;
import com.example.mapper.GameMapper;
import com.example.mapper.SportMapper;
import com.example.pojo.Games;
import com.example.pojo.Sport;
import com.example.service.SportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
@Service
@Slf4j
public class SportServiceImpl implements SportService {
    @Autowired
    private SportMapper sportMapper;
    @Autowired
    private GameMapper gameMapper;

    @Override
    public void add(Sport sport) throws SportTypeNotFoundException {

        log.info("Attempting to add sport record: {}", sport.toString());
        sport.setCreateTime(LocalDateTime.now());
        if (sport.getGamesName() == null) {
            throw new SportTypeNotFoundException("运动类型未找到");
        }
        Games game = gameMapper.getByGamename(sport.getGamesName());
        log.info("Attempting to add game record: {}", game.toString());
        if(game != null){
            log.info("Attempting to add game record: {}", game.toString());
            BigDecimal calories = calculateCalories(sport,game);
            sport.setCalories(calories);
            sportMapper.insert(sport);
        }else{
            throw new SportTypeNotFoundException("运动类型未找到");
        }
    }

    @Override
    public List<Sport> listTopThree(String username) {
        return sportMapper.listTopThree(username);
    }

    @Override
    public List<Sport> list(String username) {
            return sportMapper.list(username);
    }

    private BigDecimal calculateCalories(Sport sport, Games games) {
        BigDecimal calories = BigDecimal.ZERO;

        if (sport.getSportsTime().compareTo(BigDecimal.ZERO) > 0 && sport.getSportsDistance().compareTo(BigDecimal.ZERO) > 0) {
            // 如果运动时间和距离都大于0，则按照运动距离和卡路里系数相乘
            calories = games.getCalories().multiply(sport.getSportsDistance());
        } else if (sport.getSportsTime().compareTo(BigDecimal.ZERO) > 0) {
            // 如果只有运动时间大于0，则按照运动时间和卡路里系数相乘
            calories = sport.getSportsTime().multiply(games.getCalories());
        } else if (sport.getSportsDistance().compareTo(BigDecimal.ZERO) > 0) {
            // 如果只有运动距离大于0，则按照一个简单的方式进行计算
            calories = sport.getSportsDistance().multiply(BigDecimal.valueOf(0.1));
        }

        return calories;
    }
}
