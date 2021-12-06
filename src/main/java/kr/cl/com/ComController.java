package kr.cl.com;



import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 *  제목 ComController
 *  내용
 *  기본 환경 조성을 위한 Templates
 */
@Controller
public class ComController {

    /**
     *  제목 화면 설정 예제
     *  @return index
     *  @param model 모델
     */
    @GetMapping("/*")
    public String index(Model model) {

        // 화면 설정
        model.addAttribute("template", "COM/COM_TEMPLATES.html");
        // 팝업 설정
        //model.addAttribute("pop", "");
        // 스크립트 설정
        //model.addAttribute("src", "");

        return "index";
    }
}
