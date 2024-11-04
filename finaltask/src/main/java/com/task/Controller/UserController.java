package com.task.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.task.Model.User;
import com.task.Service.UserService;

@Controller
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping("/")
    public String homepage() {
        System.out.println("Into Home Page");
        return "home";
    }

    @PostMapping("/addUser")
    public ModelAndView addUser(
            @RequestParam("username") String name,
            @RequestParam("password") String password) {

        ModelAndView mv = new ModelAndView("message");

        String msg = service.addUsers(name, password);
        mv.addObject("msg", msg);
        System.out.println("Into add User");
        return mv;
    }

    @GetMapping("/Views")
    public ModelAndView viewUsers() {
        ModelAndView mv = new ModelAndView("Details");

        List<User> usersList = service.fetchDetails();
        mv.addObject("userList", usersList);
        System.out.println("into view Users method");
        return mv;
    }

    @PostMapping("/login")
    public ModelAndView loginUser(
            @RequestParam("username") String name,
            @RequestParam("loginPassword") String password) {
        ModelAndView mv = new ModelAndView("message");

        String msg;
        msg = service.verifyLogin(name, password);
        mv.addObject("msg", msg);
        System.out.println("Into Login User");
        return mv;
    }

    @GetMapping("/back")
    public String goBack() {
        return "redirect:/";
    }

}
